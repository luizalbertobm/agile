import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { HiCog, HiMoon, HiSun, HiMenuAlt3, HiSave } from 'react-icons/hi';
import { HiRocketLaunch } from 'react-icons/hi2';
import { useTheme } from '../../../hooks/useTheme';
import { useLanguage } from '../../../hooks/useLanguage';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import beeLogoUrl from '../../../assets/bee-transparent.png';

const Navbar = ({ onSidebarToggle, onSave, onOpenSettings }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <nav className="bg-background/50 backdrop-blur-sm border-b shadow-lg sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <Avatar className="w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0">
                <AvatarImage
                  src={beeLogoUrl}
                  alt={t('navbar.logoAlt')}
                  className="object-contain"
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold">
                  <HiRocketLaunch className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-lg sm:text-xl font-bold text-foreground truncate">
                  {t('navbar.brand')}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  {t('navbar.tagline')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Theme Toggle - Hidden on mobile, show icon only on tablet */}
              <div className="hidden sm:block">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleDarkMode}
                      aria-label={t('navbar.toggleTheme')}
                      className="px-2 sm:px-3"
                    >
                      {isDarkMode ? (
                        <>
                          <HiSun className="h-4 w-4 text-yellow-500" />
                          <span className="ml-1 hidden lg:inline">{t('navbar.themeLight')}</span>
                        </>
                      ) : (
                        <>
                          <HiMoon className="h-4 w-4 text-blue-700" />
                          <span className="ml-1 hidden lg:inline">{t('navbar.themeDark')}</span>
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t('navbar.toggleTheme')} ({isDarkMode ? t('navbar.themeLight') : t('navbar.themeDark')})
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Language Selector */}
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              
              {/* Separator - Hidden on mobile */}
              <Separator orientation="vertical" className="h-6 mx-1 sm:mx-2 hidden sm:block" />
              
              {/* Stories Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onSidebarToggle}
                    aria-label={t('navbar.toggleSidebar')}
                    className="px-2 sm:px-3"
                  >
                    <HiMenuAlt3 className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="ml-1 hidden md:inline">{t('navbar.stories')}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('navbar.toggleSidebar')}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onOpenSettings}
                    aria-label={t('navbar.settings')}
                    className="px-2 sm:px-3"
                  >
                    <HiCog className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="ml-1 hidden md:inline">{t('navbar.settings')}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('navbar.settings')}</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Save Button */}
              <Button
                variant="default"
                size="sm"
                className="text-white px-2 sm:px-3"
                onClick={onSave}
                aria-label={t('navbar.save')}
              >
                <HiSave className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-1 hidden md:inline">{t('navbar.save')}</span>
              </Button>
            </div>
          </div>
          
          {/* Mobile Actions Row - Shows theme toggle and language selector on mobile */}
          <div className="flex items-center justify-between mt-3 sm:hidden border-t pt-3">
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    aria-label={t('navbar.toggleTheme')}
                    className="px-2"
                  >
                    {isDarkMode ? (
                      <>
                        <HiSun className="h-4 w-4 text-yellow-500" />
                        <span className="ml-1 text-xs">{t('navbar.themeLight')}</span>
                      </>
                    ) : (
                      <>
                        <HiMoon className="h-4 w-4 text-blue-700" />
                        <span className="ml-1 text-xs">{t('navbar.themeDark')}</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('navbar.toggleTheme')}</p>
                </TooltipContent>
              </Tooltip>
              
              <LanguageSelector />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              aria-label={t('navbar.settings')}
              className="px-2"
            >
              <HiCog className="h-4 w-4" />
            </Button>
            
            <span className="text-xs text-muted-foreground">
              {t('navbar.tagline')}
            </span>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;
