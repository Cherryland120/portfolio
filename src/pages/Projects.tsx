import React, { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import type { ProjectCardProps } from "../components/ProjectCard";

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/assets/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="header">
        <h1>my projects.</h1>
        <p className="header-subtitle">
          A collection of projects I've built, ranging from AI systems to game
          development
        </p>
      </section>

      <section className="projects-container">
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="loading">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} isFeatured={false} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
