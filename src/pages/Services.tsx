
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    description: 'Precision medicine approaches that target specific genetic mutations or proteins involved in your cancer's growth and spread.',
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

const Services = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dr. Victoria Neiman offers comprehensive oncology services with a focus on personalized treatment and compassionate care.
          </p>
        </div>
      </div>

      {/* Main Services */}
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

      {/* Treatment Process */}
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
              {[
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
              ].map((item, index) => (
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

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Ready to Take the Next Step?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Schedule a consultation with Dr. Victoria Neiman to discuss your condition and explore the best treatment options for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
              <Link to="/appointment">Book an Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Find answers to common questions about our oncology services
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                question: "What types of cancer does Dr. Neiman specialize in treating?",
                answer: "Dr. Neiman specializes in treating a wide range of cancers, with particular expertise in breast cancer, lung cancer, gastrointestinal cancers, and lymphomas."
              },
              {
                question: "How long does a typical treatment process take?",
                answer: "The duration of cancer treatment varies significantly depending on the type and stage of cancer, as well as the specific treatment approach. During your consultation, Dr. Neiman will provide a detailed timeline based on your individual case."
              },
              {
                question: "Does Dr. Neiman work with a multidisciplinary team?",
                answer: "Yes, Dr. Neiman collaborates with a comprehensive team of healthcare professionals including surgeons, radiation oncologists, pathologists, nurses, nutritionists, and mental health specialists to ensure holistic care."
              },
              {
                question: "What should I bring to my first appointment?",
                answer: "Please bring your medical records, including any previous test results, imaging studies, and pathology reports. Also bring a list of current medications, your insurance information, and a list of questions you may have."
              },
              {
                question: "Are telemedicine consultations available?",
                answer: "Yes, Dr. Neiman offers telemedicine appointments for appropriate situations, such as follow-up consultations and certain types of treatment discussions."
              }
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see your question here? Feel free to reach out to us directly.
            </p>
            <Button asChild className="bg-primary hover:bg-primary-dark text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
