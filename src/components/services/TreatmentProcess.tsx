
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface TreatmentStep {
  step: string;
  title: string;
  description: string;
}

const TreatmentProcess = () => {
  const { language } = useLanguage();

  // Using translation keys instead of hardcoded text
  const treatmentSteps: TreatmentStep[] = [
    {
      step: "1",
      title: translate("initialConsultationStep", language),
      description: translate("initialConsultationDesc", language)
    },
    {
      step: "2",
      title: translate("comprehensiveDiagnosisStep", language),
      description: translate("comprehensiveDiagnosisDesc", language)
    },
    {
      step: "3",
      title: translate("personalizedTreatmentPlanningStep", language),
      description: translate("personalizedTreatmentPlanningDesc", language)
    },
    {
      step: "4",
      title: translate("treatmentImplementationStep", language),
      description: translate("treatmentImplementationDesc", language)
    },
    {
      step: "5",
      title: translate("followUpCareStep", language),
      description: translate("followUpCareDesc", language)
    },
    {
      step: "6",
      title: translate("survivorshipPlanningStep", language),
      description: translate("survivorshipPlanningDesc", language)
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            {translate("treatmentProcessTitle", language)}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {translate("treatmentProcessSubtitle", language)}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {treatmentSteps.map((item, index) => (
              <div key={index} className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 5 && (
                  <div className="absolute left-6 top-16 h-12 border-l-2 border-dashed border-primary"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentProcess;
