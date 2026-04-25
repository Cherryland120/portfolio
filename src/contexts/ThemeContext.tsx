import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';
const DAY_START = 6;   // 6:00 AM
const DAY_END = 18;    // 6:00 PM

function getTimeBasedTheme(): Theme {
    const hour = new Date().getHours();
    return (hour >= DAY_START && hour < DAY_END) ? 'light' : 'dark';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme;
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        return getTimeBasedTheme();
    });

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        // Auto-switch based on time if no manual override
        const interval = setInterval(() => {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                const currentExpectedTheme = getTimeBasedTheme();
                if (theme !== currentExpectedTheme) {
                    setTheme(currentExpectedTheme);
                }
            }
        }, 60000); // Check every 60 seconds

        return () => clearInterval(interval);
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        setTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
