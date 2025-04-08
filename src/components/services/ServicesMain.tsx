
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Service } from '@/types';

// Sample services
const services: Service[] = [
  {
    id: '1',
    title: 'Cancer Diagnosis',
    description: 'Comprehensive diagnostic services including advanced imaging, biopsies, and genetic testing to determine the precise nature and stage of your cancer.',
    icon: '🔬',
  },
  {
    id: '2',
    title: 'Personalized Treatment Plans',
    description: 'Individualized treatment strategies created specifically for your condition, considering your cancer type, stage, genetic profile, and personal health factors.',
    icon: '📋',
  },
  {
    id: '3',
    title: 'Chemotherapy',
    description: 'Administration and management of chemotherapy protocols with close monitoring and supportive care to minimize side effects and maximize efficacy.',
    icon: '💊',
  },
  {
    id: '4',
    title: 'Immunotherapy',
    description: 'Cutting-edge immunotherapy treatments that harness your immune system to fight cancer, with specialized expertise in the latest protocols.',
    icon: '🛡️',
  },
  {
    id: '5',
    title: 'Targeted Therapy',
    description: 'Precision medicine approaches that target specific genetic mutations or proteins involved in your cancer\'s growth and spread.',
    icon: '🎯',
  },
  {
    id: '6',
    title: 'Survivorship Care',
    description: 'Long-term follow-up care and wellness planning for cancer survivors, addressing both physical and psychological aspects of post-cancer life.',
    icon: '🌱',
  },
  {
    id: '7',
    title: 'Second Opinions',
    description: 'Expert review of your diagnosis and treatment plan to confirm the approach or suggest alternative options based on the latest medical research.',
    icon: '🔍',
  },
  {
    id: '8',
    title: 'Clinical Trials',
    description: 'Access to cutting-edge experimental treatments through participation in carefully selected clinical trials for eligible patients.',
    icon: '🧪',
  },
  {
    id: '9',
    title: 'Supportive Care',
    description: 'Comprehensive management of cancer symptoms and treatment side effects to improve quality of life throughout your cancer journey.',
    icon: '🤲',
  }
];

const ServicesMain = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} id={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 flex-grow mb-4">{service.description}</p>
                  <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
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
