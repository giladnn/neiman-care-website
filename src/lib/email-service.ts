
import { supabase } from '@/integrations/supabase/client';
import { AppointmentForm } from '@/types';

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactForm): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { type: 'contact', data }
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

export const sendAppointmentEmail = async (data: AppointmentForm): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { type: 'appointment', data }
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error sending appointment email:', error);
    return false;
  }
};
