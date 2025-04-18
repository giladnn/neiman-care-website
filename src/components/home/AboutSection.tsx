
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const AboutSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/2c3dcd37-f373-409b-a38e-5b98d460c366.png"
                alt="Dr. Victoria Neiman"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-primary font-serif text-lg">{translate('yearsExperience', language)}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              {translate('aboutSectionTitle', language)}
            </h2>
            <div className="w-20 h-1 bg-secondary"></div>
            <h3 className="text-xl text-primary font-medium">
              {translate('aboutSectionSubtitle', language)}
            </h3>
            <div className="text-gray-600 space-y-4">
              <p>
                {translate('aboutSectionText1', language)}
              </p>
              <p>
                {translate('aboutSectionText2', language)}
              </p>
              <p>
                {translate('aboutSectionText3', language)}
              </p>
            </div>
            <div className="pt-4">
              <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                <Link to="/about">{translate('readFullBio', language)}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
