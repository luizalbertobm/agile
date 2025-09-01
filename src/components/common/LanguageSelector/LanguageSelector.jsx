import React, { useState, useRef, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Button } from 'flowbite-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { HiChevronDown, HiGlobeAlt, HiCheck } from 'react-icons/hi2';

/**
 * Language Selector Component
 * Elegant dropdown to switch between available languages using Flowbite components
 */
export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { 
    currentLanguageInfo, 
    availableLanguages, 
    changeLanguage, 
    isLanguageActive,
    t 
  } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = async (languageCode) => {
    await changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button using Flowbite Button */}      
      <Button
        size="sm"
        color="light"
        onClick={() => setIsOpen(!isOpen)}
        className="!bg-gray-100 dark:!bg-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-600 !border-gray-200 dark:!border-gray-600 transition-all duration-200 !px-3 !py-2"
      >
        <div className="flex items-center space-x-2">
          <HiGlobeAlt className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <div className="flex items-center space-x-1">
            <ReactCountryFlag
              countryCode={currentLanguageInfo.countryCode}
              svg
              style={{
                width: '1.2em',
                height: '0.9em',
              }}
              title={currentLanguageInfo.name}
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
              {currentLanguageInfo.code.toUpperCase()}
            </span>
          </div>
          <HiChevronDown 
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`} 
          />
        </div>
      </Button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 z-50 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-600 overflow-hidden backdrop-blur-sm"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <HiGlobeAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('navbar.selectLanguage')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Choose your preferred language
                </p>
              </div>
            </div>
          </div>

          {/* Language Options */}
          <div className="py-2">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`group w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                  isLanguageActive(language.code)
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    : ''
                }`}
                role="menuitem"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <ReactCountryFlag
                        countryCode={language.countryCode}
                        svg
                        style={{
                          width: '1.8em',
                          height: '1.4em',
                        }}
                        title={language.name}
                        className="rounded-sm shadow-sm"
                      />
                      {isLanguageActive(language.code) && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <HiCheck className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium transition-colors ${
                        isLanguageActive(language.code)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {language.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t(`language.${language.code === 'pt' ? 'portuguese' : 'english'}`)}
                      </div>
                    </div>
                  </div>
                  
                  {isLanguageActive(language.code) && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          
        </div>
      )}
    </div>
  );
};
