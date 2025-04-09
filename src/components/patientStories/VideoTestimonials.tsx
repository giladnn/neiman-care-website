
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { PatientStory } from '@/types';
import { Play } from 'lucide-react';

// Mock data - would be replaced by actual data from API/database
const videoTestimonials: PatientStory[] = [
  {
    id: 'v1',
    name: 'Sarah Cohen',
    position: 'Breast Cancer Survivor',
    content: 'Dr. Victoria Neiman is truly exceptional. Her expertise and compassionate approach made all the difference during my cancer journey.',
    fullStory: "I was diagnosed with Stage 2 Breast Cancer in 2020...",
    diagnosis: 'Stage 2 Breast Cancer',
    treatmentJourney: 'Surgery, chemotherapy, radiation therapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true
  },
  {
    id: 'v2',
    name: 'David Levy',
    position: 'Lymphoma Survivor',
    content: 'When I was diagnosed with lymphoma, I was terrified. Dr. Neiman not only provided world-class medical care but also gave me hope.',
    fullStory: "My journey with Dr. Neiman began when I was diagnosed with Non-Hodgkin's Lymphoma in 2019...",
    diagnosis: "Non-Hodgkin's Lymphoma",
    treatmentJourney: 'Immunotherapy, targeted chemotherapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false
  },
  {
    id: 'v3',
    name: 'Rachel Goldstein',
    position: 'Family Member of Patient',
    content: 'My father was under Dr. Neiman\'s care during his battle with lung cancer. Her expertise and genuine concern were evident.',
    fullStory: "When my father was diagnosed with Stage 3 Lung Cancer at the age of 72...",
    diagnosis: 'Stage 3 Lung Cancer',
    treatmentJourney: 'Targeted therapy, immunotherapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=300&h=300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false
  }
];

const VideoTestimonials = () => {
  const { language, direction } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
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
          {videoTestimonials.map((video) => (
            <div 
              key={video.id}
              className="rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative group cursor-pointer" onClick={() => setActiveVideo(video.videoUrl)}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={video.imageUrl} 
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
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoTestimonials;
