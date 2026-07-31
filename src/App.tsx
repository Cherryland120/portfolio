
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Certifications } from './pages/Certifications';
import { ATS } from './pages/projects/ATS';
import { TDMPR } from './pages/projects/TDMPR';
import { SBRL } from './pages/projects/SBRL';
import { NotFound } from './pages/NotFound';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PostEditor } from './pages/admin/PostEditor';
import { ProjectEditor } from './pages/admin/ProjectEditor';
import { ProjectDetails } from './pages/ProjectDetails';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* Admin routes — outside of Layout, standalone */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/new" element={
                  <ProtectedRoute><PostEditor /></ProtectedRoute>
                } />
                <Route path="/admin/edit/:slug" element={
                  <ProtectedRoute><PostEditor /></ProtectedRoute>
                } />
                <Route path="/admin/projects/new" element={
                  <ProtectedRoute><ProjectEditor /></ProtectedRoute>
                } />
                <Route path="/admin/projects/edit/:slug" element={
                  <ProtectedRoute><ProjectEditor /></ProtectedRoute>
                } />

                {/* Public routes — inside Layout */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<BlogPost />} />
                    <Route path="certifications" element={<Certifications />} />
                    <Route path="projects/:slug" element={<ProjectDetails />} />
                    {/* Old routes kept temporarily to ensure nothing breaks during transition, will be removed soon */}
                    <Route path="projects/ats" element={<ATS />} />
                    <Route path="projects/tdmpr" element={<TDMPR />} />
                    <Route path="projects/sbrl" element={<SBRL />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
