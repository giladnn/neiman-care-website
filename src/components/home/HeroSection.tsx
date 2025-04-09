
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const HeroSection = () => {
  const { language, direction } = useLanguage();

  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-light text-white min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Optional: Background image instead of gradient */}
      {/* <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/path-to-hero-image.jpg')" }}
      ></div> */}
      
      <div className="container mx-auto relative z-10 py-20">
        <div className={`max-w-3xl ${direction === 'rtl' ? 'mr-0 ml-auto text-right' : ''}`}>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif ${direction === 'rtl' ? 'text-right' : ''}`}>
            {translate('heroTitle', language)}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 font-light ${direction === 'rtl' ? 'text-right' : ''}`}>
            {translate('heroSubtitle', language)}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${direction === 'rtl' ? 'justify-start sm:justify-end' : ''}`}>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
              <Link to="/appointment">{translate('bookAppointment', language)}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/about">{translate('learnMore', language)}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
