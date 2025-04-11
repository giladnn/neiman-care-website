
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBiographySection, updateBiographySection } from '@/lib/supabase';
import { BiographySection, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface BiographyFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  section: BiographySection | null;
  maxOrder: number;
}

const supportedLanguages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ru', name: 'Russian' },
];

const BiographyFormDialog: React.FC<BiographyFormDialogProps> = ({
  isOpen,
  onOpenChange,
  section,
  maxOrder,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [formData, setFormData] = useState<{
    id?: string;
    title: Record<Language, string>;
    content: Record<Language, string>;
    order: number;
  }>({
    title: { en: '', he: '', ru: '' },
    content: { en: '', he: '', ru: '' },
    order: maxOrder,
  });

  useEffect(() => {
    if (section) {
      setFormData({
        id: section.id,
        title: section.title || { en: '', he: '', ru: '' },
        content: section.content || { en: '', he: '', ru: '' },
        order: section.order || maxOrder,
      });
    } else {
      setFormData({
        title: { en: '', he: '', ru: '' },
        content: { en: '', he: '', ru: '' },
        order: maxOrder,
      });
    }
  }, [section, maxOrder]);

  const createMutation = useMutation({
    mutationFn: createBiographySection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biographySections'] });
      onOpenChange(false);
      toast.success(translate('contentCreated', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBiographySection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['biographySections'] });
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
    if (!formData.title.en || !formData.content.en) {
      toast.error(translate('pleaseFillInAllRequiredFields', language));
      return;
    }
    
    if (formData.id) {
      updateMutation.mutate(formData);
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {section ? translate('editContent', language) : translate('addNew', language)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                    rows={8}
                    dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>

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

export default BiographyFormDialog;
