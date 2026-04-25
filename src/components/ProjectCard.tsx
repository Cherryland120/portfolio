import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export interface ProjectCardProps {
    readonly id?: string;
    readonly title: string;
    readonly description: string;
    readonly icon: string;
    readonly tags: readonly string[];
    readonly github?: string;
    readonly details_page?: string;
    readonly isFeatured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    icon,
    tags,
    github,
    details_page,
    isFeatured = false
}) => {
    if (isFeatured) {
        // Featured project card (home page style)
        return (
            <div className="project-card">
                <div className="project-image">
                    <img src={icon} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="project-content">
                    <h3 className="project-title">{title}</h3>
                    <p className="project-description">{description}</p>
                    <div className="project-tags">
                        {tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                        ))}
                    </div>
                    <div className="project-links">
                        {details_page && (
                            <Link to={details_page.replace('.html', '')} className="project-link">Learn More →</Link>
                        )}
                        {github && (
                            <a href={github} className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Full project card (projects page style)
    return (
        <div className="project-card">
            <div className="project-image-container">
                <img src={icon} alt={title} className="project-image" loading="lazy" />
                <div className="project-image-overlay"></div>
            </div>
            
            <div className="project-info">
                <div className="project-header">
                    <h3 className="project-title">{title}</h3>
                    <div className="project-links">
                        {details_page && (
                            <Link to={details_page.replace('.html', '')} className="project-link">
                                <ExternalLink size={16} />
                                Details
                            </Link>
                        )}
                        {github && (
                            <a href={github} className="project-link" target="_blank" rel="noopener noreferrer">
                                <i className="devicon-github-original" style={{ fontSize: '16px' }}></i>
                                Source
                            </a>
                        )}
                    </div>
                </div>
                
                <p className="project-description">{description}</p>
                
                <div className="project-tags">
                    {tags.map((tag, i) => (
                        <span key={i} className="project-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};
