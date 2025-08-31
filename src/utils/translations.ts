import trTranslations from '../lang/tr.json';
import enTranslations from '../lang/en.json';
import { store } from '../store/store';

const translations: Record<string, any> = {
  tr: trTranslations,
  en: enTranslations
};

export function getTranslation(key: string, interpolations?: Record<string, string | number>): string {
  const language = store.getState().employee.language;
  let translation = translations[language]?.[key] || translations['tr'][key] || key;
  
  if (interpolations) {
    Object.entries(interpolations).forEach(([placeholder, value]) => {
      translation = translation.replace(`{${placeholder}}`, String(value));
    });
  }
  
  return translation;
}
