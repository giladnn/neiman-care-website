
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';
import { Button } from '@/components/ui/button';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Cohen',
    position: 'Breast Cancer Survivor',
    content: 'Dr. Victoria Neiman is truly exceptional. Her expertise and compassionate approach made all the difference during my cancer journey. She took the time to explain every aspect of my treatment and was always available to address my concerns.',
    rating: 5
  },
  {
    id: '2',
    name: 'David Levy',
    position: 'Lymphoma Patient',
    content: 'When I was diagnosed with lymphoma, I was terrified. Dr. Neiman not only provided world-class medical care but also gave me hope and confidence. Her knowledge of the latest treatments and dedication to her patients is remarkable.',
    rating: 5
  },
  {
    id: '3',
    name: 'Rachel Goldstein',
    position: 'Family Member of Patient',
    content: 'My father was under Dr. Neiman\'s care during his battle with lung cancer. Her expertise, patience, and genuine concern for his well-being were evident in every interaction. She guided our family through a difficult time with tremendous skill and empathy.',
    rating: 5
  },
  {
    id: '4',
    name: 'Michael Berkovich',
    position: 'Colon Cancer Survivor',
    content: 'Dr. Neiman\'s approach combines cutting-edge medical knowledge with personalized care. She developed a treatment plan specifically for my condition that considered all aspects of my health and lifestyle. I couldn\'t have asked for better care.',
    rating: 5
  }
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            Patient Testimonials
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Read what our patients have to say about their experience with Dr. Victoria Neiman.
          </p>
        </div>

        <div className="relative mb-8">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="min-w-[350px] md:min-w-[400px] flex-shrink-0 border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} fill="#D4AF37" color="#D4AF37" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.imageUrl ? (
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
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
            ))}
          </div>

          {/* Navigation buttons */}
          <Button 
            onClick={() => scroll('left')} 
            variant="outline" 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 hidden md:flex"
            size="icon"
          >
            <span className="sr-only">Scroll left</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Button>
          <Button 
            onClick={() => scroll('right')} 
            variant="outline" 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 hidden md:flex"
            size="icon"
          >
            <span className="sr-only">Scroll right</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
