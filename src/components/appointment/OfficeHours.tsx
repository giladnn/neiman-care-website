
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const OfficeHours = () => {
  const { language, direction } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className={`text-xl font-bold mb-4 font-serif ${direction === 'rtl' ? 'text-right' : ''}`}>
        {translate('officeHours', language)}
      </h3>
      <table className={`w-full ${direction === 'rtl' ? 'text-right' : ''}`}>
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">
              {translate('mondayThursday', language)}
            </td>
            <td className={`py-2 ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>9:00 AM - 5:00 PM</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">
              {translate('friday', language)}
            </td>
            <td className={`py-2 ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>9:00 AM - 2:00 PM</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">
              {translate('saturday', language)}
            </td>
            <td className={`py-2 ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
              {translate('closed', language)}
            </td>
          </tr>
          <tr>
            <td className="py-2 font-medium">
              {translate('sunday', language)}
            </td>
            <td className={`py-2 ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
              {translate('closed', language)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OfficeHours;
