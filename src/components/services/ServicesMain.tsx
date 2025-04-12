
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { Link } from 'react-router-dom';

const ServicesMain = () => {
  const { language, direction } = useLanguage();
  
  // Services list with translation keys
  const services = [
    {
      id: '1',
      titleKey: 'cancerDiagnosis',
      descriptionKey: 'cancerDiagnosisDesc',
      icon: '🔬',
    },
    {
      id: '2',
      titleKey: 'personalizedTreatment',
      descriptionKey: 'personalizedTreatmentDesc',
      icon: '📋',
    },
    {
      id: '3',
      titleKey: 'chemotherapy',
      descriptionKey: 'chemotherapyDesc',
      icon: '💊',
    },
    {
      id: '4',
      titleKey: 'immunotherapy',
      descriptionKey: 'immunotherapyDesc',
      icon: '🛡️',
    },
    {
      id: '5',
      titleKey: 'targetedTherapy',
      descriptionKey: 'targetedTherapyDesc',
      icon: '🎯',
    },
    {
      id: '6',
      titleKey: 'survivorshipCare',
      descriptionKey: 'survivorshipCareDesc',
      icon: '🌱',
    },
    {
      id: '7',
      titleKey: 'secondOpinion',
      descriptionKey: 'secondOpinion',
      icon: '🔍',
    },
    {
      id: '8',
      titleKey: 'testResultsReview',
      descriptionKey: 'testResultsReview',
      icon: '🧪',
    },
    {
      id: '9',
      titleKey: 'other',
      descriptionKey: 'other',
      icon: '🤲',
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${direction === 'rtl' ? 'rtl' : ''}`}>
          {services.map((service) => (
            <Card key={service.id} id={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {translate(service.titleKey as any, language)}
                  </h3>
                  <p className="text-gray-600 flex-grow mb-4">
                    {translate(service.descriptionKey as any, language)}
                  </p>
                <Link to="/contact"  className="w-full text-primary border-primary hover:text-gray-60"> {translate('learnMore', language)}</Link>
                  
                  {/* <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-white">
                    {translate('learnMore', language)}
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesMain;
