
import { supabase } from '@/integrations/supabase/client';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html }
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
