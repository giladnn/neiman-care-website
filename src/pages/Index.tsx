
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AppointmentSection from '@/components/home/AppointmentSection';
import BlogSection from '@/components/home/BlogSection';
import NewsSection from '@/components/home/NewsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <AppointmentSection />
      <BlogSection />
      <NewsSection />
    </Layout>
  );
};

export default Index;
