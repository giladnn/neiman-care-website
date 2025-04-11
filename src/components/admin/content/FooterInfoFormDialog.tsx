
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
import { createFooterInfo, updateFooterInfo } from '@/lib/supabase';
import { FooterInfo, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface FooterInfoFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  footerInfo: FooterInfo | null;
}

const supportedLanguages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ru', name: 'Russian' },
];

const footerSections = [
  { value: 'quickLinks', label: 'Quick Links' },
  { value: 'contactInfo', label: 'Contact Information' },
  { value: 'officeHours', label: 'Office Hours' },
];

const FooterInfoFormDialog: React.FC<FooterInfoFormDialogProps> = ({
  isOpen,
  onOpenChange,
  footerInfo,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [formData, setFormData] = useState<{
    id?: string;
    section: 'quickLinks' | 'contactInfo' | 'officeHours';
    title: Record<Language, string>;
    content: Record<Language, string>;
    link?: string;
    icon?: string;
    order: number;
  }>({
    section: 'quickLinks',
    title: { en: '', he: '', ru: '' },
    content: { en: '', he: '', ru: '' },
    link: '',
    icon: '',
    order: 0,
  });

  useEffect(() => {
    if (footerInfo) {
      setFormData({
        id: footerInfo.id,
        section: footerInfo.section || 'quickLinks',
        title: footerInfo.title || { en: '', he: '', ru: '' },
        content: footerInfo.content || { en: '', he: '', ru: '' },
        link: footerInfo.link || '',
        icon: footerInfo.icon || '',
        order: footerInfo.order || 0,
      });
    } else {
      setFormData({
        section: 'quickLinks',
        title: { en: '', he: '', ru: '' },
        content: { en: '', he: '', ru: '' },
        link: '',
        icon: '',
        order: 0,
      });
    }
  }, [footerInfo]);

  const createMutation = useMutation({
    mutationFn: createFooterInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerInfo'] });
      onOpenChange(false);
      toast.success(translate('contentCreated', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: FooterInfo) => {
      // Fix: Ensure id is always present for update operations
      if (!data.id) {
        throw new Error('ID is required for updating footer info');
      }
      return updateFooterInfo(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerInfo'] });
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
    if (!formData.title.en) {
      toast.error(translate('pleaseFillInAllRequiredFields', language));
      return;
    }
    
    if (formData.id) {
      updateMutation.mutate({
        id: formData.id,
        section: formData.section,
        title: formData.title,
        content: formData.content,
        link: formData.link,
        icon: formData.icon,
        order: formData.order
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleInputChange = (
    lang: Language,
    field: 'title' | 'content',
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value,
      },
    });
  };

  const handleSectionChange = (section: 'quickLinks' | 'contactInfo' | 'officeHours') => {
    setFormData({
      ...formData,
      section,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {footerInfo ? translate('editContent', language) : translate('addNew', language)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="section">{translate('section', language)}</Label>
            <Select
              value={formData.section}
              onValueChange={(value) => handleSectionChange(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder={translate('selectSection', language)} />
              </SelectTrigger>
              <SelectContent>
                {footerSections.map((section) => (
                  <SelectItem key={section.value} value={section.value}>
                    {section.label}
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
                  <Label htmlFor={`title-${lang.code}`}>{translate('title', language)}</Label>
                  <Input
                    id={`title-${lang.code}`}
                    value={formData.title[lang.code] || ''}
                    onChange={(e) => handleInputChange(lang.code, 'title', e.target.value)}
                    required={lang.code === 'en'} // Only English is required
                    dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`content-${lang.code}`}>{translate('content', language)}</Label>
                  <Textarea
                    id={`content-${lang.code}`}
                    value={formData.content[lang.code] || ''}
                    onChange={(e) => handleInputChange(lang.code, 'content', e.target.value)}
                    required={lang.code === 'en'} // Only English is required
                    rows={5}
                    dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {formData.section === 'quickLinks' && (
            <div className="space-y-2">
              <Label htmlFor="link">{translate('link', language)}</Label>
              <Input
                id="link"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="/about"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="icon">{translate('icon', language)}</Label>
            <Input
              id="icon"
              value={formData.icon || ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="MapPin"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">{translate('order', language)}</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min={0}
            />
          </div>

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

export default FooterInfoFormDialog;
