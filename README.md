# My Developer Portfolio

Welcome to my full-stack web portfolio! This repository houses a comprehensive, interactive personal website built with React, TypeScript, and Vite. 
It features a custom blog, project showcase, dynamic review system, admin dashboard, and an integrated WebAssembly terminal emulator (CLIverse).

## Key Features

- **Home Page**: Features a profile carousel, featured projects, recent blog posts, and a sentiment-analyzed review submission form (`TasGuard API`).
- **Custom Blog System**: A fully functional blog rendering Markdown posts dynamically fetched from an API.
- **Project Showcase**: Detailed views for individual projects, complete with tags, tech stacks, and GitHub integration.
- **Admin Dashboard**: A protected route (secured by `jsonwebtoken` and `bcryptjs`) for managing portfolio content and blog posts.
- **CLIverse**: A standout "easter egg" feature! A built-in terminal emulator (`xterm.js`) that runs native CLI programs (compiled from Rust to WASM) securely in the browser using Web Workers, `@bjorn3/browser_wasi_shim`, and `SharedArrayBuffer` for synchronous I/O.
- **Theme Toggle**: Built-in support for dark and light modes.

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with comprehensive design tokens and responsive media queries
- **Routing**: React Router DOM (v7)
- **Content Rendering**: `react-markdown`, `rehype-raw`, `remark-gfm`
- **Security & Auth**: `bcryptjs`, `jsonwebtoken`
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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the MIT License.
