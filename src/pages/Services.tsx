
import React from 'react';
import Layout from '@/components/layout/Layout';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesMain from '@/components/services/ServicesMain';
import TreatmentProcess from '@/components/services/TreatmentProcess';
import ServicesCTA from '@/components/services/ServicesCTA';
import ServicesFAQ from '@/components/services/ServicesFAQ';

const Services = () => {
  return (
    <Layout>
      <ServicesHero />
      <ServicesMain />
      <TreatmentProcess />
      <ServicesCTA />
      <ServicesFAQ />
    </Layout>
  );
};

export default Services;
