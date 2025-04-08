
import { en } from './en';
import { he } from './he';
import { ru } from './ru';
import { Language } from '../context/LanguageContext';

const translations = {
  en,
  he,
  ru,
};

export function translate(key: keyof typeof en, language: Language): string {
  return translations[language][key] || translations.en[key] || key;
}
