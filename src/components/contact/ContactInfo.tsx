
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ContactInfo as ContactInfoType } from '@/types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
};

const ContactInfo = () => {
  const { language, direction } = useLanguage();
  
  const { data: contactInfo = [] } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('order_num');
      if (error) throw error;
      return data as ContactInfoType[];
    },
  });

  const renderIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="text-primary" size={24} /> : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h3 className={`text-xl font-bold mb-4 font-serif ${direction === 'rtl' ? 'text-right' : ''}`}>
        {translate('contactInformation', language)}
      </h3>
      <div className="space-y-4">
        {contactInfo.map((info) => (
          <div key={info.id} className="flex items-start gap-3">
            <div className="bg-primary/10 p-3 rounded-full mt-1">
              {renderIcon(info.icon || info.type)}
            </div>
            <div className={direction === 'rtl' ? 'text-right' : ''}>
              <h4 className="font-semibold">{translate(info.type, language)}</h4>
              <p className="text-gray-600 whitespace-pre-line">{info.value[language]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
