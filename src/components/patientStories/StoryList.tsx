
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { PatientStory } from '@/types';
import { Star, Quote } from 'lucide-react';
import StoryDialog from './StoryDialog';

// Mock data - would be replaced by actual data from API/database
const allStories: PatientStory[] = [
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
    featured: true,
    category: 'breast'
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
    featured: true,
    category: 'lymphoma'
  },
  {
    id: '3',
    name: 'Rachel Goldstein',
    position: 'Family Member of Patient',
    content: 'My father was under Dr. Neiman\'s care during his battle with lung cancer. Her expertise, patience, and genuine concern for his well-being were evident in every interaction.',
    fullStory: "When my father was diagnosed with Stage 3 Lung Cancer at the age of 72, our family was devastated. Finding Dr. Neiman was a blessing we couldn't have anticipated. From the initial consultation, she demonstrated exceptional professionalism paired with genuine warmth.\n\nWhat stood out most was Dr. Neiman's ability to communicate complex medical information in a way that both my father and our family could understand. She never rushed our appointments and patiently addressed all our questions and concerns. Her approach was realistic yet hopeful, which gave us the emotional stability we needed during such a challenging time.\n\nThe treatment plan she developed was carefully tailored to my father's age, overall health, and specific cancer profile. When my father experienced unexpected side effects, Dr. Neiman was immediately accessible and adjusted his treatment promptly. Her coordinated approach with other specialists ensured that all aspects of his care were aligned.\n\nThough my father eventually succumbed to his illness, the quality of life he maintained during treatment was far better than we had dared hope. Dr. Neiman's compassionate care extended to our family after his passing, helping us process our grief. We will be forever grateful for her exceptional medical expertise and profound humanity.",
    diagnosis: 'Stage 3 Lung Cancer',
    treatmentJourney: 'Targeted therapy, immunotherapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=300&h=300',
    featured: false,
    category: 'lung'
  },
  {
    id: '4',
    name: 'Michael Berkovich',
    position: 'Colon Cancer Survivor',
    content: 'Dr. Neiman\'s approach combines cutting-edge medical knowledge with personalized care. She developed a treatment plan specifically for my condition.',
    fullStory: "My experience with colorectal cancer began with a routine screening that detected Stage 2 Colon Cancer. The diagnosis was shocking, but I was fortunate to be referred to Dr. Victoria Neiman. From our first meeting, I knew I was in capable hands. Dr. Neiman explained my diagnosis thoroughly, using clear language and helpful visuals to ensure I understood what we were facing.\n\nWhat impressed me most about Dr. Neiman was how she tailored my treatment plan to my specific needs. After surgery to remove the tumor, she recommended a modified chemotherapy regimen that took into account my particular cancer profile, overall health, and lifestyle considerations. Throughout my six months of treatment, she monitored my progress closely, making adjustments to minimize side effects while maintaining effectiveness.\n\nBeyond her medical expertise, Dr. Neiman's holistic approach to cancer care was invaluable. She connected me with nutritional resources that helped me maintain my strength during treatment and recommended physical activities that were safe and beneficial. She also recognized when I was struggling emotionally and suggested support resources that proved tremendously helpful.\n\nThree years later, I remain cancer-free. Dr. Neiman continues to provide thorough follow-up care, always staying informed about the latest developments in colorectal cancer treatment. Her commitment to her patients extends far beyond clinical treatment – she truly cares about our overall wellbeing and quality of life.",
    diagnosis: 'Stage 2 Colon Cancer',
    treatmentJourney: 'Surgery, chemotherapy',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&q=80&w=300&h=300',
    featured: false,
    category: 'gastro'
  },
  {
    id: '5',
    name: 'Esther Blum',
    position: 'Breast Cancer Survivor',
    content: 'As a 42-year-old mother of three, my breast cancer diagnosis was devastating. Dr. Neiman's expertise and compassionate care guided me through treatment successfully.',
    fullStory: "When I discovered a lump in my breast during a self-examination, I tried to convince myself it was nothing serious. The diagnosis of Stage 2 Breast Cancer turned my world upside down. With three young children depending on me, I was overwhelmed with fear and uncertainty.\n\nFrom my first appointment with Dr. Neiman, I felt a sense of calm and confidence. She took the time to thoroughly explain my diagnosis and all treatment options, answering my countless questions with patience and clarity. What impressed me most was how Dr. Neiman considered my whole life – not just my medical condition – when developing my treatment plan. She understood my concerns about maintaining some normalcy for my children while undergoing treatment.\n\nMy treatment involved surgery followed by chemotherapy and radiation. Throughout this challenging time, Dr. Neiman was incredibly responsive, addressing side effects promptly and adjusting my treatment when necessary. She connected me with resources specifically designed for mothers with cancer, which provided invaluable support for both me and my family.\n\nTwo years later, I remain cancer-free. Dr. Neiman's exceptional medical expertise combined with her compassionate approach made an enormous difference in my cancer journey. I am profoundly grateful for her care and would recommend her without hesitation to anyone facing a cancer diagnosis.",
    diagnosis: 'Stage 2 Breast Cancer',
    treatmentJourney: 'Surgery, chemotherapy, radiation',
    rating: 5,
    featured: false,
    category: 'breast'
  },
  {
    id: '6',
    name: 'Aaron Shapiro',
    position: 'Gastric Cancer Survivor',
    content: 'Dr. Neiman's thoroughness in diagnosis and treatment planning saved my life. Her knowledge of the latest treatment options gave me access to therapies that weren't initially considered.',
    fullStory: "My cancer journey began with persistent digestive issues that several doctors dismissed as stress-related. When I finally met with Dr. Neiman, she ordered comprehensive testing that revealed Stage 2 Gastric Cancer. While the diagnosis was frightening, I immediately felt I was in capable hands. Dr. Neiman's thoroughness had caught my cancer before it had advanced further, giving me a better prognosis.\n\nWhat set Dr. Neiman apart was her extensive knowledge of cutting-edge treatments. After explaining traditional approaches, she discussed emerging therapies that might be appropriate for my specific type of cancer. She recommended a clinical trial combining targeted therapy with standard chemotherapy, which proved to be extremely effective for my particular case.\n\nDuring treatment, Dr. Neiman monitored my progress with exceptional attention to detail. When I developed unexpected side effects, she was immediately accessible and adjusted my protocol accordingly. Her commitment to my care gave me confidence during an incredibly challenging time.\n\nI've now been cancer-free for four years. Dr. Neiman continues to stay informed about advancements in gastric cancer treatment and ensures my follow-up care incorporates the latest knowledge. I believe her exceptional expertise and commitment to individualized treatment were crucial to my successful outcome. I am deeply grateful for her care.",
    diagnosis: 'Stage 2 Gastric Cancer',
    treatmentJourney: 'Surgery, combination chemotherapy and targeted therapy',
    rating: 5,
    featured: false,
    category: 'gastro'
  }
];

interface StoryListProps {
  filter: string;
}

const StoryList = ({ filter }: StoryListProps) => {
  const { language, direction } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  
  const filteredStories = filter === 'all' 
    ? allStories.filter(story => !story.featured)
    : allStories.filter(story => story.category === filter && !story.featured);
  
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
