
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const ServicesHero = () => {
  const { language } = useLanguage();
  
  return (
    <div className="pt-24 pb-16 bg-primary/10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">{translate('servicesHeroTitle', language)}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {translate('servicesHeroSubtitle', language)}
        </p>
      </div>
    </div>
  );
};

export default ServicesHero;
