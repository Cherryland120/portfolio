import React, { useEffect, useState } from "react";
import { Award, Cpu, GitBranch, Globe, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credential: string;
  category: string;
  tags: string[];
  link?: string;
}

export const Certifications: React.FC = () => {
  const [allCerts, setAllCerts] = useState<Certification[]>([]);
  const [filteredCerts, setFilteredCerts] = useState<Certification[]>([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, providers: 0 });

  useEffect(() => {
    fetch("/assets/data/certifications.json")
      .then((res) => res.json())
      .then((data: Certification[]) => {
        setAllCerts(data);
        setFilteredCerts(data);

        const providers = new Set(data.map((c) => c.issuer));
        setStats({ total: data.length, providers: providers.size });
      })
      .catch((err) => console.error("Error loading certs:", err));
  }, []);

  const handleFilter = (cat: string) => {
    setCurrentFilter(cat);
    if (cat === "all") {
      setFilteredCerts(allCerts);
    } else {
      setFilteredCerts(allCerts.filter((c) => c.category === cat));
    }
  };

  const getIcon = (issuer: string) => {
    switch (issuer) {
      case "IBM":
        return <Cpu size={24} color="var(--accent)" />;
      case "Atlassian":
        return <GitBranch size={24} color="var(--accent)" />;
      case "Duolingo":
        return <Globe size={24} color="var(--accent)" />;
      default:
        return <Award size={24} color="var(--accent)" />;
    }
  };

  return (
    <>
      <section className="hero" style={{ paddingBottom: '2rem' }}>
        <h1>Professional Certifications</h1>
        <p className="hero-subtitle">
          A comprehensive collection of verified credentials and achievements in
          AI, machine learning, and software engineering
        </p>

        <div className="github-summary" style={{ marginTop: '2rem' }}>
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label" style={{ display: 'block' }}>Total Certifications</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.providers}</span>
            <span className="stat-label" style={{ display: 'block' }}>Providers</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">2023-2025</span>
            <span className="stat-label" style={{ display: 'block' }}>Time Period</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem', borderTop: 'none' }}>
        <div className="tabs">
          <div className="tab-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <button
              className={`tab-button ${currentFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilter("all")}
            >
              All Certifications
            </button>
            <button
              className={`tab-button ${currentFilter === "ibm" ? "active" : ""}`}
              onClick={() => handleFilter("ibm")}
            >
              IBM
            </button>
            <button
              className={`tab-button ${currentFilter === "atlassian" ? "active" : ""}`}
              onClick={() => handleFilter("atlassian")}
            >
              Atlassian
            </button>
            <button
              className={`tab-button ${currentFilter === "other" ? "active" : ""}`}
              onClick={() => handleFilter("other")}
            >
              Other
            </button>
          </div>
        </div>

        <div className="projects-grid">
          {filteredCerts.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>
              No certifications found in this category.
            </p>
          ) : (
            filteredCerts.map((cert, idx) => {
              const hasLink = cert.link && cert.link.trim() !== "";

              const Content = () => (
                <>
                  <div className="cert-header">
                    <div className="cert-icon">{getIcon(cert.issuer)}</div>
                    <div className="cert-title-wrapper">
                      <div className="cert-title">{cert.title}</div>
                      <div className="cert-issuer">{cert.issuer}</div>
                    </div>
                  </div>
                  <div className="cert-credential">
                    <strong>ID:</strong> {cert.credential}
                  </div>
                  <div className="cert-tags">
                    {cert.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="cert-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {hasLink && <ExternalLink className="link-icon" size={24} />}
                </>
              );

              return hasLink ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card clickable"
                  key={idx}
                >
                  <Content />
                </a>
              ) : (
                <div className="cert-card not-available" key={idx}>
                  <Content />
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};
