
import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTracking } from '@/hooks/usePageTracking';
import SkipToContent from '@/components/accessibility/SkipToContent';
import AccessibilityWidget from '@/components/accessibility/AccessibilityWidget';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { language, direction } = useLanguage();
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
  
  return (
    <div 
      className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`} 
      dir={direction}
      lang={language}
    >
      <SkipToContent />
      <AccessibilityWidget />
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
