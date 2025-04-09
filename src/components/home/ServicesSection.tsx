
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const ServicesSection = () => {
  const { language, direction } = useLanguage();

  // Services with translation keys
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
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${direction === 'rtl' ? 'rtl' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            {translate('ourServices', language)}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            {translate('servicesSubtitle', language)}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 ${direction === 'rtl' ? 'rtl' : ''}`}>
          {services.map((service) => (
            <Card key={service.id} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {translate(service.titleKey as any, language)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {translate(service.descriptionKey as any, language)}
                </p>
                <Link 
                  to={`/services#${service.id}`} 
                  className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  {translate('learnMore', language)} <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link to="/services">{translate('viewAllServices', language)}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
