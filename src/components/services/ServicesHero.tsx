
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const ServicesHero = () => {
  const { language, direction } = useLanguage();
  
  return (
    <div className="pt-24 pb-16 bg-primary/10" role="region" aria-labelledby="services-title">
      <div className={`container mx-auto text-center ${direction === 'rtl' ? 'rtl' : ''}`}>
        <h1 id="services-title" className="text-4xl font-bold mb-4 font-serif text-gray-800">{translate('servicesHeroTitle', language)}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {translate('servicesHeroSubtitle', language)}
        </p>
      </div>
    </div>
  );
};

export default ServicesHero;
