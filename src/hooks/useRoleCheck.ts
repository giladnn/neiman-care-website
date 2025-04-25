
import { useAuth } from '@/context/AuthContext';

export const useRoleCheck = () => {
  const { hasRole } = useAuth();

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

  return {
    hasRole,
    requireRole,
    requireAnyRole
  };
};
