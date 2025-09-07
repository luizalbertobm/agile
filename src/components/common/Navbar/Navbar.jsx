import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { HiMoon, HiSun, HiMenuAlt3, HiSave } from 'react-icons/hi';
import { HiRocketLaunch } from 'react-icons/hi2';
import { useTheme } from '../../../hooks/useTheme';
import { useLanguage } from '../../../hooks/useLanguage';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

const Navbar = ({ onSidebarToggle }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <nav className="bg-background/50 backdrop-blur-sm  border-b shadow-lg sticky top-0 z-50">
        <div className="px-6 py-4 max-w-7xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold">
                  <HiRocketLaunch className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">
                  {t('navbar.brand')}
                </span>
                <Badge variant="secondary" className="text-xs w-fit">
                  Beta
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    // size="sm"
                    onClick={onSidebarToggle}
                    aria-label={t('navbar.toggleSidebar')}
                  >
                    <HiMenuAlt3 className="h-5 w-5" />
                    <span>{t('navbar.stories')}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('navbar.toggleSidebar')}</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="default"
                className="text-white"
                onClick={onSidebarToggle}
                aria-label={t('navbar.save')}
              >
                <HiSave className="h-5 w-5" />

                <span>{t('navbar.save')}</span>
              </Button>
              

              <Separator orientation="vertical" className="h-6 mx-2" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={toggleDarkMode}
                    aria-label={t('navbar.toggleTheme')}
                  >
                    {isDarkMode ? (
                      <>
                        <HiSun className="h-4 w-4 text-yellow-500" />
                        <span>Light</span>
                      </>
                    ) : (
                      <>
                        <HiMoon className="h-4 w-4 text-blue-700" />
                        <span>Dark</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('navbar.toggleTheme')} ({isDarkMode ? 'Light' : 'Dark'})</p>
                </TooltipContent>
              </Tooltip>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Language Selector */}
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;
