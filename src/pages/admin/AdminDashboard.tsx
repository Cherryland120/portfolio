import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, Eye, EyeOff, LogOut, Loader, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface PostMeta {
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  category?: string;
  status: 'draft' | 'published';
  date: string;
  readTime?: string;
}

export const AdminDashboard: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');

  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'posts' ? '/api/posts' : '/api/projects';
      const res = await fetch(endpoint, { headers: authHeader });
      if (res.ok) setItems(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const endpoint = activeTab === 'posts' ? `/api/posts/${slug}` : `/api/projects/${slug}`;
      const res = await fetch(endpoint, { method: 'DELETE', headers: authHeader });
      if (res.ok) setItems(prev => prev.filter(p => p.slug !== slug));
      else alert('Failed to delete item.');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (item: PostMeta) => {
    setToggling(item.slug);
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      // Fetch current content first
      const endpoint = activeTab === 'posts' ? `/api/posts/${item.slug}` : `/api/projects/${item.slug}`;
      const contentRes = await fetch(endpoint, { headers: authHeader });
      const full = await contentRes.json();

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { ...authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...full, status: newStatus }),
      });
      if (res.ok) {
        setItems(prev => prev.map(p => p.slug === item.slug ? { ...p, status: newStatus } : p));
      } else {
        alert('Failed to update status.');
      }
    } finally {
      setToggling(null);
    }
  };

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const published = items.filter(p => p.status === 'published');
  const drafts = items.filter(p => p.status === 'draft');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{
        background: 'rgba(15, 15, 15, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FileText size={20} color="var(--accent)" />
          <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>Admin CMS</h1>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.25rem' }}>
            <button
              onClick={() => setActiveTab('posts')}
              style={{
                background: activeTab === 'posts' ? 'var(--accent)' : 'transparent',
                color: activeTab === 'posts' ? '#000' : 'var(--text-secondary)',
                border: 'none', padding: '0.4rem 1rem', borderRadius: '6px',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              style={{
                background: activeTab === 'projects' ? 'var(--accent)' : 'transparent',
                color: activeTab === 'projects' ? '#000' : 'var(--text-secondary)',
                border: 'none', padding: '0.4rem 1rem', borderRadius: '6px',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              Projects
            </button>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {published.length} published · {drafts.length} drafts
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to={activeTab === 'posts' ? '/admin/new' : '/admin/projects/new'} style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, var(--accent) 0%, #00d2ff 100%)', border: 'none',
            color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '24px',
            fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 210, 255, 0.4)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 210, 255, 0.3)'; }}
          >
            <PlusCircle size={14} /> New {activeTab === 'posts' ? 'Post' : 'Project'}
          </Link>
          <button onClick={handleLogout} style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-primary)', padding: '0.5rem 1.25rem', borderRadius: '24px',
            fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem' }}>Loading posts...</p>
          </div>
        ) : items.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            borderRadius: '12px',
          }}>
            <FileText size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '0.5rem' }}>No {activeTab} yet</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Create your first {activeTab === 'posts' ? 'article' : 'project'} to get started.
            </p>
            <Link to={activeTab === 'posts' ? '/admin/new' : '/admin/projects/new'} className="btn btn-primary">
              <PlusCircle size={16} /> Create First {activeTab === 'posts' ? 'Post' : 'Project'}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map(item => (
              <div key={item.slug} style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                transition: 'border-color 0.2s',
              }}>
                {/* Status Badge */}
                <span style={{
                  background: item.status === 'published' ? 'var(--success-alpha-10)' : 'var(--accent-alpha-10)',
                  color: item.status === 'published' ? 'var(--success)' : 'var(--accent)',
                  padding: '0.2rem 0.65rem', borderRadius: '8px',
                  fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                  {item.status}
                </span>

                {/* Post info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, margin: '0 0 0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0 }}>
                    {activeTab === 'posts' ? item.category : 'Project'} · {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    disabled={toggling === item.slug}
                    title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                    style={{
                      background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
                      padding: '0.45rem 0.65rem', cursor: 'pointer', color: 'var(--text-secondary)',
                      transition: 'all 0.2s', display: 'flex',
                    }}
                  >
                    {toggling === item.slug ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      : item.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <Link
                    to={activeTab === 'posts' ? `/admin/edit/${item.slug}` : `/admin/projects/edit/${item.slug}`}
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
                    onClick={() => handleDelete(item.slug, item.title)}
                    disabled={deleting === item.slug}
                    title="Delete"
                    style={{
                      background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
                      padding: '0.45rem 0.65rem', cursor: 'pointer', color: 'var(--error)',
                      transition: 'all 0.2s', display: 'flex',
                    }}
                  >
                    {deleting === item.slug ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
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
