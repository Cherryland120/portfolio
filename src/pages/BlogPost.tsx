import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Link2, Check } from 'lucide-react';

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: string;
  date: string;
  readTime: string;
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
  content: string;
}

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null; }
        return res.json();
      })
      .then(data => { if (data) setPost(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Update document title + meta on load
  useEffect(() => {
    if (!post) return;
    document.title = `${post.metaTitle || post.title} | Anointing's Blog`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.metaDescription || post.excerpt);
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post?.title || '');

  if (loading) return (
    <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Loading article...
    </div>
  );

  if (notFound || !post) return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <h1>Article Not Found</h1>
      <p className="hero-subtitle">This post may have been moved or removed.</p>
      <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        <ArrowLeft size={16} /> Back to Blog
      </Link>
    </section>
  );

  return (
    <>
      {/* Article Header */}
      <section className="hero" style={{ paddingBottom: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> All articles
          </Link>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.25rem', maxWidth: '800px' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Tag size={14} /> {post.category}
          </span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} /> {post.readTime}
          </span>
        </div>
        {post.excerpt && (
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '680px', lineHeight: 1.7, marginBottom: '2rem', textAlign: 'center' }}>
            {post.excerpt}
          </p>
        )}
        
        {post.image && (
          <div style={{ 
            marginTop: '2.5rem', 
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
                src={post.image} 
                alt={post.title} 
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

      {/* Article Content */}
      <section className="section" style={{ paddingTop: '2rem', borderTop: 'none' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="article-body" style={{ textAlign: 'justify' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share section */}
          <div style={{
            marginTop: '3rem', paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Share this article:</span>
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
            <Link to="/blog" className="btn btn-secondary" style={{ gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
