
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  LayoutDashboard,
  Video,
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Blog Posts', icon: <FileText size={20} />, path: '/admin/blog' },
    { name: 'Videos', icon: <Video size={20} />, path: '/admin/videos' },
    { name: 'Appointments', icon: <Calendar size={20} />, path: '/admin/appointments' },
    { name: 'Messages', icon: <MessageSquare size={20} />, path: '/admin/messages' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <h1 className="font-serif font-bold text-lg">Neiman Care</h1>
          </Link>
        </div>

        <div className="p-4">
          <div className="border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            <Link to="/" className="flex items-center gap-3 p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              <Home size={20} />
              <span>View Website</span>
            </Link>
            
            <div className="border-t my-4"></div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="border-t my-4"></div>
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-800">Admin Dashboard</h2>
              <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
