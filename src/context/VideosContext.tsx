
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Video } from '@/types';
import { fetchVideos } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

interface VideosContextType {
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

export const VideosProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  // Use React Query to fetch videos from Supabase
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    meta: {
      onSuccess: (data: Video[]) => {
        if (data && data.length > 0) {
          setVideos(data);
        }
      },
      onError: (error) => {
        console.error('Error fetching videos:', error);
        // If there's an error, try to load from localStorage as fallback
        const storedVideos = localStorage.getItem('videos');
        if (storedVideos) {
          try {
            setVideos(JSON.parse(storedVideos));
          } catch (parseError) {
            console.error('Failed to parse stored videos:', parseError);
          }
        }
      }
    }
  });

  // Save videos to localStorage as backup whenever they change
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('videos', JSON.stringify(videos));
    }
  }, [videos]);

  return (
    <VideosContext.Provider value={{ 
      videos, 
      setVideos, 
      isLoading,
      error: error as Error | null,
      refetch
    }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = (): VideosContextType => {
  const context = useContext(VideosContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideosProvider');
  }
  return context;
};
