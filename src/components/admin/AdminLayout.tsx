
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Film, 
  Users, 
  FileCheck, 
  Newspaper, 
  Calendar, 
  Settings,
  LogOut,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import LanguageSelector from '../layout/LanguageSelector';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Responsive sidebar management
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'dashboard', path: '/admin/dashboard' },
    { icon: <Calendar size={18} />, label: 'appointmentManagement', path: '/admin/appointments' },
    { icon: <FileText size={18} />, label: 'blogManagement', path: '/admin/blog' },
    { icon: <Film size={18} />, label: 'videoManagement', path: '/admin/videos' },
    { icon: <Users size={18} />, label: 'patientStoryManagement', path: '/admin/patient-stories' },
    { icon: <FileCheck size={18} />, label: 'serviceManagement', path: '/admin/services' },
    { icon: <Newspaper size={18} />, label: 'newsManagement', path: '/admin/news' },
    { icon: <MessageSquare size={18} />, label: 'contentManagement', path: '/admin/content' },
    { icon: <Settings size={18} />, label: 'settings', path: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full bg-background shadow-md"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:static z-40 w-64 h-full shadow-lg flex flex-col bg-background border-r transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">
            {translate('adminDashboard', language)}
          </h2>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-1">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`w-full justify-start mb-1 ${
                isActive(item.path) ? "" : "hover:bg-muted"
              }`}
              asChild
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              <Link to={item.path}>
                <span className="mr-2">{item.icon}</span>
                {translate(item.label, language)}
              </Link>
            </Button>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="hover:bg-muted"
            >
              <LogOut size={18} />
              <span className="sr-only">{translate('logout', language)}</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
