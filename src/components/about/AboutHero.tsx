import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/translations";
import React from "react";

const AboutHero = () => {
  const { language } = useLanguage();

  return (
    <div className="pt-24 pb-16 bg-primary/10">
      <div className="container mx-auto text-center">
        {/* <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">
          {translate("aboutDoctorHeader", language)}
        </h1> */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Leading oncologist dedicated to providing personalized cancer
          treatment through cutting-edge medical expertise and compassionate
          care.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;
