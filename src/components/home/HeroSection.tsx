
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-light text-white min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Optional: Background image instead of gradient */}
      {/* <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/path-to-hero-image.jpg')" }}
      ></div> */}
      
      <div className="container mx-auto relative z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            Specialized Oncology Care with Dr. Victoria Neiman
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Leading oncologist dedicated to providing personalized cancer treatment through cutting-edge medical expertise and compassionate care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
              <Link to="/appointment">Book an Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
