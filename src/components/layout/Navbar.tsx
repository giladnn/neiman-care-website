
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, direction } = useLanguage();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
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
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold text-gray-800 flex items-center"
            onClick={closeMenu}
          >
            <span className="sr-only">Dr. Victoria Neiman - Home</span>
            Dr. Victoria Neiman
          </Link>
          
          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-1 ${direction === 'rtl' ? 'space-x-reverse' : ''}`}>
            <NavigationMenu dir={direction}>
              <NavigationMenuList className={direction === 'rtl' ? 'space-x-reverse' : ''}>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({ className: isActive('/') ? 'bg-primary/5 text-primary' : '' })}
                    >
                      {translate('home', language)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({ className: isActive('/about') ? 'bg-primary/5 text-primary' : '' })}
                    >
                      {translate('about', language)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/services">
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({ className: isActive('/services') ? 'bg-primary/5 text-primary' : '' })}
                    >
                      {translate('services', language)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/patient-stories">
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({ className: isActive('/patient-stories') ? 'bg-primary/5 text-primary' : '' })}
                    >
                      {translate('patientTestimonials', language)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {/* <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({ className: isActive('/blog') ? 'bg-primary/5 text-primary' : '' })}
                    >
                      {translate('blog', language)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> */}
                
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink 
                      className={navigationMenuTriggerStyle({ className: isActive('/contact') ? 'bg-primary/5 text-primary' : '' })}
                    >
                      {translate('contact', language)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <LanguageSelector />
            
            <Link to="/appointment">
              <Button 
                variant="default"
                size="sm"
                className="ml-2"
              >
                {translate('bookAppointment', language)}
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <LanguageSelector />
            
            <button 
              onClick={toggleMenu} 
              className="ml-2 p-2 text-gray-600 hover:text-primary focus:outline-none focus:text-primary"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col py-2 space-y-1">
            <Link 
              to="/" 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${
                isActive('/') ? 'bg-primary/5 text-primary' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('home', language)}
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${
                isActive('/about') ? 'bg-primary/5 text-primary' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('about', language)}
            </Link>
            <Link 
              to="/services" 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${
                isActive('/services') ? 'bg-primary/5 text-primary' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('services', language)}
            </Link>
            <Link 
              to="/patient-stories" 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${
                isActive('/patient-stories') ? 'bg-primary/5 text-primary' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('patientTestimonials', language)}
            </Link>
            {/* <Link 
              to="/blog" 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${
                isActive('/blog') ? 'bg-primary/5 text-primary' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('blog', language)}
            </Link> */}
            <Link 
              to="/contact" 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 rounded ${
                isActive('/contact') ? 'bg-primary/5 text-primary' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('contact', language)}
            </Link>
            <Link 
              to="/appointment" 
              className={`px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded ${
                isActive('/appointment') ? 'bg-primary/90' : ''
              }`}
              onClick={closeMenu}
            >
              {translate('bookAppointment', language)}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
