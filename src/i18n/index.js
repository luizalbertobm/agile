import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import ptTranslations from './locales/pt.json';
import enTranslations from './locales/en.json';

// Supported languages
export const LANGUAGES = {
  pt: {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    countryCode: 'BR' // For react-country-flag
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    countryCode: 'US' // For react-country-flag
  }
};

// Get language from localStorage or browser detection
const getStoredLanguage = () => {
  try {
    return localStorage.getItem('bee-agile-language') || null;
  } catch (error) {
    console.error('Error reading language from localStorage:', error);
    return null;
  }
};

// Configure i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: ptTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    
    // Language detection configuration
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'bee-agile-language',
      caches: ['localStorage']
    },
    
    // Fallback language
    fallbackLng: 'pt',
    
    // Default namespace
    defaultNS: 'translation',
    
    // Interpolation configuration
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Load stored language if available
    lng: getStoredLanguage() || undefined
  });

export default i18n;
