
import React from 'react';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const WhatsAppQR = () => {
  const { language } = useLanguage();
  const phoneNumber = '972503014338'; // International format (remove the leading 0 and add country code)
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 relative">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappUrl)}`}
              alt="WhatsApp QR Code"
              className="w-full h-full"
            />
          </div>
          <Button 
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full"
          >
            {translate('openWhatsApp', language)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppQR;
