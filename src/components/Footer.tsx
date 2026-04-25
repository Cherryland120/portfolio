import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-links">
                <a href="https://www.linkedin.com/in/anointing-tamunowunari-tasker" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/cherryland120" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="mailto:anointing.tasker@icloud.com">Email</a>
                <a href="/assets/data/Anointing Tamunowunari-Tasker.docx" download>Resume</a>
            </div>
            <p className="copyright">© {currentYear} Anointing Tamunowunari-Tasker</p>
        </footer>
    );
};
