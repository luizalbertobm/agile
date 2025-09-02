import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  HiDocumentText, 
  HiSearch, 
  HiClock, 
  HiCheckCircle, 
  HiExclamationCircle,
  HiPlus
} from 'react-icons/hi';
import { useUserStories } from '../../../contexts/UserStoryContext';
import { useLanguage } from '../../../hooks/useLanguage';

const Sidebar = ({ isOpen, onClose }) => {
  const { state } = useUserStories();
  const { t } = useLanguage();

  // Stats calculation
  const stats = {
    inProgress: state.userStories.filter(s => s.status === t('userStory.status.inProgress')).length,
    completed: state.userStories.filter(s => s.status === t('userStory.status.completed')).length,
    pending: state.userStories.filter(s => s.status === t('userStory.status.pending')).length,
    total: state.userStories.length
  };

  const StatusIcon = ({ status }) => {
    const iconClass = "h-4 w-4";
    
    if (status === t('userStory.status.completed')) {
      return <HiCheckCircle className={`${iconClass} text-green-500`} />;
    } else if (status === t('userStory.status.inProgress')) {
      return <HiClock className={`${iconClass} text-blue-500`} />;
    } else {
      return <HiExclamationCircle className={`${iconClass} text-gray-400`} />;
    }
  };

  const getStatusBadgeVariant = (status) => {
    if (status === t('userStory.status.completed')) return "default";
    if (status === t('userStory.status.inProgress')) return "secondary";
    return "outline";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0">
        <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <HiDocumentText className="h-6 w-6 text-white" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold text-gray-900 dark:text-white text-left">
                {t('sidebar.title')}
              </SheetTitle>
              <SheetDescription className="text-xs text-gray-500 dark:text-gray-400 text-left">
                {t('sidebar.subtitle')}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-4 bg-gray-50/30 dark:bg-gray-800/30 h-full">
          {/* Search Bar */}
          <div className="relative">
            <HiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('sidebar.search')}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center mb-1">
                <HiClock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {t('sidebar.stats.inProgress')}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center mb-1">
                <HiCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{stats.completed}</span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                {t('sidebar.stats.completed')}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-center mb-1">
                <HiExclamationCircle className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">{stats.pending}</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                {t('sidebar.stats.pending')}
              </div>
            </div>
          </div>

          <Separator />

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {t('sidebar.sections.recent')} ({stats.total})
            </h3>
            <Button size="sm" variant="outline" className="h-7 px-2">
              <HiPlus className="h-3 w-3 mr-1" />
              {t('common.create')}
            </Button>
          </div>

          {/* Stories List with ScrollArea */}
          <ScrollArea className="h-[calc(100vh-380px)] pr-4">
            <div className="space-y-3">
              {state.loading && (
                <div className="flex items-center justify-center py-8">
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
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">{state.error}</p>
                </div>
              )}

              {state.userStories.map((story, index) => (
                <div 
                  key={story.id || index}
                  className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <StatusIcon status={story.status} />
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {story.title || `${t('userStory.title')} #${index + 1}`}
                      </h4>
                    </div>
                    <Badge variant={getStatusBadgeVariant(story.status)} className="text-xs">
                      {story.status || t('userStory.status.pending')}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {story.description || story.userStory || 'Como usuário, eu quero...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {story.priority && (
                        <Badge variant="outline" className="text-xs mr-2">
                          {story.priority}
                        </Badge>
                      )}
                      {story.estimate && `${story.estimate} pts`}
                    </span>
                    <span>
                      {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'Hoje'}
                    </span>
                  </div>
                </div>
              ))}

              {state.userStories.length === 0 && !state.loading && (
                <div className="text-center py-12">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <HiDocumentText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t('sidebar.empty.title')}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    {t('sidebar.empty.description')}
                  </p>
                  <Button className="px-4 py-2">
                    <HiPlus className="h-4 w-4 mr-2" />
                    {t('sidebar.empty.action')}
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
