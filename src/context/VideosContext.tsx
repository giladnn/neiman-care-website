
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Video } from '@/types';
import { 
  fetchVideos,
  createVideo,
  updateVideo,
  deleteVideo
} from '@/lib/supabase';

interface VideosContextType {
  videos: Video[];
  isLoading: boolean;
  error: Error | null;
  refreshVideos: () => Promise<void>;
  addVideo: (video: Video) => Promise<void>;
  updateVideoItem: (id: string, video: Partial<Video>) => Promise<void>;
  deleteVideoItem: (id: string) => Promise<void>;
  setVideos: (videos: Video[]) => void; // Add this line to include setVideos
}

const VideosContext = createContext<VideosContextType>({
  videos: [],
  isLoading: false,
  error: null,
  refreshVideos: async () => {},
  addVideo: async () => {},
  updateVideoItem: async () => {},
  deleteVideoItem: async () => {},
  setVideos: () => {}, // Add this line to include setVideos in the default value
});

export const useVideos = () => useContext(VideosContext);

export const VideosProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshVideos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const videosData = await fetchVideos();
      setVideos(videosData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error fetching videos'));
      toast.error('Failed to load videos');
      console.error('Error loading videos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addVideo = async (video: Video) => {
    try {
      await createVideo(video);
      toast.success('Video created successfully');
      await refreshVideos();
    } catch (err) {
      toast.error('Failed to create video');
      throw err;
    }
  };

  const updateVideoItem = async (id: string, video: Partial<Video>) => {
    try {
      await updateVideo(id, video);
      toast.success('Video updated successfully');
      await refreshVideos();
    } catch (err) {
      toast.error('Failed to update video');
      throw err;
    }
  };

  const deleteVideoItem = async (id: string) => {
    try {
      await deleteVideo(id);
      toast.success('Video deleted successfully');
      await refreshVideos();
    } catch (err) {
      toast.error('Failed to delete video');
      throw err;
    }
  };

  useEffect(() => {
    refreshVideos();
  }, []);

  return (
    <VideosContext.Provider
      value={{
        videos,
        isLoading,
        error,
        refreshVideos,
        addVideo,
        updateVideoItem,
        deleteVideoItem,
        setVideos, // Add this line to include setVideos in the context value
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
