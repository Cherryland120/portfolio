# My Developer Portfolio

Welcome to my full-stack web portfolio! This repository houses a comprehensive, interactive personal website built with React, TypeScript, and Vite. 
It features a custom blog, project showcase, dynamic review system, a securely authenticated admin dashboard, and an integrated WebAssembly terminal emulator (CLIverse).

## Key Features

- **Home Page**: Features a profile carousel, featured projects, recent blog posts, and a sentiment-analyzed review submission form (`TasGuard API`).
- **Custom Blog System**: A fully functional blog rendering Markdown posts dynamically fetched from an API.
- **Project Showcase**: Detailed views for individual projects, complete with tags, tech stacks, and GitHub integration.
- **Admin Dashboard**: A protected route for managing portfolio content and blog posts, secured by a custom Vercel Serverless backend.
- **CLIverse**: A standout "easter egg" feature! A built-in terminal emulator (`xterm.js`) that runs native CLI programs (compiled from Rust to WASM) securely in the browser using Web Workers, `@bjorn3/browser_wasi_shim`, and `SharedArrayBuffer` for synchronous I/O.
- **Theme Toggle**: Built-in support for dark and light modes.

## Security & Authentication

The **Admin Dashboard** is tightly secured using industry-standard practices:
- **No Hardcoded Passwords**: The plaintext password is never stored in the codebase. Instead, it uses `bcrypt.compare` in a Vercel Serverless Function (`api/auth/login.js`) to validate input against a securely hashed environment variable (`ADMIN_PASSWORD_HASH`).
- **Stateless Sessions**: Successful authentication generates a secure JSON Web Token (`JWT_SECRET`), which is used to authorize subsequent actions without maintaining state on the server.
- **Environment Isolation**: All secrets and hashes are injected strictly via server-side environment variables and are never exposed to the frontend React application.

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with comprehensive design tokens and responsive media queries
- **Routing**: React Router DOM (v7)
- **Content Rendering**: `react-markdown`, `rehype-raw`, `remark-gfm`
- **Security & Auth**: `bcryptjs`, `jsonwebtoken`, Vercel Serverless Functions
- **Terminal Emulator**: xterm.js & WASI

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Cherryland120/portfolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

   *Note: Our `vite.config.ts` automatically injects `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers to ensure `SharedArrayBuffer` is enabled during local development for the CLIverse to function.*

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License

This project is open-source and available under the MIT License.
