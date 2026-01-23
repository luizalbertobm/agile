import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language || 'pt';

  const changeLanguage = useCallback(async (language) => {
    try {
      await i18n.changeLanguage(language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [i18n]);

  const getCurrentLanguageInfo = useCallback(() => {
    return LANGUAGES[currentLanguage] || LANGUAGES.pt;
  }, [currentLanguage]);

  const isLanguageActive = useCallback((languageCode) => {
    return currentLanguage === languageCode;
  }, [currentLanguage]);

  const getAvailableLanguages = useCallback(() => {
    return Object.values(LANGUAGES);
  }, []);

  return {
    currentLanguage,
    currentLanguageInfo: getCurrentLanguageInfo(),
    availableLanguages: getAvailableLanguages(),
    changeLanguage,
    isLanguageActive,
    t
  };
};
