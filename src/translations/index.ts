
import { enTranslations } from './en';
import { heTranslations } from './he';
import { ruTranslations } from './ru';
import { Language } from '../context/LanguageContext';

// Define TranslationKey as a union of literal string types
// This ensures TypeScript knows all possible key values
export type TranslationKey = keyof typeof enTranslations;
export type Translation = Record<TranslationKey, string>;

const translations: Record<Language, Translation> = {
  en: enTranslations,
  he: heTranslations,
  ru: ruTranslations,
};

export function translate(key: TranslationKey, language: Language): string {
  return translations[language][key] || translations.en[key] || key;
}
