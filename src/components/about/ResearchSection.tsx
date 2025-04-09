
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const ResearchSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            Research & Publications
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Dr. Neiman has published numerous research papers and contributed to important advances in cancer treatment protocols.
          </p>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{translate('selectedPublications', language)}</h3>
              <ul className="space-y-4 mt-4">
                {[
                  translate('publication1', language),
                  translate('publication2', language),
                  translate('publication3', language),
                  translate('publication4', language),
                  translate('publication5', language),
                ].map((publication, index) => (
                  <li key={index} className="border-l-4 border-primary pl-4 py-2 bg-primary/5">
                    {publication}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{translate('researchInterests', language)}</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    title: translate('personalizedCancer', language),
                    description: translate('personalizedCancerDesc', language)
                  },
                  {
                    title: translate('immunotherapyOptimization', language),
                    description: translate('immunotherapyOptimizationDesc', language)
                  },
                  {
                    title: translate('cancerInElderly', language),
                    description: translate('cancerInElderlyDesc', language)
                  },
                  {
                    title: translate('combinationTherapy', language),
                    description: translate('combinationTherapyDesc', language)
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-primary mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;

