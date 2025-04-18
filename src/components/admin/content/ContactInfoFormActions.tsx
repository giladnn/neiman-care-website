
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

interface ContactInfoFormActionsProps {
  onCancel: () => void;
  isLoading: boolean;
}

const ContactInfoFormActions: React.FC<ContactInfoFormActionsProps> = ({
  onCancel,
  isLoading,
}) => {
  const { language } = useLanguage();

  return (
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        {translate('cancel', language)}
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            {translate('saving', language)}
          </span>
        ) : (
          translate('saveChanges', language)
        )}
      </Button>
    </div>
  );
};

export default ContactInfoFormActions;
