
import Layout from '@/components/layout/Layout';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import ContactInfo from '@/components/appointment/ContactInfo';
import OfficeHours from '@/components/appointment/OfficeHours';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const Appointment = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">
            {translate('scheduleAnAppointment', language)}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translate('appointmentDescription', language)}
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 font-serif">
                {translate('requestAnAppointment', language)}
              </h2>
              <AppointmentForm />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <ContactInfo />
            <OfficeHours />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appointment;
