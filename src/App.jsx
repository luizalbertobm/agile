import { useEffect, useState } from 'react';
import { useSidebar } from './hooks/useSidebar';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/common/Navbar/Navbar';
import Sidebar from './components/common/Sidebar/Sidebar';
import UserStoryBuilder from './components/UserStory/UserStoryBuilder';
import './App.css';

function App() {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { t } = useLanguage();
  const [forceUpdate, setForceUpdate] = useState(0);

  // Listen for language changes to force re-render
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('🌍 [DEBUG] Language change event received, forcing re-render');
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" key={forceUpdate}>
      <Navbar onSidebarToggle={toggleSidebar} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />

      {/* Main Content */}
      <main className="p-6">
        <UserStoryBuilder />
      </main>
    </div>
  );
}

export default App;