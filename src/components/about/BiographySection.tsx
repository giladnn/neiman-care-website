
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { translate } from "@/translations";
import { useLanguage } from "@/context/LanguageContext";

const BiographySection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/lovable-uploads/c8e66106-bb56-4180-9cb9-f1df0a5fc1e7.png"
                alt="Dr. Victoria Neiman"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 font-serif">
              {translate("professionalBiography", language)}
            </h2>
            <div className="w-20 h-1 bg-secondary"></div>

            <div className="text-gray-600 space-y-4 text-justify">
              <p>{translate("biographyText1", language)}</p>
              <p>{translate("biographyText2", language)}</p>
              <p>{translate("biographyText3", language)}</p>
              <p>{translate("biographyText4", language)}</p>
              <p>{translate("biographyText5", language)}</p>
              <p>{translate("biographyText6", language)}</p>
              <p>{translate("biographyText7", language)}</p>
              <p>{translate("biographyText8", language)}</p>
              <p>{translate("biographyText9", language)}</p>
              <p>{translate("biographyText10", language)}</p>
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary-dark text-white"
              >
                <Link to="/appointment">{translate("scheduleAppointment", language)}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;
