
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'he' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');

  // Update direction when language changes
  useEffect(() => {
    // Hebrew should be right-to-left
    setDirection(language === 'he' ? 'rtl' : 'ltr');
    
    // Apply direction to HTML document
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.body.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
