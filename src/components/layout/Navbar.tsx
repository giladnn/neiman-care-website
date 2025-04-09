
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Handle keyboard navigation and accessibility for the mobile menu
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isOpen) {
      // Set focus to the first nav item when menu opens
      setTimeout(() => {
        firstNavItemRef.current?.focus();
      }, 100);
      
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const navLinks = [
    { name: translate('home', language), href: '/' },
    { name: translate('about', language), href: '/about' },
    { name: translate('services', language), href: '/services' },
    { name: translate('blog', language), href: '/blog' },
    { name: translate('contact', language), href: '/contact' },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      ref={navRef}
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          aria-label="Dr. Victoria Neiman - Home"
        >
          <div className="text-primary font-serif font-bold text-2xl">Dr. Victoria Neiman</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6" role="navigation" aria-label="Main menu">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-900 hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1"
                aria-current={window.location.pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button asChild>
              <Link 
                to="/appointment" 
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={translate('bookAppointment', language)}
              >
                {translate('bookAppointment', language)}
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSelector />
          <button
            ref={menuButtonRef}
            onClick={handleMenuToggle}
            className="text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div 
          className="md:hidden bg-white w-full shadow-lg"
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile menu"
        >
          <div className="container mx-auto py-4 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                ref={index === 0 ? firstNavItemRef : undefined}
                className="text-gray-900 hover:text-primary font-medium py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1"
                onClick={closeMenu}
                aria-current={window.location.pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild>
              <Link 
                to="/appointment"
                className="bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-md transition-colors w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={closeMenu}
                aria-label={translate('bookAppointment', language)}
              >
                {translate('bookAppointment', language)}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
