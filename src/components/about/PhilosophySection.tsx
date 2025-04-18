
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const PhilosophySection = () => {
  const { language, direction } = useLanguage();

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 font-serif">My Philosophy of Care</h2>
          <blockquote className="text-xl italic mb-8">
            "Cancer treatment is not just about medical interventions—it's about treating the whole person. Each patient deserves compassion, clear communication, and a treatment plan that respects their individual needs and values."
          </blockquote>
          <p className="mb-8">
            Dr. Neiman's approach to cancer care is guided by several core principles: personalization, compassion, education, and collaboration. She believes in treating each patient as an individual, considering not just their medical condition but their personal preferences, quality of life goals, and support systems.
          </p>
          <Button asChild className="bg-secondary hover:bg-secondary-dark text-white">

            <Link to="/appointment">{translate('scheduleAppointment', language)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
