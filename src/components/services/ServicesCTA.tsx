
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesCTA = () => {
  return (
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
  );
};

export default ServicesCTA;
