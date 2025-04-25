
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { VideosProvider } from './context/VideosContext';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from './context/AuthContext';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import PatientStories from './pages/PatientStories';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BlogManagement from './pages/admin/BlogManagement';
import VideoManagement from './pages/admin/VideoManagement';
import PatientStoryManagement from './pages/admin/PatientStoryManagement';
import ServiceManagement from './pages/admin/ServiceManagement';
import NewsManagement from './pages/admin/NewsManagement';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import ContentManagement from './pages/admin/ContentManagement';
import NotFound from './pages/NotFound';

// Role-protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRoles = ['admin']
}: { 
  children: React.ReactNode;
  requiredRoles?: string[];
}) => {
  const { isAuthenticated, hasRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  const hasRequiredRole = requiredRoles.some(role => hasRole(role));
  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/patient-stories" element={<PatientStories />} />
      <Route path="/admin/login" element={<Login />} />
      
      {/* Protected admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/blog" element={
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/videos" element={
        <ProtectedRoute>
          <VideoManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/patient-stories" element={
        <ProtectedRoute>
          <PatientStoryManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/services" element={
        <ProtectedRoute>
          <ServiceManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/news" element={
        <ProtectedRoute>
          <NewsManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/appointments" element={
        <ProtectedRoute>
          <AppointmentManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/content" element={
        <ProtectedRoute>
          <ContentManagement />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BlogProvider>
          <VideosProvider>
            <AppRoutes />
            <Toaster />
          </VideosProvider>
        </BlogProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
