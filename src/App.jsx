import { useEffect, useMemo, useState } from 'react';
import { useSidebar } from './hooks/useSidebar';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/common/Navbar/Navbar';
import Sidebar from './components/common/Sidebar/Sidebar';
import UserStoryBuilder from './components/UserStory/UserStoryBuilder';
import { STORAGE_KEYS } from './constants';
import { storage } from './utils/storage';
import { buildStorySummary, buildUserStoryMarkdown, createEmptyUserStoryData } from './utils/userStory';
import './App.css';

function App() {
  const { isSidebarOpen, toggleSidebar, closeSidebar, openSidebar } = useSidebar();
  const { t } = useLanguage();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [userStoryData, setUserStoryData] = useState(createEmptyUserStoryData);
  const [editingStoryId, setEditingStoryId] = useState(null);
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
    const dataSnapshot = typeof structuredClone === 'function'
      ? structuredClone(userStoryData)
      : JSON.parse(JSON.stringify(userStoryData));
    const markdown = buildUserStoryMarkdown({
      data: userStoryData,
      t,
      priorityLabelMap
    });
    setSavedStories(prevStories => {
      if (editingStoryId) {
        const updatedStories = prevStories.map(story => {
          if (story.id !== editingStoryId) return story;
          return {
            ...story,
            title: userStoryData.title?.trim() || story.title || 'Untitled story',
            description: buildStorySummary({ data: userStoryData, t }),
            priority: userStoryData.priority || null,
            estimate: userStoryData.storyPoints || null,
            markdown,
            data: dataSnapshot
          };
        });
        storage.set(STORAGE_KEYS.USER_STORIES, updatedStories);
        return updatedStories;
      }

      const newStory = {
        id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title: userStoryData.title?.trim() || 'Untitled story',
        description: buildStorySummary({ data: userStoryData, t }),
        status: 'to do',
        priority: userStoryData.priority || null,
        estimate: userStoryData.storyPoints || null,
        createdAt: new Date().toISOString(),
        markdown,
        data: dataSnapshot
      };

      const updatedStories = [newStory, ...prevStories];
      storage.set(STORAGE_KEYS.USER_STORIES, updatedStories);
      return updatedStories;
    });
    setEditingStoryId(null);
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

  const handleDeleteStory = (storyId) => {
    setSavedStories(prevStories => {
      const updatedStories = prevStories.filter(story => story.id !== storyId);
      storage.set(STORAGE_KEYS.USER_STORIES, updatedStories);
      return updatedStories;
    });
    if (editingStoryId === storyId) {
      setEditingStoryId(null);
    }
  };

  const handleEditStory = (story) => {
    const baseData = createEmptyUserStoryData();
    let storyData = { ...baseData, title: story?.title || '' };

    if (story?.data) {
      storyData = { ...baseData, ...story.data };
    } else {
      if (story?.priority) {
        storyData.priority = story.priority;
      }
      if (story?.estimate) {
        storyData.storyPoints = story.estimate;
      }
      if (story?.description) {
        const ptMatch = story.description.match(/Como\s+(.+?),\s*eu\s+quero\s+(.+?)\s+para\s+que\s+(.+)/i);
        const enMatch = story.description.match(/As\s+(.+?),\s*I\s+want\s+(.+?)\s+so\s+that\s+(.+)/i);
        const match = ptMatch || enMatch;
        if (match) {
          storyData.as = match[1].trim();
          storyData.iWant = match[2].trim();
          storyData.soThat = match[3].trim();
        }
      }
    }
    setUserStoryData(storyData);
    setEditingStoryId(story?.id ?? null);
    closeSidebar();
  };

  const handleCreateStory = () => {
    setUserStoryData(createEmptyUserStoryData());
    setEditingStoryId(null);
    closeSidebar();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900" key={forceUpdate}>
      <Navbar onSidebarToggle={toggleSidebar} onSave={handleSaveStory} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
        stories={savedStories}
        onUpdateStoryStatus={handleUpdateStoryStatus}
        onDeleteStory={handleDeleteStory}
        onEditStory={handleEditStory}
        onCreateStory={handleCreateStory}
      />

      {/* Main Content */}
      <main className="p-3 sm:p-4 md:p-6">
        <UserStoryBuilder userStoryData={userStoryData} setUserStoryData={setUserStoryData} />
      </main>
    </div>
  );
}

export default App;
