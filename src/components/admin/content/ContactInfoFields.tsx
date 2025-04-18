
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactInfo } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const contactTypes = [
  { value: 'address', label: 'Address' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'hours', label: 'Office Hours' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ru', name: 'Russian' },
];

interface ContactInfoFieldsProps {
  formData: {
    type: ContactInfo['type'];
    value: Record<string, string>;
    order_num: number;
  };
  onFieldChange: (field: string, value: any) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({
  formData,
  onFieldChange,
  activeTab,
  onTabChange,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{translate('typeLabel', language)}</Label>
        <Select
          value={formData.type}
          onValueChange={(value: ContactInfo['type']) =>
            onFieldChange('type', value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contactTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {translate(type.value, language)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{translate('orderLabel', language)}</Label>
        <Input
          type="number"
          value={formData.order_num}
          onChange={(e) =>
            onFieldChange('order_num', parseInt(e.target.value) || 0)
          }
        />
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-3">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code}>
              {lang.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code}>
            <div className="space-y-2">
              <Label>{translate('valueLabel', language)}</Label>
              {formData.type === 'hours' || formData.type === 'address' ? (
                <Textarea
                  value={formData.value[lang.code] || ''}
                  onChange={(e) =>
                    onFieldChange('value', {
                      ...formData.value,
                      [lang.code]: e.target.value,
                    })
                  }
                  rows={5}
                />
              ) : (
                <Input
                  value={formData.value[lang.code] || ''}
                  onChange={(e) =>
                    onFieldChange('value', {
                      ...formData.value,
                      [lang.code]: e.target.value,
                    })
                  }
                />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContactInfoFields;
