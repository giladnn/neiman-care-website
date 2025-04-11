
import { enTranslations } from './en';
import { heTranslations } from './he';
import { ruTranslations } from './ru';
import { Language } from '../context/LanguageContext';

// Define TranslationKey as a union of literal string types
// This ensures TypeScript knows all possible key values
export type TranslationKey = keyof typeof enTranslations;

// Make Translation type more flexible - all keys from English translations are optional
export type Translation = Partial<Record<TranslationKey, string>>;

const translations: Record<Language, Translation> = {
  en: enTranslations,
  he: heTranslations,
  ru: ruTranslations,
};

export function translate(key: TranslationKey | string, language: Language): string {
  // First try to get the translation in the requested language
  // If it doesn't exist, fall back to English
  // If it doesn't exist in English either, return the key itself as fallback
  return (
    translations[language]?.[key as TranslationKey] || 
    translations.en[key as TranslationKey] || 
    key
  );
}

// Helper function to get direction based on language
export function getDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'he' ? 'rtl' : 'ltr';
}
