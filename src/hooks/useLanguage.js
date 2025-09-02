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
  
  // Debug logs
  console.log('useLanguage Debug:', {
    currentLanguage,
    i18nLanguage: i18n.language,
    resolvedLanguage: i18n.resolvedLanguage,
    localStorage: localStorage.getItem(STORAGE_KEYS.LANGUAGE),
    availableResources: Object.keys(i18n.services.resourceStore.data)
  });
  
  /**
   * Change the application language
   * @param {string} languageCode - The language code to switch to
   */
  const changeLanguage = useCallback(async (language) => {
    console.log('🌍 [DEBUG] Changing language:', {
      currentLanguage,
      targetLanguage: language,
      i18nCurrentLanguage: i18n.language,
      beforeChange: {
        localStorage: localStorage.getItem(STORAGE_KEYS.LANGUAGE),
        i18nLanguage: i18n.language,
        resolvedLanguage: i18n.resolvedLanguage
      }
    });
    
    try {
      // Update localStorage first
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
      console.log('🌍 [DEBUG] Updated localStorage:', localStorage.getItem(STORAGE_KEYS.LANGUAGE));
      
      // Change i18n language and wait for it to complete
      await i18n.changeLanguage(language);
      console.log('🌍 [DEBUG] i18n.changeLanguage completed');
      
      // Verify the change
      console.log('🌍 [DEBUG] After change:', {
        currentLanguage: language,
        i18nLanguage: i18n.language,
        resolvedLanguage: i18n.resolvedLanguage,
        localStorage: localStorage.getItem(STORAGE_KEYS.LANGUAGE),
        testTranslation: i18n.t('navbar.title')
      });
      
      // Force a re-render by triggering a custom event
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
      
    } catch (error) {
      console.error('🌍 [ERROR] Error changing language:', error);
    }
  }, [currentLanguage, i18n]);
  
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
