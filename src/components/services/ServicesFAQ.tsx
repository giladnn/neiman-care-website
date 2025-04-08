
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
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
];

const ServicesFAQ = () => {
  return (
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
          {faqItems.map((item, index) => (
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
  );
};

export default ServicesFAQ;
