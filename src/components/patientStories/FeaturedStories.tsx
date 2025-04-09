
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { PatientStory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import StoryDialog from './StoryDialog';

// Mock data - would be replaced by actual data from API/database
const featuredStories: PatientStory[] = [
  {
    id: '1',
    name: 'Sarah Cohen',
    position: 'Breast Cancer Survivor',
    content: 'Dr. Victoria Neiman is truly exceptional. Her expertise and compassionate approach made all the difference during my cancer journey.',
    fullStory: "I was diagnosed with Stage 2 Breast Cancer in 2020, and it felt like my world was collapsing. From our very first meeting, Dr. Neiman demonstrated not only exceptional medical expertise but also genuine compassion. She took the time to explain every aspect of my diagnosis and treatment options in a way that made me feel informed and empowered, rather than overwhelmed.\n\nMy treatment included surgery followed by chemotherapy and radiation. Throughout this challenging process, Dr. Neiman was always available to address my concerns and adjust my treatment as needed to manage side effects while ensuring effectiveness. Her comprehensive approach included connecting me with nutritionists, mental health specialists, and support groups that proved invaluable.\n\nTwo years later, I remain cancer-free. Dr. Neiman continues to provide attentive follow-up care. Her dedication to my overall well-being – not just treating the disease – has been remarkable. I truly believe that having Dr. Neiman as my oncologist made a significant difference in both my recovery and my ability to cope with the emotional aspects of cancer.",
    diagnosis: 'Stage 2 Breast Cancer',
    treatmentJourney: 'Surgery, chemotherapy, radiation therapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true
  },
  {
    id: '2',
    name: 'David Levy',
    position: 'Lymphoma Survivor',
    content: 'When I was diagnosed with lymphoma, I was terrified. Dr. Neiman not only provided world-class medical care but also gave me hope and confidence.',
    fullStory: "My journey with Dr. Neiman began when I was diagnosed with Non-Hodgkin's Lymphoma in 2019. As someone who had always been healthy, the diagnosis was shocking. From my first consultation, Dr. Neiman demonstrated an exceptional ability to explain complex medical information in an accessible way.\n\nShe developed a personalized treatment plan that included immunotherapy combined with targeted chemotherapy. What impressed me most was how Dr. Neiman anticipated and proactively managed potential side effects, which significantly improved my quality of life during treatment.\n\nBeyond her medical expertise, Dr. Neiman's genuine concern for my emotional wellbeing made a tremendous difference. She encouraged me to continue working when possible and maintain as much normalcy as I could, which helped preserve my sense of identity during treatment.\n\nI have now been in remission for three years. Dr. Neiman's approach to cancer care goes far beyond treating the disease – she treats the whole person. I credit her not only with my successful treatment but also with helping me maintain a positive outlook throughout my cancer journey.",
    diagnosis: "Non-Hodgkin's Lymphoma",
    treatmentJourney: 'Immunotherapy, targeted chemotherapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=300',
    featured: true
  }
];

const FeaturedStories = () => {
  const { language, direction } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold font-serif text-gray-800 mb-4 ${direction === 'rtl' ? 'text-right md:text-center' : ''}`}>
          {translate('featuredStories', language)}
        </h2>
        <p className={`text-gray-600 max-w-2xl mx-auto ${direction === 'rtl' ? 'text-right md:text-center' : ''}`}>
          {translate('featuredStoriesDescription', language)}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {featuredStories.map((story) => (
          <Card key={story.id} className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative">
                {story.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={story.imageUrl} 
                      alt={story.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start space-x-2 mb-4">
                  <Quote size={24} className="text-primary opacity-50 flex-shrink-0" />
                  <p className="italic text-gray-700">{story.content}</p>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">{story.name}</h3>
                    {story.position && (
                      <p className="text-sm text-gray-500">{story.position}</p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedStory(story)}
                    className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center space-x-1"
                  >
                    <span>{translate('readFullStory', language)}</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default FeaturedStories;
