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
import { createFaq, updateFaq } from '@/lib/supabase';
import { FAQ, Language } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface FAQFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  faq: FAQ | null;
}

const supportedLanguages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'he', name: 'Hebrew' },
  { code: 'ru', name: 'Russian' },
];

const FAQFormDialog: React.FC<FAQFormDialogProps> = ({
  isOpen,
  onOpenChange,
  faq,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [formData, setFormData] = useState<{
    id?: string;
    question: Record<Language, string>;
    answer: Record<Language, string>;
    category?: string;
    order?: number;
  }>({
    question: { en: '', he: '', ru: '' },
    answer: { en: '', he: '', ru: '' },
    category: 'general',
    order: 0,
  });

  useEffect(() => {
    if (faq) {
      setFormData({
        id: faq.id,
        question: faq.question || { en: '', he: '', ru: '' },
        answer: faq.answer || { en: '', he: '', ru: '' },
        category: faq.category || 'general',
        order: faq.order || 0,
      });
    } else {
      setFormData({
        question: { en: '', he: '', ru: '' },
        answer: { en: '', he: '', ru: '' },
        category: 'general',
        order: 0,
      });
    }
  }, [faq]);

  const createMutation = useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      onOpenChange(false);
      toast.success(translate('contentCreated', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: FAQ) => {
      if (!data.id) {
        throw new Error('ID is required for updating FAQ');
      }
      return updateFaq(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      onOpenChange(false);
      toast.success(translate('contentUpdated', language));
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.en || !formData.answer.en) {
      toast.error(translate('pleaseFillInAllRequiredFields', language));
      return;
    }
    
    if (formData.id) {
      updateMutation.mutate({
        id: formData.id,
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        order: formData.order
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleInputChange = (
    lang: Language,
    field: 'question' | 'answer',
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
            {faq ? translate('editFaq', language) : translate('addFaq', language)}
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
                  <Label htmlFor={`question-${lang.code}`}>{translate('question', language)}</Label>
                  <Input
                    id={`question-${lang.code}`}
                    value={formData.question[lang.code] || ''}
                    onChange={(e) => handleInputChange(lang.code, 'question', e.target.value)}
                    required={lang.code === 'en'}
                    dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`answer-${lang.code}`}>{translate('answer', language)}</Label>
                  <Textarea
                    id={`answer-${lang.code}`}
                    value={formData.answer[lang.code] || ''}
                    onChange={(e) => handleInputChange(lang.code, 'answer', e.target.value)}
                    required={lang.code === 'en'}
                    rows={5}
                    dir={lang.code === 'he' ? 'rtl' : 'ltr'}
                  />
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

export default FAQFormDialog;
