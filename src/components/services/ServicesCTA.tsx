
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const ServicesCTA = () => {
  const { language, direction } = useLanguage();
  
  return (
    <section className="py-16 bg-primary text-white">
      <div className={`container mx-auto text-center ${direction === 'rtl' ? 'rtl' : ''}`}>
        <h2 className="text-3xl font-bold mb-4 font-serif">{translate('readyForNextStep', language)}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          {translate('scheduleCTA', language)}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
            <Link to="/appointment">{translate('bookAppointment', language)}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Link to="/contact">{translate('contactUs', language)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
