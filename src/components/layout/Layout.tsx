
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTracking } from '@/hooks/usePageTracking';
import SkipToContent from '@/components/accessibility/SkipToContent';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { direction } = useLanguage();
  usePageTracking(); // Track page views
  
  return (
    <div 
      className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`} 
      dir={direction}
      lang={direction === 'rtl' ? 'he' : 'en'}
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
