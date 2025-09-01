
import { UserStoryProvider } from './contexts/UserStoryContext';
import { useSidebar } from './hooks/useSidebar';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/common/Navbar/Navbar';
import Sidebar from './components/common/Sidebar/Sidebar';
import UserStoryBuilder from './components/UserStory/UserStoryBuilder';
import './App.css';

const AppContent = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
};

function App() {
  return (
    <UserStoryProvider>
      <AppContent />
    </UserStoryProvider>
  );
}

export default App;