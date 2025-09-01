import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

/**
 * Custom hook for language management
 * Provides language state and switching functionality with localStorage persistence
 */
export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  
  const currentLanguage = i18n.language || 'pt';
  
  /**
   * Change the application language
   * @param {string} languageCode - The language code to switch to
   */
  const changeLanguage = useCallback(async (languageCode) => {
    try {
      // Validate language code
      if (!LANGUAGES[languageCode]) {
        console.warn(`Language code '${languageCode}' is not supported`);
        return;
      }
      
      // Change language in i18n
      await i18n.changeLanguage(languageCode);
      
      // Persist to localStorage
      setStorageItem(STORAGE_KEYS.LANGUAGE, languageCode);
      
      console.log(`Language changed to: ${languageCode}`);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [i18n]);
  
  /**
   * Get the current language information
   */
  const getCurrentLanguageInfo = useCallback(() => {
    return LANGUAGES[currentLanguage] || LANGUAGES.pt;
  }, [currentLanguage]);
  
  /**
   * Check if a language is currently active
   * @param {string} languageCode - The language code to check
   */
  const isLanguageActive = useCallback((languageCode) => {
    return currentLanguage === languageCode;
  }, [currentLanguage]);
  
  /**
   * Get all available languages
   */
  const getAvailableLanguages = useCallback(() => {
    return Object.values(LANGUAGES);
  }, []);
  
  /**
   * Reset language to browser default
   */
  const resetLanguage = useCallback(async () => {
    try {
      // Remove from localStorage
      localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
      
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const targetLang = LANGUAGES[browserLang] ? browserLang : 'pt';
      
      await changeLanguage(targetLang);
    } catch (error) {
      console.error('Error resetting language:', error);
      await changeLanguage('pt'); // Fallback to Portuguese
    }
  }, [changeLanguage]);
  
  return {
    // State
    currentLanguage,
    currentLanguageInfo: getCurrentLanguageInfo(),
    availableLanguages: getAvailableLanguages(),
    
    // Actions
    changeLanguage,
    isLanguageActive,
    resetLanguage,
    
    // Translation function
    t
  };
};
