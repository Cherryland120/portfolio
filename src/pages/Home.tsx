import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, FileText, Send, Loader } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectCardProps } from "../components/ProjectCard";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export const Home: React.FC = () => {
  // -- Carousel state --
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // -- Tab state --
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  // -- Data state --
  const [featuredProjects, setFeaturedProjects] = useState<ProjectCardProps[]>(
    [],
  );
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<{
    type: "success" | "error" | "info";
    text: React.ReactNode;
  } | null>(null);

  // -- Fetch data --
  useEffect(() => {
    // Fetch projects from CMS API
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: any[]) => {
        const adapted: ProjectCardProps[] = data.slice(0, 2).map((p) => ({
          title: p.title,
          description: p.description || '',
          icon: p.icon || '',
          tags: p.tags || [],
          github: p.github || undefined,
          details_page: `/projects/${p.slug}`,
          isFeatured: true,
        }));
        setFeaturedProjects(adapted);
      })
      .catch((err) => console.error("Error loading projects:", err));

    // Fetch blog posts
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setRecentPosts(data.slice(0, 2));
      })
      .catch((err) => {
        console.error("Error loading blog posts:", err);
        // Fallback
        setRecentPosts([
          {
            title:
              "Building Enterprise-Grade ML Systems: Lessons from Production",
            excerpt:
              "A deep dive into deploying machine learning models in production environments...",
            category: "AI/ML",
            date: "2025-12-15",
            readTime: "8 min read",
            slug: "#",
          },
        ]);
      });
  }, []);

  // -- Form Submit --
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      review: formData.get("review") as string,
    };

    setIsSubmitting(true);
    setReviewMessage(null);

    try {
      const API_URL =
        "https://tasguardapi-production.up.railway.app/api/review";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (resData.success) {
        setReviewMessage({
          type: "success",
          text: (
            <>
              <strong>Thank you for your feedback!</strong>
              <br />
              Your review was classified as:{" "}
              <strong>{resData.sentiment}</strong>
            </>
          ),
        });
        form.reset();
        setTimeout(() => setReviewMessage(null), 5000);
      } else {
        throw new Error(resData.error || "Failed to submit review");
      }
    } catch (error: any) {
      console.error("Error submitting review:", error);
      setReviewMessage({
        type: "error",
        text: (
          <>
            <strong>Oops! Something went wrong.</strong>
            <br />
            {error.message}
          </>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div
            className="profile-carousel"
            onMouseEnter={() => {}} // Could pause timer
            onMouseLeave={() => {}}
          >
            <div className="carousel-container">
              <button
                className="carousel-btn carousel-btn-left"
                onClick={() =>
                  setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides)
                }
              >
                ‹
              </button>
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <img
                  src="/assets/images/profile_images/profile_1.jpg"
                  alt="Profile 1"
                  className="profile-img"
                />
                <img
                  src="/assets/images/profile_images/profile_2.jpg"
                  alt="Profile 2"
                  className="profile-img"
                />
                <img
                  src="/assets/images/profile_images/profile_3.jpg"
                  alt="Profile 3"
                  className="profile-img"
                />
                <img
                  src="/assets/images/profile_images/profile_4.jpg"
                  alt="Profile 4"
                  className="profile-img"
                />
                <img
                  src="/assets/images/profile_images/profile_5.jpg"
                  alt="Profile 5"
                  className="profile-img"
                />
              </div>
              <button
                className="carousel-btn carousel-btn-right"
                onClick={() => setCurrentSlide((s) => (s + 1) % totalSlides)}
              >
                ›
              </button>
            </div>
            <div className="carousel-indicators">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <span
                  key={i}
                  className={`indicator ${currentSlide === i ? "active" : ""}`}
                  onClick={() => setCurrentSlide(i)}
                ></span>
              ))}
            </div>
          </div>

          <div className="hero-content">
            <h1>hi anointing here. 👋</h1>
            <p className="hero-subtitle">
              23 year old data analyst and software engineer from Nigeria 🇳🇬
            </p>
            <p className="hero-description">
              Data Analyst by profession
              <br />
              Software Engineer by passion.
            </p>

            <div className="btn-group">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/anointing-tamunowunari-tasker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="devicon-linkedin-plain"
                  style={{ fontSize: "18px" }}
                ></i>{" "}
                LinkedIn
              </a>
              <a
                href="https://github.com/cherryland120"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="devicon-github-original"
                  style={{ fontSize: "18px" }}
                ></i>{" "}
                GitHub
              </a>
              <a href="mailto:anointing.tasker@icloud.com">
                <Mail size={18} /> Email
              </a>
              <a
                href="/assets/data/Anointing Tamunowunari-Tasker.docx"
                download
              >
                <FileText size={18} style={{ display: "inline" }} /> Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Work & Education Section with Tabs */}
      <section className="section" id="work">
        <div className="tabs">
          <div className="tab-list">
            <button
              className={`tab-button ${activeTab === "work" ? "active" : ""}`}
              onClick={() => setActiveTab("work")}
            >
              Work
            </button>
            <button
              className={`tab-button ${activeTab === "education" ? "active" : ""}`}
              onClick={() => setActiveTab("education")}
            >
              Education
            </button>
          </div>

          {activeTab === "work" && (
            <div className="tab-content active">
              <div className="work-grid">
                <div className="work-item">
                  <div className="work-header">
                    <div>
                      <div className="work-company">Tasguard Solutions</div>
                      <div className="work-role">
                        Founder and Lead Developer
                      </div>
                    </div>
                    <div className="work-period">Aug 2025 - Present</div>
                  </div>
                  <p className="work-description">
                    Developed ML models using Python, TensorFlow, and Keras to
                    detect fraud in petroleum plants, improving detection
                    accuracy by 90% and reducing processing time by over 80%
                    through advanced feature engineering and optimization.
                  </p>
                </div>
                <div className="work-item">
                  <div className="work-header">
                    <div>
                      <div className="work-company">Ani Alajo</div>
                      <div className="work-role">Business Analyst</div>
                    </div>
                    <div className="work-period">Nov 2025 - Present</div>
                  </div>
                  <p className="work-description">
                    Analyzed key performance metrics per employee, providing
                    actionable solutions that improved overall efficiency by
                    20%. Acted as an advisory to the managing director, offering
                    strategic insights that enhanced decision-making processes.
                  </p>
                </div>
                <div className="work-item">
                  <div className="work-header">
                    <div>
                      <div className="work-company">TotalEnergies</div>
                      <div className="work-role">Safety Engineering Intern</div>
                    </div>
                    <div className="work-period">Mar 2023 - Aug 2023</div>
                  </div>
                  <p className="work-description">
                    Promoted best practices in offshore safety operations,
                    managing databases for PPE and OSP tracking. Contributed to
                    safety audits and maintained accurate records, improving
                    audit efficiency by over 50%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="tab-content active">
              <div className="work-grid">
                <div className="work-item">
                  <div className="work-header">
                    <div>
                      <div className="work-company">Covenant University</div>
                      <div className="work-role">
                        Bachelor of Engineering in Information and Communication
                        Engineering
                      </div>
                    </div>
                    <div className="work-period">2019 - 2024</div>
                  </div>
                  <p className="work-description">
                    Focused on Information Theory, Transformation,
                    Representations, Security and Storage as well as Mobile,
                    Satellite and Optical Communication Engineering amongst
                    others. Graduated with second class upper honors, completing
                    several projects in Electronic Communication, AI and Wave
                    Propagation.
                  </p>
                </div>
                <div className="work-item">
                  <div className="work-header">
                    <div>
                      <div className="work-company">Certifications</div>
                      <div className="work-role">
                        Professional Certifications
                      </div>
                    </div>
                    <div className="work-period">2023 - 2025</div>
                  </div>
                  <p className="work-description">
                    • IBM Certified AI Engineer
                    <br />• Introduction to Software Engineering
                  </p>
                  <Link
                    to="/certifications"
                    className="btn btn-primary"
                    style={{ marginTop: "1rem" }}
                  >
                    View Certifications
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section" id="projects">
        <div className="section-header">
          <h2 className="section-title">featured projects</h2>
          <Link to="/projects" className="view-more">
            view more
          </Link>
        </div>
        <div className="projects-grid">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={idx} {...project} isFeatured={true} />
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section" id="blog">
        <div className="section-header">
          <h2 className="section-title">recent posts</h2>
          <Link to="/blog" className="view-more">
            view more
          </Link>
        </div>
        <div className="blog-grid">
          {recentPosts.map((post, idx) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              },
            );
            return (
              <Link
                to={post.slug === "#" ? "#" : `/blog/${post.slug}`}
                key={idx}
                className="blog-post"
              >
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section className="section" id="skills">
        <div className="section-header">
          <h2 className="section-title">skills & expertise</h2>
        </div>
        <div className="skills-container">
          <span className="skill-tag">
            <i className="devicon-python-plain"></i> Python
          </span>
          <span className="skill-tag">
            <i className="devicon-tensorflow-original"></i> TensorFlow
          </span>
          <span className="skill-tag">
            <i className="devicon-keras-plain"></i> Keras
          </span>
          <span className="skill-tag">
            <i className="devicon-pytorch-original"></i> PyTorch
          </span>
          <span className="skill-tag">🤖 Machine Learning</span>
          <span className="skill-tag">🧠 Deep Learning</span>
          <span className="skill-tag">🔗 CNNs</span>
          <span className="skill-tag">💬 RAG</span>
          <span className="skill-tag">⛓️ LangChain</span>
          <span className="skill-tag">
            <i className="devicon-java-plain"></i> Java
          </span>
          <span className="skill-tag">
            <i className="devicon-csharp-plain"></i> C#
          </span>
          <span className="skill-tag">📊 Data Analysis</span>
          <span className="skill-tag">📈 Business Intelligence</span>
        </div>
      </section>

      {/* GitHub Activity */}
      <section className="section" id="github">
        <div className="section-header">
          <h2 className="section-title">github activity</h2>
        </div>
        <div className="github-stats-container">
          <div className="contribution-graph" style={{ display: 'flex', justifyContent: 'center', background: 'transparent', border: 'none', padding: '0' }}>
            <img 
              src="https://raw.githubusercontent.com/Cherryland120/Cherryland120/output/github-contribution-grid-snake.svg" 
              alt="GitHub Contribution Graph" 
              style={{ width: '100%', maxWidth: '900px' }} 
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="section-header">
          <h2 className="section-title">get in touch</h2>
        </div>
        <p className="hero-description">
          Currently open to new opportunities in AI/ML engineering and
          consulting. Feel free to reach out for collaborations or just to
          connect.
        </p>
        <div className="btn-group">
          <a
            href="mailto:anointing.tasker@icloud.com"
            className="btn btn-primary"
          >
            Send Email
          </a>
          <a
            href="https://www.linkedin.com/in/anointing-tamunowunari-tasker"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Website Review Section */}
      <section className="section" id="review">
        <div className="section-header">
          <h2 className="section-title">share your thoughts</h2>
        </div>
        <p className="hero-description">
          I'd love to hear your feedback about this website! Your thoughts help
          me improve.
        </p>

        <div className="review-form-container">
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label htmlFor="reviewName">Your Name</label>
              <input
                type="text"
                id="reviewName"
                name="name"
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reviewText">Your Review</label>
              <textarea
                id="reviewText"
                name="review"
                rows={4}
                placeholder="Share your brief thoughts about this website..."
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={18} /> Submit Review
                </>
              )}
            </button>
          </form>

          {reviewMessage && (
            <div
              className={`review-message ${reviewMessage.type}`}
              style={{ display: "block" }}
            >
              {reviewMessage.text}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
