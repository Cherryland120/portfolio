/* ==========================================================================
   THEME ENGINE — Timezone-based automatic dark/light mode switching
   Usage: <script src="/assets/theme.js"></script>
   
   - 6 AM – 6 PM  → light mode  (sepia/orange)
   - 6 PM – 6 AM  → dark mode   (black/blue)
   - Manual toggle overrides auto-detection (persisted in localStorage)
   - Re-checks every 60s if no manual override
   ========================================================================== */

(function () {
    const STORAGE_KEY = 'portfolio-theme';
    const DAY_START = 6;   // 6:00 AM
    const DAY_END = 18;    // 6:00 PM

    /** Determine theme from local time */
    function getTimeBasedTheme() {
        const hour = new Date().getHours();
        return (hour >= DAY_START && hour < DAY_END) ? 'light' : 'dark';
    }

    /** Apply theme to <html> and update toggle icon */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcon(theme);
    }

    /** Update toggle button icon */
    function updateToggleIcon(theme) {
        const btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.textContent = theme === 'dark' ? '☀️' : '🌙';
            btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        }
    }

    /** Initialize theme (runs immediately, before DOM is ready) */
    function initTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
            applyTheme(stored);
        } else {
            applyTheme(getTimeBasedTheme());
        }
    }

    /** Toggle theme manually */
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    /** Inject the toggle button into the nav */
    function injectToggleButton() {
        // Find the nav container
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        // Don't add twice
        if (navContainer.querySelector('.theme-toggle')) return;

        const btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.setAttribute('aria-label', 'Toggle theme');
        btn.addEventListener('click', toggleTheme);
        navContainer.appendChild(btn);

        // Set initial icon
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        updateToggleIcon(theme);
    }

    /** Auto-update theme based on time (only if no manual override) */
    function startAutoSwitch() {
        setInterval(function () {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                applyTheme(getTimeBasedTheme());
            }
        }, 60000); // Check every 60 seconds
    }

    // ── Run immediately (before DOM) to prevent flash ──
    initTheme();

    // ── Run after DOM is ready ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            injectToggleButton();
            startAutoSwitch();
        });
    } else {
        injectToggleButton();
        startAutoSwitch();
    }
})();
