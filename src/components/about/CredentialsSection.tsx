
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const CredentialsSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            {translate("educationCredentials", language)}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">{translate("education", language)}</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{translate("medicalDegree", language)}</h4>
                <p className="text-gray-600">{translate("sovietUniversityMedicine", language)}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{translate("specialization", language)}</h4>
                <p className="text-gray-600">{translate("rabinMedicalCenter", language)}</p>
                <p className="text-gray-500">{translate("internalMedicineOncology", language)}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">{translate("professionalAffiliations", language)}</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{translate("currentPosition", language)}</h4>
                <p className="text-gray-600">{translate("davidoffCancerCenter", language)}</p>
                <p className="text-gray-500">{translate("oncologyDepartmentHead", language)}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{translate("professionalMemberships", language)}</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>{translate("israeliOncologySociety", language)}</li>
                  <li>{translate("israeliInternalMedicine", language)}</li>
                  <li>{translate("esmoMembership", language)}</li>
                  <li>{translate("israeliUrologySociety", language)}</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{translate("languages", language)}</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>{translate("hebrew", language)}</li>
                  <li>{translate("english", language)}</li>
                  <li>{translate("russian", language)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
