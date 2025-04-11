
import { enTranslations } from './en';
import { heTranslations } from './he';
import { ruTranslations } from './ru';
import { Language } from '../types';

// Use a concrete type for translations that doesn't reference itself
export type Translation = Record<string, string>;

// Define translations record using concrete types
const translations: Record<Language, Translation> = {
  en: enTranslations,
  he: heTranslations,
  ru: ruTranslations,
};

export function translate(key: string, language: Language): string {
  // First try to get the translation in the requested language
  // If it doesn't exist, fall back to English
  // If it doesn't exist in English either, return the key itself as fallback
  return (
    translations[language]?.[key] || 
    translations.en[key] || 
    key
  );
}

// Helper function to get direction based on language
export function getDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'he' ? 'rtl' : 'ltr';
}
