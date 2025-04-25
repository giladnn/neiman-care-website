
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRoleCheck = () => {
  const { hasRole } = useAuth();
  const navigate = useNavigate();

  const requireRole = (role: string, fallback?: () => void) => {
    const hasAccess = hasRole(role);
    if (!hasAccess && fallback) {
      fallback();
    }
    return hasAccess;
  };

  const requireAnyRole = (roles: string[], fallback?: () => void) => {
    const hasAccess = roles.some(role => hasRole(role));
    if (!hasAccess && fallback) {
      fallback();
    }
    return hasAccess;
  };

  const withRoleGuard = (role: string, redirectPath = '/admin/login') => {
    return hasRole(role) ? true : (
      (() => {
        toast.error(`Access denied. You need ${role} permissions.`);
        navigate(redirectPath);
        return false;
      })()
    );
  };

  const withAnyRoleGuard = (roles: string[], redirectPath = '/admin/login') => {
    return roles.some(role => hasRole(role)) ? true : (
      (() => {
        toast.error(`Access denied. You need one of these roles: ${roles.join(', ')}.`);
        navigate(redirectPath);
        return false;
      })()
    );
  };

  return {
    hasRole,
    requireRole,
    requireAnyRole,
    withRoleGuard,
    withAnyRoleGuard
  };
};
