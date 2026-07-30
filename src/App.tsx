
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { Certifications } from './pages/Certifications';
import { ATS } from './pages/projects/ATS';
import { TDMPR } from './pages/projects/TDMPR';
import { SBRL } from './pages/projects/SBRL';
import { AnimatorTriggerSystemLessons } from './pages/blog/AnimatorTriggerSystemLessons';
import { NotFound } from './pages/NotFound';

// Import individual project and blog pages if available
// For now we will setup route placeholders, or you can add them below.

function App() {
  return (
    <ThemeProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="certifications" element={<Certifications />} />
                    <Route path="projects/ats" element={<ATS />} />
                    <Route path="projects/tdmpr" element={<TDMPR />} />
                    <Route path="projects/sbrl" element={<SBRL />} />
                    <Route path="blog/animator-trigger-system-lessons" element={<AnimatorTriggerSystemLessons />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
