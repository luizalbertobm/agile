import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTranslations from './locales/pt.json';
import enTranslations from './locales/en.json';

export const LANGUAGES = {
  pt: {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations }
    },
    lng: 'pt',
    fallbackLng: 'pt',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
