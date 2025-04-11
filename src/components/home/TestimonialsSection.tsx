
import { useRef, useState, useEffect } from 'react';
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
import { fetchTestimonials } from '@/lib/supabase';

const TestimonialsSection = () => {
  const { language, direction } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTestimonials();
  }, []);
  
  if (isLoading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }
  
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
