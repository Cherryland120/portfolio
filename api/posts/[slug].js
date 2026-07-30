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

  // GET /api/posts/:slug — fetch single post + content
  if (req.method === 'GET') {
    try {
      const { posts } = await getManifest();
      const meta = posts.find(p => p.slug === slug);
      if (!meta) return res.status(404).json({ error: 'Post not found' });

      const isAdmin = !!verifyToken(req);
      if (meta.status !== 'published' && !isAdmin) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const file = await getPostFile(slug);
      if (!file) return res.status(404).json({ error: 'Post content not found' });

      res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');
      return res.status(200).json({ ...meta, content: file.content });
    } catch (err) {
      console.error('GET /api/posts/:slug error:', err);
      return res.status(500).json({ error: 'Failed to load post' });
    }
  }

  // PUT /api/posts/:slug — update post (admin only)
  if (req.method === 'PUT') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const { title, excerpt, category, content, status, metaTitle, metaDescription, readTime, newSlug } = req.body;

      const { sha: manifestSha, posts } = await getManifest();
      const idx = posts.findIndex(p => p.slug === slug);
      if (idx < 0) return res.status(404).json({ error: 'Post not found' });

      const targetSlug = newSlug || slug;

      // If slug changed, delete old file first
      if (newSlug && newSlug !== slug) {
        const oldFile = await getPostFile(slug);
        if (oldFile) await deletePostFile(slug, oldFile.sha);
      }

      // Get existing file sha for update
      const existingFile = newSlug && newSlug !== slug ? null : await getPostFile(slug);
      await savePostFile(targetSlug, content, existingFile?.sha || null, `cms: update post "${title}"`);

      // Update manifest entry
      posts[idx] = {
        ...posts[idx],
        title: title ?? posts[idx].title,
        slug: targetSlug,
        excerpt: excerpt ?? posts[idx].excerpt,
        category: category ?? posts[idx].category,
        status: status ?? posts[idx].status,
        readTime: readTime ?? posts[idx].readTime,
        metaTitle: metaTitle ?? posts[idx].metaTitle,
        metaDescription: metaDescription ?? posts[idx].metaDescription,
      };

      await saveManifest(posts, manifestSha);
      return res.status(200).json(posts[idx]);
    } catch (err) {
      console.error('PUT /api/posts/:slug error:', err);
      return res.status(500).json({ error: err.message || 'Failed to update post' });
    }
  }

  // DELETE /api/posts/:slug — delete post (admin only)
  if (req.method === 'DELETE') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const file = await getPostFile(slug);
      if (!file) return res.status(404).json({ error: 'Post not found' });

      await deletePostFile(slug, file.sha);

      const { sha: manifestSha, posts } = await getManifest();
      const filtered = posts.filter(p => p.slug !== slug);
      await saveManifest(filtered, manifestSha);

      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error('DELETE /api/posts/:slug error:', err);
      return res.status(500).json({ error: err.message || 'Failed to delete post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
