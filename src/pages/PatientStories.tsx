
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import PatientStoriesHero from '@/components/patientStories/PatientStoriesHero';
import FeaturedStories from '@/components/patientStories/FeaturedStories';
import StoryList from '@/components/patientStories/StoryList';
import VideoTestimonials from '@/components/patientStories/VideoTestimonials';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const PatientStories = () => {
  const { language, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <Layout>
      <PatientStoriesHero />
      
      <div className="container mx-auto py-16">
        <FeaturedStories />
        
        <div className="mt-16">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100 flex-wrap gap-2">
                <TabsTrigger value="all">{translate('allStories', language)}</TabsTrigger>
                <TabsTrigger value="breast">{translate('breastCancer', language)}</TabsTrigger>
                <TabsTrigger value="lung">{translate('lungCancer', language)}</TabsTrigger>
                <TabsTrigger value="gastro">{translate('gastrointestinal', language)}</TabsTrigger>
                <TabsTrigger value="lymphoma">{translate('lymphoma', language)}</TabsTrigger>
                <TabsTrigger value="melanoma">{translate('melanoma', language)}</TabsTrigger>
                <TabsTrigger value="prostate">{translate('prostate', language)}</TabsTrigger>
                <TabsTrigger value="videos">{translate('videoTestimonials', language)}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <StoryList filter="all" />
            </TabsContent>
            <TabsContent value="breast">
              <StoryList filter="breast" />
            </TabsContent>
            <TabsContent value="lung">
              <StoryList filter="lung" />
            </TabsContent>
            <TabsContent value="gastro">
              <StoryList filter="gastro" />
            </TabsContent>
            <TabsContent value="lymphoma">
              <StoryList filter="lymphoma" />
            </TabsContent>
            <TabsContent value="melanoma">
              <StoryList filter="melanoma" />
            </TabsContent>
            <TabsContent value="prostate">
              <StoryList filter="prostate" />
            </TabsContent>
            <TabsContent value="videos">
              <VideoTestimonials />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PatientStories;
