
import { Link } from 'react-router-dom';
import { Calendar, Clock, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AppointmentSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              Schedule Your Appointment
            </h2>
            <div className="w-20 h-1 bg-secondary"></div>
            <p className="text-gray-600">
              Take the first step towards personalized cancer care by scheduling an appointment with Dr. Victoria Neiman. Our team is ready to assist you and provide the support you need during this journey.
            </p>
            
            <div className="grid gap-6 mt-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+972 3 123 4567</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Email Us</h3>
                    <p className="text-gray-600">contact@neiman-care.com</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Office Hours</h3>
                    <p className="text-gray-600">Mon-Thu: 9am-5pm, Fri: 9am-2pm</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4">
              <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                <Link to="/appointment">Book Online</Link>
              </Button>
              <span className="ml-4 text-gray-500">or call us directly</span>
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="w-full h-[500px] bg-gray-200 rounded-lg shadow-lg flex items-center justify-center"
            >
              {/* This will be replaced with an actual map component */}
              <div className="text-center p-8">
                <Calendar size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Clinic Location</h3>
                <p className="text-gray-600">
                  123 Medical Center Dr.<br />
                  Tel Aviv, 61000<br />
                  Israel
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-4 rounded-lg shadow-xl hidden md:block">
              <p className="font-serif text-lg">Easy Access Location</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
