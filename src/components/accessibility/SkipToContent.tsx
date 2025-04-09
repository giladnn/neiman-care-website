
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const SkipToContent = () => {
  const { language } = useLanguage();
  
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-primary focus:text-white focus:p-4 focus:rounded"
    >
      {translate('skipToContent', language)}
    </a>
  );
};

export default SkipToContent;
