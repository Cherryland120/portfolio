import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
    return (
        <>
            <section className="hero" style={{ paddingBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                <p className="hero-subtitle">
                    Oops! We couldn't find the page you're looking for.
                </p>
                <p className="hero-description" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                    The link might be broken, or the page may have been removed. 
                    Don't worry, you can always navigate back to the homepage.
                </p>

                <div className="btn-group" style={{ justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-primary">
                        <Home size={18} style={{ display: 'inline', marginRight: '8px' }} />
                        Back to Homepage
                    </Link>
                    <Link to="/projects" className="btn btn-secondary">
                        <Search size={18} style={{ display: 'inline', marginRight: '8px' }} />
                        Browse Projects
                    </Link>
                </div>
            </section>
        </>
    );
};
