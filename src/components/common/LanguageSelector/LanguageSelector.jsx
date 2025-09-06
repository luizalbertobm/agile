import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../../../hooks/useLanguage';
import { HiChevronDown, HiGlobeAlt, HiCheck } from 'react-icons/hi2';

/**
 * Language Selector Component
 * Elegant dropdown to switch between available languages using shadcn/ui components
 */
export const LanguageSelector = () => {
  const { 
    currentLanguageInfo, 
    availableLanguages, 
    changeLanguage, 
    isLanguageActive,
    t 
  } = useLanguage();

  const handleLanguageChange = async (languageCode) => {
    await changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="space-x-2">
          <ReactCountryFlag
            countryCode={currentLanguageInfo.countryCode}
            svg
            style={{
              width: '1.2em',
              height: '0.9em',
            }}
            title={currentLanguageInfo.name}
          />
          <span className="hidden sm:block text-sm font-medium">
            {currentLanguageInfo.code.toUpperCase()}
          </span>
          <HiChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <HiGlobeAlt className="w-4 h-4 text-muted-foreground" />
          <span>{t('navbar.selectLanguage')}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <ReactCountryFlag
                countryCode={language.countryCode}
                svg
                style={{
                  width: '1.5em',
                  height: '1.1em',
                }}
                title={language.name}
                className="rounded-sm"
              />
              <div>
                <div className="font-medium">{language.name}</div>
                <div className="text-xs text-muted-foreground">
                  {t(`language.${language.code === 'pt' ? 'portuguese' : 'english'}`)}
                </div>
              </div>
            </div>
            
            {isLanguageActive(language.code) && (
              <div className="flex items-center space-x-1">
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
                <HiCheck className="w-4 h-4 text-green-600" />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
