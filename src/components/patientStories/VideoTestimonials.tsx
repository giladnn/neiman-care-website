
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { PatientStory } from '@/types';
import { Play } from 'lucide-react';
import { fetchPatientStories } from '@/lib/supabase';

const VideoTestimonials = () => {
  const { language, direction } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videoTestimonials, setVideoTestimonials] = useState<PatientStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadVideoTestimonials = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPatientStories();
        // Filter stories with video URLs
        const videos = data.filter(story => story.videoUrl);
        setVideoTestimonials(videos);
      } catch (error) {
        console.error('Error loading video testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideoTestimonials();
  }, []);
  
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="w-10 h-10 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Loading video testimonials...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className={`text-2xl font-bold font-serif text-gray-800 mb-4 ${direction === 'rtl' ? 'text-right md:text-center' : ''}`}>
          {translate('videoTestimonials', language)}
        </h2>
        <p className={`text-gray-600 max-w-2xl mx-auto ${direction === 'rtl' ? 'text-right md:text-center' : ''}`}>
          {translate('videoTestimonialsDescription', language)}
        </p>
      </div>
      
      {activeVideo ? (
        <div className="mb-10">
          <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-4xl mx-auto rounded-xl shadow-lg">
            <iframe 
              src={activeVideo} 
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Patient Testimonial"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <button 
              onClick={() => setActiveVideo(null)}
              className="text-primary hover:text-primary/80 font-medium"
            >
              {translate('backToVideos', language)}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.length > 0 ? (
            videoTestimonials.map((video) => (
              <div 
                key={video.id}
                className="rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="relative group cursor-pointer" onClick={() => setActiveVideo(video.videoUrl || '')}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={video.imageUrl || 'https://via.placeholder.com/300'} 
                      alt={video.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="rounded-full bg-white/90 w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                        <Play size={30} className="text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{video.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{video.position}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{video.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">{translate('noVideosFound', language)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoTestimonials;
