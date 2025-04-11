
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';
import { Mail } from 'lucide-react';

interface MessageDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
}

const MessageDetailsDialog: React.FC<MessageDetailsDialogProps> = ({
  isOpen,
  onOpenChange,
  message,
}) => {
  const { language } = useLanguage();

  if (!message) {
    return null;
  }

  const formattedDate = message.created_at 
    ? formatDistanceToNow(new Date(message.created_at), { addSuffix: true }) 
    : '';

  const handleReply = () => {
    if (message.email) {
      window.location.href = `mailto:${message.email}?subject=Re: Message from ${message.name}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{translate('messageFrom', language)} {message.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <div><span className="font-medium">{message.email}</span></div>
            <div>{formattedDate}</div>
          </div>
          
          <div className="border-t pt-4">
            <p className="whitespace-pre-wrap">{message.message}</p>
          </div>
          
          <div className="flex justify-end pt-2">
            <Button onClick={handleReply} variant="default" className="flex items-center gap-2">
              <Mail size={16} />
              {translate('reply', language)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsDialog;
