import { Button } from 'flowbite-react';
import { HiX, HiDocumentText } from 'react-icons/hi';
import { useUserStories } from '../../../contexts/UserStoryContext';
import UserStoryCard from '../../UserStory/UserStoryCard';

const Sidebar = ({ isOpen, onClose }) => {
  const { state } = useUserStories();

  return (
    <>
      {/* Overlay com Backdrop Blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <HiDocumentText className="mr-2 h-6 w-6 text-yellow-500" />
            User Stories
          </h2>
          <Button
            color="gray"
            size="sm"
            onClick={onClose}
            className="p-2"
            aria-label="Close sidebar"
          >
            <HiX className="h-5 w-5" />
          </Button>
        </div>

        {/* Stories List */}
        <div className="p-6 space-y-4 overflow-y-auto h-full pb-20">
          {state.loading && (
            <div className="text-center text-gray-500">Carregando...</div>
          )}
          {state.error && (
            <div className="text-center text-red-500">{state.error}</div>
          )}
          {state.userStories.map((story) => (
            <UserStoryCard key={story.id} story={story} />
          ))}
          {state.userStories.length === 0 && !state.loading && (
            <div className="text-center text-gray-500">
              Nenhuma história encontrada
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
