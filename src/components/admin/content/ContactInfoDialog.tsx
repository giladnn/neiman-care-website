
import React from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { ContactInfo } from '@/types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactInfo: ContactInfo | null;
}

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

const ContactInfoDialog: React.FC<ContactInfoDialogProps> = ({
  open,
  onOpenChange,
  contactInfo,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = React.useState('en');
  const [formData, setFormData] = React.useState<{
    type: ContactInfo['type'];
    value: Record<string, string>;
    order_num: number;
  }>({
    type: 'address',
    value: { en: '', he: '', ru: '' },
    order_num: 0,
  });

  React.useEffect(() => {
    if (contactInfo) {
      setFormData({
        type: contactInfo.type,
        value: contactInfo.value,
        order_num: contactInfo.order_num,
      });
    } else {
      setFormData({
        type: 'address',
        value: { en: '', he: '', ru: '' },
        order_num: 0,
      });
    }
  }, [contactInfo]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (contactInfo) {
        const { error } = await supabase
          .from('contact_info')
          .update(data)
          .eq('id', contactInfo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('contact_info').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
      onOpenChange(false);
      toast.success(
        translate(
          contactInfo ? 'contactInfoUpdated' : 'contactInfoAdded',
          language
        )
      );
    },
    onError: (error) => {
      toast.error(`${translate('error', language)}: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {translate(
              contactInfo ? 'editContactInfo' : 'addContactInfo',
              language
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>{translate('typeLabel', language)}</Label>
            <Select
              value={formData.type}
              onValueChange={(value: ContactInfo['type']) =>
                setFormData({ ...formData, type: value })
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
                setFormData({
                  ...formData,
                  order_num: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                        setFormData({
                          ...formData,
                          value: {
                            ...formData.value,
                            [lang.code]: e.target.value,
                          },
                        })
                      }
                      rows={5}
                    />
                  ) : (
                    <Input
                      value={formData.value[lang.code] || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          value: {
                            ...formData.value,
                            [lang.code]: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {translate('cancel', language)}
            </Button>
            <Button type="submit">
              {translate('saveChanges', language)}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoDialog;
