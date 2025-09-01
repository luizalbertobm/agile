import { Button } from 'flowbite-react';
import { HiX, HiDocumentText } from 'react-icons/hi';
import { useUserStories } from '../../../contexts/UserStoryContext';
import { useLanguage } from '../../../hooks/useLanguage';
import UserStoryCard from '../../UserStory/UserStoryCard';

const Sidebar = ({ isOpen, onClose }) => {
  const { state } = useUserStories();
  const { t } = useLanguage();

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
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <HiDocumentText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('sidebar.title')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('sidebar.subtitle')}
              </p>
            </div>
          </div>
          <Button
            color="gray"
            size="sm"
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-white/50 dark:hover:bg-gray-800/50 !border-transparent rounded-lg transition-all duration-200"
            aria-label={t('common.close')}
            title={t('common.close')}
          >
            <HiX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        {/* Stories List */}
        <div className="p-6 space-y-3 overflow-y-auto h-full pb-20 bg-gray-50/30 dark:bg-gray-800/30">
          {/* Search/Filter Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('sidebar.search')}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {state.userStories.filter(s => s.status === t('userStory.status.inProgress')).length}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">{t('sidebar.stats.inProgress')}</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {state.userStories.filter(s => s.status === t('userStory.status.completed')).length}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">{t('sidebar.stats.completed')}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-gray-600 dark:text-gray-300">
                {state.userStories.filter(s => s.status === t('userStory.status.pending')).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{t('sidebar.stats.pending')}</div>
            </div>
          </div>

          {/* Stories List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
              {t('sidebar.sections.recent')}
            </h3>
            
            {state.loading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white dark:bg-gray-700 transition ease-in-out duration-150">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading')}
                </div>
              </div>
            )}
            
            {state.error && (
              <div className="text-center py-8">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">{state.error}</p>
                </div>
              </div>
            )}
            
            {state.userStories.map((story) => (
              <UserStoryCard key={story.id} story={story} />
            ))}
            
            {state.userStories.length === 0 && !state.loading && (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HiDocumentText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('sidebar.empty.title')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t('sidebar.empty.description')}
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  {t('sidebar.empty.action')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
