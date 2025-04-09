
import { en } from './en';
import { he } from './he';
import { ru } from './ru';
import { Language } from '../context/LanguageContext';

export type Translation = typeof en;

const translations: Record<Language, Translation> = {
  en,
  he,
  ru,
};

export function translate(key: keyof Translation, language: Language): string {
  return translations[language][key as keyof Translation] || translations.en[key as keyof Translation] || key;
}
