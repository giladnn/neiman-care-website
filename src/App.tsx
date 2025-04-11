
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { VideosProvider } from './context/VideosContext';
import { Toaster } from '@/components/ui/sonner';
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
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BlogProvider>
          <VideosProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/patient-stories" element={<PatientStories />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/blog" element={<BlogManagement />} />
              <Route path="/admin/videos" element={<VideoManagement />} />
              <Route path="/admin/patient-stories" element={<PatientStoryManagement />} />
              <Route path="/admin/services" element={<ServiceManagement />} />
              <Route path="/admin/news" element={<NewsManagement />} />
              <Route path="/admin/appointments" element={<AppointmentManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </VideosProvider>
        </BlogProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
