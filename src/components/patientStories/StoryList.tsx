
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { PatientStory } from '@/types';
import { Star, Quote } from 'lucide-react';
import StoryDialog from './StoryDialog';
import { fetchPatientStories } from '@/lib/supabase';

interface StoryListProps {
  filter: string;
}

const StoryList = ({ filter }: StoryListProps) => {
  const { language, direction } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  const [patientStories, setPatientStories] = useState<PatientStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadPatientStories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPatientStories();
        setPatientStories(data);
      } catch (error) {
        console.error('Error loading patient stories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPatientStories();
  }, []);
  
  const filteredStories = filter === 'all' 
    ? patientStories.filter(story => !story.featured)
    : patientStories.filter(story => story.category === filter && !story.featured);
  
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="w-10 h-10 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-600">Loading patient stories...</p>
      </div>
    );
  }
  
  if (filteredStories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{translate('noStoriesFound', language)}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <div 
            key={story.id} 
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {story.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex mb-3">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              
              <div className="flex items-start space-x-2 mb-4">
                <Quote size={20} className="text-primary/60 flex-shrink-0 mt-1" />
                <p className="italic text-gray-600 line-clamp-3">{story.content}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-gray-800">{story.name}</h3>
                {story.position && (
                  <p className="text-sm text-gray-500">{story.position}</p>
                )}
              </div>
              
              <button 
                onClick={() => setSelectedStory(story)}
                className="mt-4 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {translate('readFullStory', language)}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedStory && (
        <StoryDialog 
          story={selectedStory} 
          open={!!selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
    </div>
  );
};

export default StoryList;
