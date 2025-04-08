
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Dr. Victoria Neiman" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-primary font-serif text-lg">15+ Years Experience</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              Dr. Victoria Neiman
            </h2>
            <div className="w-20 h-1 bg-secondary"></div>
            <h3 className="text-xl text-primary font-medium">
              Leading Oncologist Specializing in Personalized Cancer Care
            </h3>
            <div className="text-gray-600 space-y-4">
              <p>
                Dr. Victoria Neiman is a distinguished oncologist with over 15 years of experience in diagnosing and treating various types of cancer. Her expertise spans medical oncology with a special focus on breast cancer, lung cancer, and gastrointestinal tumors.
              </p>
              <p>
                After completing her medical training at the Hadassah Medical Center in Jerusalem, Dr. Neiman pursued specialized oncology training in leading institutions across Europe and the United States. She holds multiple board certifications and is actively involved in clinical research to advance cancer treatment protocols.
              </p>
              <p>
                Dr. Neiman's approach combines cutting-edge medical expertise with compassionate care, ensuring that each patient receives personalized treatment tailored to their specific needs and condition.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                <Link to="/about">Read Full Biography</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
