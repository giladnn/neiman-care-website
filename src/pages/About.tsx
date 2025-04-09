
import React from 'react';
import Layout from '@/components/layout/Layout';
import AboutHero from '@/components/about/AboutHero';
import BiographySection from '@/components/about/BiographySection';
import CredentialsSection from '@/components/about/CredentialsSection';
import VideoSection from '@/components/about/VideoSection';
import ResearchSection from '@/components/about/ResearchSection';
import PhilosophySection from '@/components/about/PhilosophySection';

const About = () => {
  return (
    <Layout>
      <AboutHero />
      <BiographySection />
      <CredentialsSection />
      <VideoSection />
      <ResearchSection />
      <PhilosophySection />
    </Layout>
  );
};

export default About;
