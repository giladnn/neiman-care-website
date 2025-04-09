
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Video } from '@/components/videos/VideoCarousel';

interface VideosContextType {
  videos: Video[];
  setVideos: (videos: Video[]) => void;
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

export const VideosProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  // Load videos from localStorage if available
  useEffect(() => {
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      try {
        setVideos(JSON.parse(storedVideos));
      } catch (error) {
        console.error('Failed to parse stored videos:', error);
      }
    }
  }, []);

  // Save videos to localStorage whenever they change
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('videos', JSON.stringify(videos));
    }
  }, [videos]);

  return (
    <VideosContext.Provider value={{ videos, setVideos }}>
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
