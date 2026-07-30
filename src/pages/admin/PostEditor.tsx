import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Save, ArrowLeft, Loader, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function calcReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

export const PostEditor: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const isEditing = !!slug;
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [slugLocked, setSlugLocked] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [content, setContent] = useState('# Your Post Title\n\nStart writing here...');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const authHeader = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    if (!isEditing) return;
    (async () => {
      setFetching(true);
      try {
        const res = await fetch(`/api/posts/${slug}`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) { navigate('/admin'); return; }
        const data = await res.json();
        setTitle(data.title);
        setPostSlug(data.slug);
        setSlugLocked(true);
        setExcerpt(data.excerpt || '');
        setCategory(data.category || '');
        setMetaTitle(data.metaTitle || '');
        setMetaDesc(data.metaDescription || '');
        setStatus(data.status);
        setContent(data.content || '');
      } finally {
        setFetching(false);
      }
    })();
  }, [slug]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugLocked) setPostSlug(slugify(val));
  };

  const handleSave = async (saveStatus?: 'draft' | 'published') => {
    if (!title || !postSlug || !content) {
      setError('Title, slug, and content are required.');
      return;
    }
    setError('');
    setLoading(true);
    const finalStatus = saveStatus ?? status;
    const payload = {
      title, slug: postSlug, excerpt, category: category || 'General',
      content, status: finalStatus,
      metaTitle: metaTitle || title, metaDescription: metaDesc || excerpt,
      readTime: calcReadTime(content),
    };
    try {
      const url = isEditing ? `/api/posts/${slug}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader, body: JSON.stringify(payload) });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Save failed');
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (!isEditing) navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <Loader size={32} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
        padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1rem', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <button onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isEditing ? `Editing: ${title}` : 'New Post'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {saved && <span style={{ color: 'var(--success)', fontSize: '0.875rem', alignSelf: 'center' }}>✓ Saved!</span>}
          <button onClick={() => handleSave('draft')} disabled={loading} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
            {loading && status === 'draft' ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={loading} className="btn btn-primary" style={{ gap: '0.5rem' }}>
            {loading && status === 'published' ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Eye size={14} />}
            Publish
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar: metadata */}
        <div style={{
          width: '320px', flexShrink: 0, background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)', padding: '1.5rem', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Post Settings
          </h3>

          {/* Status toggle */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Status</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['draft', 'published'] as const).map(s => (
                <button key={s} onClick={() => setStatus(s)} style={{
                  flex: 1, padding: '0.5rem', borderRadius: '8px', cursor: 'pointer',
                  border: `1px solid ${status === s ? 'var(--accent)' : 'var(--border)'}`,
                  background: status === s ? 'var(--accent-alpha-10)' : 'transparent',
                  color: status === s ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: status === s ? 600 : 400, fontSize: '0.85rem', transition: 'all 0.2s',
                }}>
                  {s === 'published' ? <><Eye size={12} style={{ display: 'inline', marginRight: 4 }} />Published</> : <><EyeOff size={12} style={{ display: 'inline', marginRight: 4 }} />Draft</>}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Title *</label>
            <input value={title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Post title..."
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Slug */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              URL Slug *
              {!isEditing && (
                <button onClick={() => setSlugLocked(!slugLocked)} style={{ marginLeft: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.75rem', padding: 0 }}>
                  {slugLocked ? '🔒 unlock' : '🔓 lock'}
                </button>
              )}
            </label>
            <input value={postSlug} onChange={e => setPostSlug(slugify(e.target.value))} disabled={isEditing || slugLocked}
              placeholder="url-slug"
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: (isEditing || slugLocked) ? 'var(--bg-primary)' : 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', boxSizing: 'border-box', opacity: (isEditing || slugLocked) ? 0.7 : 1 }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              /blog/<strong>{postSlug || 'your-slug'}</strong>
            </p>
          </div>

          {/* Category */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Category</label>
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. AI, Machine Learning"
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Excerpt</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} placeholder="Short summary shown in blog list..."
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.875rem', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          {/* SEO */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SEO
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Meta Title</label>
                <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Leave blank to use post title"
                  style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
                <p style={{ fontSize: '0.72rem', color: metaTitle.length > 60 ? 'var(--error)' : 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {metaTitle.length}/60 chars
                </p>
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Meta Description</label>
                <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3} placeholder="Leave blank to use excerpt"
                  style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.875rem', resize: 'vertical', boxSizing: 'border-box' }}
                />
                <p style={{ fontSize: '0.72rem', color: metaDesc.length > 160 ? 'var(--error)' : 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {metaDesc.length}/160 chars
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p style={{ color: 'var(--error)', fontSize: '0.875rem', padding: '0.75rem', background: 'var(--error-alpha-10)', borderRadius: '8px' }}>
              {error}
            </p>
          )}
        </div>

        {/* Editor area */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} data-color-mode="dark">
          <MDEditor
            value={content}
            onChange={val => setContent(val || '')}
            height="100%"
            style={{ flex: 1, borderRadius: 0, border: 'none' }}
            preview="live"
          />
        </div>
      </div>
    </div>
  );
};
