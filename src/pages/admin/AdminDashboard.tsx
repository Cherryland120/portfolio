import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, Eye, EyeOff, LogOut, Loader, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface PostMeta {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published';
  date: string;
  readTime: string;
}

export const AdminDashboard: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts', { headers: authHeader });
      if (res.ok) setPosts(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE', headers: authHeader });
      if (res.ok) setPosts(prev => prev.filter(p => p.slug !== slug));
      else alert('Failed to delete post.');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (post: PostMeta) => {
    setToggling(post.slug);
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      // Fetch current content first
      const contentRes = await fetch(`/api/posts/${post.slug}`, { headers: authHeader });
      const full = await contentRes.json();

      const res = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { ...authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...full, status: newStatus }),
      });
      if (res.ok) {
        setPosts(prev => prev.map(p => p.slug === post.slug ? { ...p, status: newStatus } : p));
      } else {
        alert('Failed to update status.');
      }
    } finally {
      setToggling(null);
    }
  };

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const published = posts.filter(p => p.status === 'published');
  const drafts = posts.filter(p => p.status === 'draft');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FileText size={20} color="var(--accent)" />
          <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Blog CMS</h1>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {published.length} published · {drafts.length} drafts
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/new" className="btn btn-primary" style={{ gap: '0.5rem' }}>
            <PlusCircle size={16} /> New Post
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem' }}>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            borderRadius: '12px',
          }}>
            <FileText size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem' }}>No posts yet</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Write your first article to get started.
            </p>
            <Link to="/admin/new" className="btn btn-primary">
              <PlusCircle size={16} /> Create First Post
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {posts.map(post => (
              <div key={post.slug} style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                transition: 'border-color 0.2s',
              }}>
                {/* Status Badge */}
                <span style={{
                  background: post.status === 'published' ? 'var(--success-alpha-10)' : 'var(--accent-alpha-10)',
                  color: post.status === 'published' ? 'var(--success)' : 'var(--accent)',
                  padding: '0.2rem 0.65rem', borderRadius: '8px',
                  fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                  {post.status}
                </span>

                {/* Post info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, margin: '0 0 0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0 }}>
                    {post.category} · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {post.readTime}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    onClick={() => handleToggleStatus(post)}
                    disabled={toggling === post.slug}
                    title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                    style={{
                      background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
                      padding: '0.45rem 0.65rem', cursor: 'pointer', color: 'var(--text-secondary)',
                      transition: 'all 0.2s', display: 'flex',
                    }}
                  >
                    {toggling === post.slug ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      : post.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <Link
                    to={`/admin/edit/${post.slug}`}
                    title="Edit"
                    style={{
                      background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
                      padding: '0.45rem 0.65rem', color: 'var(--text-secondary)',
                      transition: 'all 0.2s', display: 'flex', textDecoration: 'none',
                    }}
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    disabled={deleting === post.slug}
                    title="Delete"
                    style={{
                      background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
                      padding: '0.45rem 0.65rem', cursor: 'pointer', color: 'var(--error)',
                      transition: 'all 0.2s', display: 'flex',
                    }}
                  >
                    {deleting === post.slug ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
