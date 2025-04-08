
import React from 'react';

interface TreatmentStep {
  step: string;
  title: string;
  description: string;
}

const treatmentSteps: TreatmentStep[] = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "A thorough review of your medical history, symptoms, and concerns to establish a baseline understanding of your condition."
  },
  {
    step: "2",
    title: "Comprehensive Diagnosis",
    description: "State-of-the-art diagnostic procedures including imaging, laboratory tests, and biopsies to accurately identify the type and stage of cancer."
  },
  {
    step: "3",
    title: "Personalized Treatment Planning",
    description: "Development of a tailored treatment strategy that considers your specific cancer profile, overall health, and personal preferences."
  },
  {
    step: "4",
    title: "Treatment Implementation",
    description: "Careful administration of the selected treatments with regular monitoring and adjustments as needed."
  },
  {
    step: "5",
    title: "Follow-up Care",
    description: "Ongoing assessments to track your progress, manage side effects, and make any necessary modifications to your treatment plan."
  },
  {
    step: "6",
    title: "Survivorship Planning",
    description: "Long-term care planning focused on preventing recurrence, monitoring for late effects of treatment, and supporting your return to wellness."
  }
];

const TreatmentProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            Our Treatment Process
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Dr. Neiman follows a structured approach to ensure comprehensive care for each patient
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
