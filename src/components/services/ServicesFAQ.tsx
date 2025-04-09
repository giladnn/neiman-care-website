
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ServicesFAQ = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            {translate('frequentlyAskedQuestions', language)}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {translate('faqSubtitle', language)}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">
                {translate('faqCancerTypes', language)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {translate('faqCancerTypesAnswer', language)}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">
                {translate('faqTreatmentTime', language)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {translate('faqTreatmentTimeAnswer', language)}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">
                {translate('faqTeam', language)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {translate('faqTeamAnswer', language)}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">
                {translate('faqFirstAppointment', language)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {translate('faqFirstAppointmentAnswer', language)}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-medium">
                {translate('faqTelemedicine', language)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {translate('faqTelemedicineAnswer', language)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {translate('dontSeeQuestion', language)}
          </p>
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link to="/contact">{translate('contactUs', language)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesFAQ;
