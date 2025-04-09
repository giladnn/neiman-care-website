
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { VideosProvider } from "@/context/VideosContext";
import { BlogProvider } from "@/context/BlogContext";
import { Helmet } from "react-helmet";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import NotFound from "./pages/NotFound";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogManagement from "./pages/admin/BlogManagement";
import VideoManagement from "./pages/admin/VideoManagement";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <VideosProvider>
          <BlogProvider>
            <TooltipProvider>
              <Helmet>
                <html lang="en" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Dr. Victoria Neiman - Leading Oncologist in Israel. Book an appointment today for personalized cancer care and treatment." />
                <meta name="theme-color" content="#1a1a1a" />
              </Helmet>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/appointment" element={<Appointment />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/blog" element={<BlogManagement />} />
                  <Route path="/admin/videos" element={<VideoManagement />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </BlogProvider>
        </VideosProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
