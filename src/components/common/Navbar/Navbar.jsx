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
import { HiMoon, HiSun, HiMenuAlt3, HiHome, HiSave } from 'react-icons/hi';
import { useTheme } from '../../../hooks/useTheme';
import { useLanguage } from '../../../hooks/useLanguage';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { HiDocumentText } from 'react-icons/hi2';

const Navbar = ({ onSidebarToggle }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <nav className="bg-background border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold">
                  <HiHome className="h-5 w-5" />
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
              <Button
                variant="default"
                // size="sm"
                onClick={onSidebarToggle}
                aria-label={t('navbar.save')}
              >
                <HiSave className="h-5 w-5" />
                
                <span>{t('navbar.save')}</span>
              </Button>
              <Button
                variant="outline"
                // size="sm"
                onClick={onSidebarToggle}
                aria-label={t('navbar.copy')}
              >
                <HiSave className="h-5 w-5" />

                <span>{t('navbar.copy')}</span>
              </Button>
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

              <Separator orientation="vertical" className="h-6 mx-2" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    aria-label={t('navbar.toggleTheme')}
                  >
                    <div className="transition-transform duration-200 hover:scale-110">
                      {isDarkMode ? (
                        <HiSun className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <HiMoon className="h-5 w-5" />
                      )}
                    </div>
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
