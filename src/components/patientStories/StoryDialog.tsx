
import { Fragment } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PatientStory } from '@/types';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface StoryDialogProps {
  story: PatientStory;
  open: boolean;
  onClose: () => void;
}

const StoryDialog = ({ story, open, onClose }: StoryDialogProps) => {
  const { language } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
            {story.name}
            <span className="ml-2 text-sm font-normal text-gray-500">({story.position})</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          {/* Rating */}
          <div className="flex mb-4">
            {Array.from({ length: story.rating }).map((_, i) => (
              <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
            ))}
          </div>
          
          {/* Patient Image */}
          {story.imageUrl && (
            <div className="mb-6 flex justify-center">
              <img 
                src={story.imageUrl} 
                alt={story.name} 
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Diagnosis and Treatment Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {story.diagnosis && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">{translate('diagnosis', language)}</h4>
                <p className="text-gray-600">{story.diagnosis}</p>
              </div>
            )}
            
            {story.treatmentJourney && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">{translate('treatment', language)}</h4>
                <p className="text-gray-600">{story.treatmentJourney}</p>
              </div>
            )}
          </div>
          
          {/* Full Story */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">{translate('fullStory', language)}</h3>
            {story.fullStory.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Video if available */}
          {story.videoUrl && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">{translate('videoTestimonial', language)}</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe 
                  src={story.videoUrl} 
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${story.name} Testimonial`}
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
