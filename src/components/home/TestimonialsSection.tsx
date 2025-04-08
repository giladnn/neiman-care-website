
import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Cohen',
    position: 'Breast Cancer Survivor',
    content: 'Dr. Victoria Neiman is truly exceptional. Her expertise and compassionate approach made all the difference during my cancer journey. She took the time to explain every aspect of my treatment and was always available to address my concerns.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'David Levy',
    position: 'Lymphoma Patient',
    content: 'When I was diagnosed with lymphoma, I was terrified. Dr. Neiman not only provided world-class medical care but also gave me hope and confidence. Her knowledge of the latest treatments and dedication to her patients is remarkable.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '3',
    name: 'Rachel Goldstein',
    position: 'Family Member of Patient',
    content: 'My father was under Dr. Neiman\'s care during his battle with lung cancer. Her expertise, patience, and genuine concern for his well-being were evident in every interaction. She guided our family through a difficult time with tremendous skill and empathy.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '4',
    name: 'Michael Berkovich',
    position: 'Colon Cancer Survivor',
    content: 'Dr. Neiman\'s approach combines cutting-edge medical knowledge with personalized care. She developed a treatment plan specifically for my condition that considered all aspects of my health and lifestyle. I couldn\'t have asked for better care.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const TestimonialsSection = () => {
  const { language, direction } = useLanguage();
  
  return (
    <section className="section-padding bg-gray-50" aria-labelledby="testimonials-heading">
      <div className={`container mx-auto ${direction === 'rtl' ? 'rtl' : ''}`}>
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            {translate('patientTestimonials', language)}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6" aria-hidden="true"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {translate('testimonialsSubtitle', language)}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="p-1">
                  <Card className="border border-gray-200 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} fill="#D4AF37" color="#D4AF37" size={20} aria-hidden="true" />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.content}"</p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        {testimonial.imageUrl ? (
                          <img 
                            src={testimonial.imageUrl} 
                            alt={`${testimonial.name}`}
                            className="w-16 h-16 rounded-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold" aria-hidden="true">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                          {testimonial.position && (
                            <p className="text-gray-500 text-sm">{testimonial.position}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious 
              className={`relative inset-auto ${direction === 'rtl' ? 'order-2' : ''}`} 
              aria-label="View previous testimonial"
            />
            <CarouselNext 
              className={`relative inset-auto ${direction === 'rtl' ? 'order-1' : ''}`}
              aria-label="View next testimonial"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
