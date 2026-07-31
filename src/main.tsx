import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Inject devicons CDN stylesheet (avoids Vite import analysis issues with external CDN in index.html)
const deviconsLink = document.createElement('link');
deviconsLink.rel = 'stylesheet';
deviconsLink.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
document.head.appendChild(deviconsLink);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
