
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ContactInfo } from '@/types';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { createContactInfo, updateContactInfo } from '@/lib/supabase';
import ContactInfoFields from './ContactInfoFields';
import ContactInfoFormActions from './ContactInfoFormActions';

interface ContactInfoFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contactInfo: ContactInfo | null;
}

const ContactInfoFormDialog: React.FC<ContactInfoFormDialogProps> = ({
  isOpen,
  onOpenChange,
  contactInfo,
}) => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('en');
  const [formData, setFormData] = useState<{
    type: ContactInfo['type'];
    value: Record<string, string>;
    order: number;
  }>({
    type: 'address',
    value: { en: '', he: '', ru: '' },
    order: 0,
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        type: contactInfo.type,
        value: contactInfo.value,
        order: contactInfo.order || 0,
      });
    } else {
      setFormData({
        type: 'address',
        value: { en: '', he: '', ru: '' },
        order: 0,
      });
    }
  }, [contactInfo]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (contactInfo) {
        return updateContactInfo({
          id: contactInfo.id,
          type: data.type,
          value: data.value,
          order: data.order,
        });
      } else {
        return createContactInfo(data);
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

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <ContactInfoFields
            formData={formData}
            onFieldChange={handleFieldChange}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <ContactInfoFormActions
            onCancel={() => onOpenChange(false)}
            isLoading={mutation.isPending}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoFormDialog;
