import { getManifest, saveManifest, savePostFile } from './_lib/github.js';
import { verifyToken } from './_lib/auth.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET /api/projects — public list of projects
  if (req.method === 'GET') {
    try {
      const { posts: projects } = await getManifest('projects');
      const isAdmin = !!verifyToken(req);
      // Public only sees published, admin sees all
      const filtered = isAdmin ? projects : projects.filter(p => p.status === 'published');
      // Sort by date desc
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      return res.status(200).json(filtered);
    } catch (err) {
      console.error('GET /api/projects error:', err);
      return res.status(500).json({ error: 'Failed to load projects' });
    }
  }

  // POST /api/projects — create new project (admin only)
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const { title, slug, description, tags, github, icon, content, status } = req.body;
      if (!title || !slug || !content) return res.status(400).json({ error: 'title, slug, and content are required' });

      const date = new Date().toISOString().split('T')[0];
      const projectMeta = {
        title,
        slug,
        description: description || '',
        tags: tags || [],
        github: github || '',
        icon: icon || '',
        status: status || 'draft',
        date,
      };

      // Save content file to GitHub
      await savePostFile(slug, content, null, `cms: create project "${title}"`, 'projects');

      // Update manifest
      const { sha, posts: projects } = await getManifest('projects');
      const existing = projects.findIndex(p => p.slug === slug);
      if (existing >= 0) {
        projects[existing] = projectMeta;
      } else {
        projects.push(projectMeta);
      }
      await saveManifest(projects, sha, 'projects');

      return res.status(201).json(projectMeta);
    } catch (err) {
      console.error('POST /api/projects error:', err);
      return res.status(500).json({ error: err.message || 'Failed to create project' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
