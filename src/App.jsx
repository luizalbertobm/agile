
import { UserStoryProvider } from './contexts/UserStoryContext';
import { useSidebar } from './hooks/useSidebar';
import Navbar from './components/common/Navbar/Navbar';
import Sidebar from './components/common/Sidebar/Sidebar';
import './App.css';

const AppContent = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onSidebarToggle={toggleSidebar} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />

      {/* Main Content */}
      <main className="p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bem-vindo ao Bee Agile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sua ferramenta para criar e gerenciar User Stories de forma eficiente
          </p>
        </div>
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