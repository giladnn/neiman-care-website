
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { PatientStory } from '@/types';
import { Star, Quote, Calendar } from 'lucide-react';
import StoryDialog from './StoryDialog';
import { fetchPatientStories } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StoryListProps {
  filter: string;
}

const StoryList = ({ filter }: StoryListProps) => {
  const { language, direction } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  const [patientStories, setPatientStories] = useState<PatientStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
  
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
  
  const visibleStories = filteredStories.slice(0, displayCount);
  
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
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
        {visibleStories.map((story) => (
          <Card 
            key={story.id} 
            className="group hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              {story.imageUrl && (
                <div className="h-48 overflow-hidden rounded-lg mb-6">
                  <img 
                    src={story.imageUrl} 
                    alt={story.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="flex mb-3">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              
              <div className="flex items-start space-x-2 mb-4">
                <Quote size={20} className="text-primary/60 flex-shrink-0 mt-1" />
                <p className="italic text-gray-600 line-clamp-3">{story.content}</p>
              </div>
              
              <div className="mt-6 space-y-2">
                <h3 className="font-bold text-gray-800">{story.name}</h3>
                {story.position && (
                  <p className="text-sm text-gray-500">{story.position}</p>
                )}
                {story.diagnosis && (
                  <p className="text-sm text-primary">{story.diagnosis}</p>
                )}
              </div>
              
              <button 
                onClick={() => setSelectedStory(story)}
                className="mt-4 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {translate('readFullStory', language)}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredStories.length > displayCount && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setDisplayCount(prev => prev + 6)}
            className="px-8"
          >
            {translate('loadMore', language)}
          </Button>
        </div>
      )}
      
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
