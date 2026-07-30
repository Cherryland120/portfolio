import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Clock, ArrowRight, Tag } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  status: string;
}

export const Blog: React.FC = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setAllPosts(sorted);
        if (sorted.length > 0) {
          setFeaturedPost(sorted[0]);
          setFilteredPosts(sorted.slice(1));
        }

        const cats = new Set<string>();
        sorted.forEach((post) => {
          post.category.split(",").forEach((c) => cats.add(c.trim()));
        });
        setCategories(Array.from(cats));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog posts:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (cat: string) => {
    setCurrentFilter(cat);
    if (cat === "all") {
      setFilteredPosts(allPosts.slice(1));
    } else {
      setFilteredPosts(
        allPosts.filter((p) => p.category.includes(cat) && p !== featuredPost),
      );
    }
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "6rem 2rem", textAlign: "center" }}
      >
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <>
      <section className="hero" style={{ paddingBottom: '2rem' }}>
        <h1>blog & articles</h1>
        <p className="hero-subtitle">
          Thoughts on AI, machine learning, software engineering, and my journey
          in tech
        </p>
      </section>

      <section className="section" style={{ paddingTop: '2rem', borderTop: 'none' }}>
        {allPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.1rem' }}>No posts published yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <div className="featured-section">
                <div className="section-label">Featured Post</div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="featured-post"
                  style={{ textDecoration: "none" }}
                >
                  <div className="featured-content">
                    <div className="featured-badge">
                      <Star size={14} />
                      Featured
                    </div>
                    <h2>{featuredPost.title}</h2>
                    <div className="blog-meta">
                      <span>
                        <Calendar size={14} />{" "}
                        {new Date(featuredPost.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>
                        <Clock size={14} /> {featuredPost.readTime}
                      </span>
                    </div>
                    <p>{featuredPost.excerpt}</p>
                    <div className="btn-read">
                      Read Article
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="all-posts-section">
              <div className="controls">
                <div className="section-label">All Posts</div>
                <div className="post-count">{filteredPosts.length} posts</div>
              </div>

              <div className="tab-list" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <button
                  className={`tab-button ${currentFilter === "all" ? "active" : ""}`}
                  onClick={() => handleFilter("all")}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`tab-button ${currentFilter === cat ? "active" : ""}`}
                    onClick={() => handleFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredPosts.length === 0 ? (
                <p
                  style={{
                    color: "var(--text-secondary)",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  No posts found in this category.
                </p>
              ) : (
                <div className="blog-grid">
                  {filteredPosts.map((post, idx) => (
                    <Link
                      to={`/blog/${post.slug}`}
                      key={idx}
                      className="blog-post"
                    >
                      <h3 className="blog-title">{post.title}</h3>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-meta">
                        <span>
                          <Tag size={14} /> {post.category}
                        </span>
                        <span>•</span>
                        <span>
                          <Calendar size={14} />{" "}
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          <Clock size={14} /> {post.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};
