import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        if (isHome) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Unlikely to click if they are not exposed, but just in case
            navigate(`/#${hash}`);
        }
    };

    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="logo" style={{ textDecoration: 'none' }}>Anointing T-T</Link>
                
                {isHome ? (
                    <ul className="nav-links">
                        <li><a href="#work" onClick={(e) => handleAnchorClick(e, 'work')}>work</a></li>
                        <li><a href="#projects" onClick={(e) => handleAnchorClick(e, 'projects')}>projects</a></li>
                        <li><a href="#blog" onClick={(e) => handleAnchorClick(e, 'blog')}>blog</a></li>
                        <li><a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>contact</a></li>
                    </ul>
                ) : (
                    <Link to="/" className="back-link">
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
};
