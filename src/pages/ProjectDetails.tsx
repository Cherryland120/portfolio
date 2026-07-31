import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Calendar, ArrowLeft, Share2, Link2, Check, ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  github: string;
  icon: string;
  status: string;
  date: string;
  content: string;
}

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/projects/${slug}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null; }
        return res.json();
      })
      .then(data => { if (data) setProject(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Update document title on load
  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} | Anointing's Projects`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', project.description);
  }, [project]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(project?.title || '');

  if (loading) return (
    <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Loading project...
    </div>
  );

  if (notFound || !project) return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <h1>Project Not Found</h1>
      <p className="hero-subtitle">This project may have been moved or removed.</p>
      <Link to="/projects" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        <ArrowLeft size={16} /> Back to Projects
      </Link>
    </section>
  );

  return (
    <>
      {/* Project Header */}
      <section className="hero" style={{ paddingBottom: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> All projects
          </Link>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.25rem', maxWidth: '800px' }}>
          {project.title}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} />
            {new Date(project.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Project Links */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                    <Github size={16} /> Source Code
                </a>
            )}
        </div>

        {project.description && (
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '680px', lineHeight: 1.7, marginBottom: '2rem', textAlign: 'center' }}>
            {project.description}
          </p>
        )}
        
        {project.icon && (
          <div style={{ 
            marginTop: '1.5rem', 
            marginBottom: '1rem',
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <div style={{
              width: '100%',
              maxWidth: '600px',
              height: '320px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <img 
                src={project.icon} 
                alt={project.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  objectPosition: 'center',
                  display: 'block' 
                }} 
              />
            </div>
          </div>
        )}
      </section>

      {/* Project Content */}
      <section className="section" style={{ paddingTop: '2rem', borderTop: 'none' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="article-body">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {project.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '3rem' }}>
                {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                ))}
             </div>
          )}

          {/* Share section */}
          <div style={{
            marginTop: '3rem', paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Share this project:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ gap: '0.5rem', fontSize: '0.85rem', padding: '0.45rem 0.875rem' }}
            >
              <Share2 size={14} /> X / Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ gap: '0.5rem', fontSize: '0.85rem', padding: '0.45rem 0.875rem' }}
            >
              <Share2 size={14} /> LinkedIn
            </a>
            <button onClick={handleCopyLink} className="btn btn-secondary"
              style={{ gap: '0.5rem', fontSize: '0.85rem', padding: '0.45rem 0.875rem' }}
            >
              {copied ? <><Check size={14} /> Copied!</> : <><Link2 size={14} /> Copy Link</>}
            </button>
          </div>

          {/* Back link */}
          <div style={{ marginTop: '2rem' }}>
            <Link to="/projects" className="btn btn-secondary" style={{ gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
