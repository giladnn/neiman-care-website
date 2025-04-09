
import { Video, VideoSource } from '@/components/videos/VideoCarousel';

export interface VideoFormData {
  id: string;
  title: string;
  source: VideoSource;
  url: string;
}

export const processVideoUrl = (url: string, source: VideoSource): string => {
  let processedUrl = url;
  
  if (source === 'youtube' && !processedUrl.includes('embed')) {
    // Convert YouTube watch URL to embed URL
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = processedUrl.match(youtubeRegex);
    if (match && match[1]) {
      processedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return processedUrl;
};

export const validateVideoForm = (formData: VideoFormData): boolean => {
  return Boolean(formData.title && formData.url);
};

export const defaultFormData = {
  id: '',
  title: '',
  source: 'youtube' as VideoSource,
  url: '',
};
