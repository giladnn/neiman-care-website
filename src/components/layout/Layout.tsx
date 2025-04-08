
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '@/context/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { direction } = useLanguage();
  
  return (
    <div 
      className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`} 
      dir={direction}
      lang={direction === 'rtl' ? 'he' : 'en'}
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:p-4 focus:bg-primary focus:text-white focus:z-50"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
