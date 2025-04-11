
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import MessagesList from '@/components/admin/messages/MessagesList';
import FAQList from '@/components/admin/faq/FAQList';
import ContactInfoEditor from '@/components/admin/content/ContactInfoEditor';
import BiographyEditor from '@/components/admin/content/BiographyEditor';
import FooterEditor from '@/components/admin/content/FooterEditor';

const ContentManagement = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 space-y-6">
        <h1 className="text-3xl font-bold">{translate('contentManagement', language)}</h1>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="messages" className="py-2">
              {translate('messages', language)}
            </TabsTrigger>
            <TabsTrigger value="faqs" className="py-2">
              {translate('frequentlyAskedQuestions', language)}
            </TabsTrigger>
            <TabsTrigger value="contactInfo" className="py-2">
              {translate('contactInfo', language)}
            </TabsTrigger>
            <TabsTrigger value="biography" className="py-2">
              {translate('biographyManagement', language)}
            </TabsTrigger>
            <TabsTrigger value="footer" className="py-2">
              {translate('footerManagement', language)}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="p-0">
            <MessagesList />
          </TabsContent>
          
          <TabsContent value="faqs" className="p-0">
            <FAQList />
          </TabsContent>
          
          <TabsContent value="contactInfo" className="p-0">
            <ContactInfoEditor />
          </TabsContent>
          
          <TabsContent value="biography" className="p-0">
            <BiographyEditor />
          </TabsContent>
          
          <TabsContent value="footer" className="p-0">
            <FooterEditor />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
