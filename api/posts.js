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

  // GET /api/posts — public list of posts
  if (req.method === 'GET') {
    try {
      const { posts } = await getManifest();
      const isAdmin = !!verifyToken(req);
      // Public only sees published, admin sees all
      const filtered = isAdmin ? posts : posts.filter(p => p.status === 'published');
      // Sort by date desc
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      return res.status(200).json(filtered);
    } catch (err) {
      console.error('GET /api/posts error:', err);
      return res.status(500).json({ error: 'Failed to load posts' });
    }
  }

  // POST /api/posts — create new post (admin only)
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const { title, slug, excerpt, category, content, status, metaTitle, metaDescription, readTime } = req.body;
      if (!title || !slug || !content) return res.status(400).json({ error: 'title, slug, and content are required' });

      const date = new Date().toISOString().split('T')[0];
      const postMeta = {
        title,
        slug,
        excerpt: excerpt || '',
        category: category || 'General',
        status: status || 'draft',
        date,
        readTime: readTime || '5 min read',
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt || '',
      };

      // Save content file to GitHub
      await savePostFile(slug, content, null, `cms: create post "${title}"`);

      // Update manifest
      const { sha, posts } = await getManifest();
      const existing = posts.findIndex(p => p.slug === slug);
      if (existing >= 0) {
        posts[existing] = postMeta;
      } else {
        posts.push(postMeta);
      }
      await saveManifest(posts, sha);

      return res.status(201).json(postMeta);
    } catch (err) {
      console.error('POST /api/posts error:', err);
      return res.status(500).json({ error: err.message || 'Failed to create post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
