
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
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
  }
];

const ServicesSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-serif">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Dr. Neiman offers a comprehensive range of oncology services, from diagnosis to treatment and long-term care planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {services.map((service) => (
            <Card key={service.id} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to={`/services#${service.id}`} 
                  className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Learn more <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
