
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A hook that tracks page views in Google Analytics 
 * when the route changes in React Router
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          title: document.title
        }
      });
    }
  }, [location]);
};
