
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserData } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  userRoles: string[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const fetchUserRoles = async (userId: string) => {
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }

    return roles.map(r => r.role);
  };

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const userData: UserData = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || 'User',
          role: 'user'
        };
        
        const roles = await fetchUserRoles(session.user.id);
        setUserRoles(roles);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData: UserData = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || 'User',
            role: 'user'
          };
          
          const roles = await fetchUserRoles(session.user.id);
          setUserRoles(roles);
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userData));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          setUserRoles([]);
          localStorage.removeItem('user');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data: { user: authUser }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (authUser) {
        const userData: UserData = {
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.name || 'User',
          role: 'user'
        };

        const roles = await fetchUserRoles(authUser.id);
        setUserRoles(roles);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
      return false;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    setUserRoles([]);
    localStorage.removeItem('user');
  };

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      userRoles, 
      login, 
      logout,
      hasRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
