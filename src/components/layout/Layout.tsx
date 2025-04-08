
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
    <div className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
