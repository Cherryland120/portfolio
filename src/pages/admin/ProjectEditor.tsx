import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import { Save, ArrowLeft, Loader, Eye, Code } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Custom Inline Code Command for MDEditor
const codeInlineCommand: ICommand = {
  name: 'codeInline',
  keyCommand: 'codeInline',
  buttonProps: { 'aria-label': 'Insert Inline Code' },
  icon: <Code size={14} />,
  execute: (state, api) => {
    let modifyText = `\`${state.selectedText}\``;
    if (!state.selectedText) {
      modifyText = `\`code\``;
    }
    api.replaceSelection(modifyText);
  },
};

export const ProjectEditor: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const isEditing = !!slug;
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [slugLocked, setSlugLocked] = useState(false);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [github, setGithub] = useState('');
  const [tags, setTags] = useState('');
  
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [content, setContent] = useState('# Project Title\n\nWrite about your project here...');
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
        const res = await fetch(`/api/projects/${slug}`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) { navigate('/admin'); return; }
        const data = await res.json();
        setTitle(data.title);
        setPostSlug(data.slug);
        setSlugLocked(true);
        setDescription(data.description || '');
        setIcon(data.icon || '');
        setGithub(data.github || '');
        setTags((data.tags || []).join(', '));
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
    
    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      title, 
      slug: postSlug, 
      description,
      icon,
      github,
      tags: parsedTags,
      content, 
      status: finalStatus,
    };
    try {
      const url = isEditing ? `/api/projects/${slug}` : '/api/projects';
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
        background: 'rgba(15, 15, 15, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1rem', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
      }}>
        <button onClick={() => navigate('/admin')} style={{ 
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'transparent', border: '1px solid transparent',
          color: 'var(--text-secondary)', padding: '0.5rem 0.5rem', borderRadius: '8px',
          fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', letterSpacing: '0.02em' }}>
            {isEditing ? `Editing: ${title}` : 'New Project'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {saved && <span style={{ color: 'var(--success)', fontSize: '0.875rem', fontWeight: 500, marginRight: '0.5rem' }}>✓ Saved!</span>}
          <button onClick={() => handleSave('draft')} disabled={loading} style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-primary)', padding: '0.5rem 1.25rem', borderRadius: '24px',
            fontSize: '0.875rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { if (!loading) { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; } }}
          onMouseOut={(e) => { if (!loading) { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; } }}
          >
            {loading && status === 'draft' ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={loading} style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, var(--accent) 0%, #00d2ff 100%)', border: 'none',
            color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '24px',
            fontSize: '0.875rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)'
          }}
          onMouseOver={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 210, 255, 0.4)'; } }}
          onMouseOut={(e) => { if (!loading) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 210, 255, 0.3)'; } }}
          >
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
            Project Settings
          </h3>

          {/* Status toggle */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              style={{
                width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)',
                border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)',
                fontSize: '0.9rem', outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="draft">Draft (Hidden)</option>
              <option value="published">Published (Live)</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Title *</label>
            <input value={title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Project title..."
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
          </div>

          {/* Icon (Image URL) */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Thumbnail Image URL</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} placeholder="/assets/img/project.jpg"
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>GitHub URL</label>
            <input value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/..."
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Tags (comma separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Unity, WebGL"
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Short summary..."
              style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.875rem', resize: 'vertical', boxSizing: 'border-box' }}
            />
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
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.divider,
              commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
                name: 'title',
                groupName: 'title',
                buttonProps: { 'aria-label': 'Insert title' }
              }),
              commands.divider,
              commands.link,
              commands.quote,
              commands.codeBlock,
              codeInlineCommand,
              commands.divider,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.checkedListCommand,
            ]}
          />
        </div>
      </div>
    </div>
  );
};
