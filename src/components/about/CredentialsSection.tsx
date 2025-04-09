
import React from 'react';

const CredentialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            Education & Credentials
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">Education</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">Medical Degree</h4>
                <p className="text-gray-600">Hadassah Medical School, Hebrew University</p>
                <p className="text-gray-500">Jerusalem, Israel • 2001-2007</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">Oncology Fellowship</h4>
                <p className="text-gray-600">Memorial Sloan Kettering Cancer Center</p>
                <p className="text-gray-500">New York, USA • 2010-2013</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">Internal Medicine Residency</h4>
                <p className="text-gray-600">Tel Aviv Sourasky Medical Center</p>
                <p className="text-gray-500">Tel Aviv, Israel • 2007-2010</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">Certifications & Memberships</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">Board Certifications</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>Israeli Board of Internal Medicine</li>
                  <li>Israeli Board of Medical Oncology</li>
                  <li>European Society for Medical Oncology (ESMO) Certification</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">Professional Memberships</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>Israeli Society of Clinical Oncology and Radiation Therapy (ISCORT)</li>
                  <li>European Society for Medical Oncology (ESMO)</li>
                  <li>American Society of Clinical Oncology (ASCO)</li>
                  <li>International Association for the Study of Lung Cancer (IASLC)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">Languages</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>Hebrew (Native)</li>
                  <li>English (Fluent)</li>
                  <li>Russian (Proficient)</li>
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
