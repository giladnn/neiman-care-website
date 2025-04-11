
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContactInfo, updateContactInfo } from '@/lib/supabase';
import { ContactInfo, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface ContactInfoFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contactInfo: ContactInfo | null;
}

const supportedLanguages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ru', name: 'Russian' },
];

const contactTypes = [
  { value: 'address', label: 'Address' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'hours', label: 'Office Hours' },
];

const ContactInfoFormDialog: React.FC<ContactInfoFormDialogProps> = ({
  isOpen,
  onOpenChange,
  contactInfo,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [formData, setFormData] = useState<{
    id?: string;
    type: 'address' | 'phone' | 'email' | 'hours';
    value: Record<Language, string>;
    icon?: string;
    order?: number;
  }>({
    type: 'address',
    value: { en: '', he: '', ru: '' },
    icon: '',
    order: 0,
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        id: contactInfo.id,
        type: contactInfo.type || 'address',
        value: contactInfo.value || { en: '', he: '', ru: '' },
        icon: contactInfo.icon || '',
        order: contactInfo.order || 0,
      });
    } else {
      setFormData({
        type: 'address',
        value: { en: '', he: '', ru: '' },
        icon: '',
        order: 0,
      });
    }
  }, [contactInfo]);

  const createMutation = useMutation({
    mutationFn: createContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      onOpenChange(false);
      toast.success(translate('contentCreated', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      onOpenChange(false);
      toast.success(translate('contentUpdated', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least English is filled out
    if (!formData.value.en) {
      toast.error(translate('pleaseFillInAllRequiredFields', language));
      return;
    }
    
    if (formData.id) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleValueChange = (
    lang: Language,
    value: string
  ) => {
    setFormData({
      ...formData,
      value: {
        ...formData.value,
        [lang]: value,
      },
    });
  };

  const handleTypeChange = (type: 'address' | 'phone' | 'email' | 'hours') => {
    setFormData({
      ...formData,
      type
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {contactInfo ? translate('editContent', language) : translate('addNew', language)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">{translate('type', language)}</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleTypeChange(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder={translate('selectType', language)} />
              </SelectTrigger>
              <SelectContent>
                {contactTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
            
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Language)}>
            <TabsList className="grid grid-cols-3">
              {supportedLanguages.map((lang) => (
                <TabsTrigger key={lang.code} value={lang.code}>
                  {lang.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {supportedLanguages.map((lang) => (
              <TabsContent key={lang.code} value={lang.code} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor={`value-${lang.code}`}>{translate('value', language)}</Label>
                  {formData.type === 'address' || formData.type === 'hours' ? (
                    <Textarea
                      id={`value-${lang.code}`}
                      value={formData.value[lang.code] || ''}
                      onChange={(e) => handleValueChange(lang.code, e.target.value)}
                      required={lang.code === 'en'} // Only English is required
                      rows={5}
                      dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                    />
                  ) : (
                    <Input
                      id={`value-${lang.code}`}
                      value={formData.value[lang.code] || ''}
                      onChange={(e) => handleValueChange(lang.code, e.target.value)}
                      required={lang.code === 'en'} // Only English is required
                      dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                    />
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {translate('cancel', language)}
            </Button>
            <Button 
              type="submit" 
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {translate('saving', language)}
                </span>
              ) : (
                translate('save', language)
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoFormDialog;
