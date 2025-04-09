
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BiographySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Dr. Victoria Neiman" 
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 font-serif">Professional Biography</h2>
            <div className="w-20 h-1 bg-secondary"></div>
            
            <div className="text-gray-600 space-y-4">
              <p>
                Dr. Victoria Neiman is a distinguished oncologist with over 15 years of experience in diagnosing and treating various types of cancer. Her expertise spans medical oncology with a special focus on breast cancer, lung cancer, and gastrointestinal tumors.
              </p>
              <p>
                After completing her medical training at the Hadassah Medical Center in Jerusalem, Dr. Neiman pursued specialized oncology training in leading institutions across Europe and the United States. She holds multiple board certifications and is actively involved in clinical research to advance cancer treatment protocols.
              </p>
              <p>
                Throughout her career, Dr. Neiman has been committed to a patient-centered approach to cancer care, ensuring that each treatment plan is tailored to the individual's specific condition, needs, and circumstances. Her philosophy integrates cutting-edge medical treatments with supportive care that addresses the physical, emotional, and psychological aspects of living with cancer.
              </p>
              <p>
                Dr. Neiman is known for her compassionate bedside manner and her ability to explain complex medical concepts in a way that patients and their families can understand. She believes strongly in patient education and empowerment, ensuring that her patients are fully informed about their conditions and treatment options.
              </p>
            </div>
            
            <div className="pt-4">
              <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                <Link to="/appointment">Schedule an Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;
