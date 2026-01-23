import { useEffect, useMemo, useState } from 'react';
import { useSidebar } from './hooks/useSidebar';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/common/Navbar/Navbar';
import Sidebar from './components/common/Sidebar/Sidebar';
import UserStoryBuilder from './components/UserStory/UserStoryBuilder';
import { STORAGE_KEYS, STATUS_VALUES } from './constants';
import { storage } from './utils/storage';
import { buildStorySummary, buildUserStoryMarkdown, createEmptyUserStoryData } from './utils/userStory';
import './App.css';

function App() {
  const { isSidebarOpen, toggleSidebar, closeSidebar, openSidebar } = useSidebar();
  const { t } = useLanguage();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [userStoryData, setUserStoryData] = useState(createEmptyUserStoryData);
  const [savedStories, setSavedStories] = useState(() => storage.get(STORAGE_KEYS.USER_STORIES, []));

  const priorityLabelMap = useMemo(
    () => ({
      baixa: t('userStory.priorities.low'),
      media: t('userStory.priorities.medium'),
      alta: t('userStory.priorities.high'),
      critica: t('userStory.priorities.critical')
    }),
    [t]
  );

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

  const handleSaveStory = () => {
    const markdown = buildUserStoryMarkdown({
      data: userStoryData,
      t,
      priorityLabelMap
    });
    const newStory = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: userStoryData.title?.trim() || 'Untitled story',
      description: buildStorySummary({ data: userStoryData, t }),
      status: STATUS_VALUES.TO_DO,
      priority: userStoryData.priority || null,
      estimate: userStoryData.storyPoints || null,
      createdAt: new Date().toISOString(),
      markdown
    };

    const updatedStories = [newStory, ...savedStories];
    setSavedStories(updatedStories);
    storage.set(STORAGE_KEYS.USER_STORIES, updatedStories);
    openSidebar();
  };

  const handleUpdateStoryStatus = (storyId, status) => {
    setSavedStories(prevStories => {
      const updatedStories = prevStories.map(story =>
        story.id === storyId ? { ...story, status } : story
      );
      storage.set(STORAGE_KEYS.USER_STORIES, updatedStories);
      return updatedStories;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900" key={forceUpdate}>
      <Navbar onSidebarToggle={toggleSidebar} onSave={handleSaveStory} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
        stories={savedStories}
        onUpdateStoryStatus={handleUpdateStoryStatus}
      />

      {/* Main Content */}
      <main className="p-3 sm:p-4 md:p-6">
        <UserStoryBuilder userStoryData={userStoryData} setUserStoryData={setUserStoryData} />
      </main>
    </div>
  );
}

export default App;
