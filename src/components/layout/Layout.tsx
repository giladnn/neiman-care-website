
import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTracking } from '@/hooks/usePageTracking';
import SkipToContent from '@/components/accessibility/SkipToContent';
import AccessibilityWidget from '@/components/accessibility/AccessibilityWidget';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
  requireRoles?: string[];
}

const Layout = ({ children, requireRoles }: LayoutProps) => {
  const { language, direction } = useLanguage();
  const { isAuthenticated, hasRole } = useAuth();
  usePageTracking(); // Track page views
  
  // Update document lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    // Set page title based on current route for screen readers
    const path = window.location.pathname;
    const pageName = path === '/' 
      ? 'Home' 
      : path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1);
    document.title = `${pageName} - Dr. Victoria Neiman`;
  }, [language, direction]);
  
  // Check role access if requireRoles is provided
  if (requireRoles && requireRoles.length > 0) {
    const hasAccess = requireRoles.some(role => hasRole(role));
    if (!hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Please contact an administrator.
            </p>
            <a href="/" className="text-primary hover:underline">
              Return to Home
            </a>
          </div>
        </div>
      );
    }
  }

  return (
    <div 
      className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`} 
      dir={direction}
      lang={language}
    >
      <SkipToContent />
      <Navbar />
      <main 
        id="main-content" 
        className="flex-grow" 
        tabIndex={-1}
        role="main" 
        aria-label="Main content"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
