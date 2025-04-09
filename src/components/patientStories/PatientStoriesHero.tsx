
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const PatientStoriesHero = () => {
  const { language, direction } = useLanguage();
  
  return (
    <div className="pt-24 pb-16 bg-primary/10">
      <div className="container mx-auto text-center">
        <h1 className={`text-4xl font-bold mb-4 font-serif text-gray-800 ${direction === 'rtl' ? 'text-right md:text-center' : ''}`}>
          {translate('patientStoriesTitle', language)}
        </h1>
        <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${direction === 'rtl' ? 'text-right md:text-center' : ''}`}>
          {translate('patientStoriesDescription', language)}
        </p>
      </div>
    </div>
  );
};

export default PatientStoriesHero;
