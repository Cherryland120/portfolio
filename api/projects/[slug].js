import { getManifest, saveManifest, getPostFile, savePostFile, deletePostFile } from '../_lib/github.js';
import { verifyToken } from '../_lib/auth.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  // GET /api/projects/:slug — fetch single project + content
  if (req.method === 'GET') {
    try {
      const { posts: projects } = await getManifest('projects');
      const meta = projects.find(p => p.slug === slug);
      if (!meta) return res.status(404).json({ error: 'Project not found' });

      const isAdmin = !!verifyToken(req);
      if (meta.status !== 'published' && !isAdmin) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const file = await getPostFile(slug, 'projects');
      if (!file) return res.status(404).json({ error: 'Project content not found' });

      res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');
      return res.status(200).json({ ...meta, content: file.content });
    } catch (err) {
      console.error('GET /api/projects/:slug error:', err);
      return res.status(500).json({ error: 'Failed to load project' });
    }
  }

  // PUT /api/projects/:slug — update project (admin only)
  if (req.method === 'PUT') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const { title, description, tags, github, icon, content, status, newSlug } = req.body;

      const { sha: manifestSha, posts: projects } = await getManifest('projects');
      const idx = projects.findIndex(p => p.slug === slug);
      if (idx < 0) return res.status(404).json({ error: 'Project not found' });

      const targetSlug = newSlug || slug;

      // If slug changed, delete old file first
      if (newSlug && newSlug !== slug) {
        const oldFile = await getPostFile(slug, 'projects');
        if (oldFile) await deletePostFile(slug, oldFile.sha, 'projects');
      }

      // Get existing file sha for update
      const existingFile = newSlug && newSlug !== slug ? null : await getPostFile(slug, 'projects');
      await savePostFile(targetSlug, content, existingFile?.sha || null, `cms: update project "${title}"`, 'projects');

      // Update manifest entry
      projects[idx] = {
        ...projects[idx],
        title: title ?? projects[idx].title,
        slug: targetSlug,
        description: description ?? projects[idx].description,
        tags: tags ?? projects[idx].tags,
        github: github ?? projects[idx].github,
        icon: icon ?? projects[idx].icon,
        status: status ?? projects[idx].status,
      };

      await saveManifest(projects, manifestSha, 'projects');
      return res.status(200).json(projects[idx]);
    } catch (err) {
      console.error('PUT /api/projects/:slug error:', err);
      return res.status(500).json({ error: err.message || 'Failed to update project' });
    }
  }

  // DELETE /api/projects/:slug — delete project (admin only)
  if (req.method === 'DELETE') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const file = await getPostFile(slug, 'projects');
      if (!file) return res.status(404).json({ error: 'Project not found' });

      await deletePostFile(slug, file.sha, 'projects');

      const { sha: manifestSha, posts: projects } = await getManifest('projects');
      const filtered = projects.filter(p => p.slug !== slug);
      await saveManifest(filtered, manifestSha, 'projects');

      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error('DELETE /api/projects/:slug error:', err);
      return res.status(500).json({ error: err.message || 'Failed to delete project' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
