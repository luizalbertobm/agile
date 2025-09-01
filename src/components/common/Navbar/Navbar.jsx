import { Button, HomeIcon } from 'flowbite-react';
import { HiMoon, HiSun, HiMenuAlt3 } from 'react-icons/hi';
import { useTheme } from '../../../hooks/useTheme';

const Navbar = ({ onSidebarToggle }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-700 rounded-lg">
              <HomeIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Bee Agile
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              color="gray"
              size="sm"
              onClick={onSidebarToggle}
              className="!bg-gray-100 dark:!bg-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-600 !border-gray-200 dark:!border-gray-600 cursor-pointer"
              aria-label="Open sidebar"
            >
              <HiMenuAlt3 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <Button
              color="gray"
              size="sm"
              onClick={toggleDarkMode}
              className="!bg-gray-100 dark:!bg-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-600 !border-gray-200 dark:!border-gray-600 transition-all duration-200 cursor-pointer"
              aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
              title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              <div className="transition-transform duration-200 hover:scale-110">
                {isDarkMode ? (
                  <HiSun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <HiMoon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
