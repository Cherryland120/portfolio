// components.js

function computeBasePath() {
    // Split path into segments, remove empty ones
    const segments = window.location.pathname.split("/").filter(s => s !== "");
    //chrom
    // If we're at root (e.g. /index.html), no '../' needed
    if (segments.length <= 1) return "";

    // For any deeper folder, subtract 1 for the file itself
    const depth = segments.length - 1;

    // Build "../" repeated for the directory depth
    return "../".repeat(depth);
}

const base = computeBasePath();

const navbar = `
    <nav>
        <div class="nav-container">
            <a href="${base}index.html" class="logo">AT</a>
            <ul class="nav-links">
                <li><a href="${base}index.html">Home</a></li>
                <li><a href="${base}projects.html">Projects</a></li>
                <li><a href="${base}blog.html">Blog</a></li>
                <li><a href="${base}DemoBuild1/index.html">Game</a></li>
            </ul>
        </div>
    </nav>
`;

const footer = `
    <footer id="contact">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Contact Information</h3>
                    <p>📧 anointingtasker2002@gmail.com</p>
                    <p>📱 +234 902 518 9513</p>
                    <p>📍 Lagos, Nigeria</p>
                </div>
            </div>
        </div>
    </footer>
`;

function loadComponents() {
    document.body.insertAdjacentHTML('afterbegin', navbar);
    document.body.insertAdjacentHTML('beforeend', footer);
}
