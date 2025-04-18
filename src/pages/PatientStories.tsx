
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PatientStoriesHero from '@/components/patientStories/PatientStoriesHero';
import FeaturedStories from '@/components/patientStories/FeaturedStories';
import PatientStoriesTabs from '@/components/patientStories/PatientStoriesTabs';

const PatientStories = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <Layout>
      <PatientStoriesHero />
      
      <div className="container mx-auto py-16">
        <FeaturedStories />
        
        <div className="mt-16">
          <PatientStoriesTabs onTabChange={setActiveTab} />
        </div>
      </div>
    </Layout>
  );
};

export default PatientStories;
