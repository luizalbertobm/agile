import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MarkdownPreviewer } from '@/components/ui/MarkdownPreviewer';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { 
  HiDocumentText, 
  HiSearch, 
  HiClock, 
  HiCheckCircle, 
  HiExclamationCircle,
  HiPlus,
  HiX
} from 'react-icons/hi';
import { useLanguage } from '../../../hooks/useLanguage';
import { STATUS_VALUES, getUserStoryStatusOptions } from '../../../constants';

const Sidebar = ({ isOpen, onClose, stories = [], onUpdateStoryStatus }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);

  // Get status options with translations
  const statusOptions = useMemo(() => getUserStoryStatusOptions(t), [t]);

  // Function to get translated status label
  const getStatusLabel = (statusValue) => {
    const option = statusOptions.find(opt => opt.value === statusValue);
    return option ? option.label : statusValue;
  };

  // Filter stories based on search term
  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats calculation
  const stats = useMemo(() => ({
    inProgress: stories.filter(s => s.status === STATUS_VALUES.IN_PROGRESS).length,
    completed: stories.filter(s => s.status === STATUS_VALUES.DONE).length,
    pending: stories.filter(s => s.status === STATUS_VALUES.TO_DO).length,
    total: stories.length
  }), [stories]);

  const StatusIcon = ({ status }) => {
    const iconClass = "h-4 w-4";
    
    if (status === STATUS_VALUES.DONE) {
      return <HiCheckCircle className={`${iconClass} text-green-500`} />;
    }
    if (status === STATUS_VALUES.IN_PROGRESS) {
      return <HiClock className={`${iconClass} text-blue-500`} />;
    }
    if (status === STATUS_VALUES.BLOCKED) {
      return <HiExclamationCircle className={`${iconClass} text-red-500`} />;
    }
    if (status === STATUS_VALUES.TO_TEST) {
      return <HiCheckCircle className={`${iconClass} text-purple-500`} />;
    }
    return <HiDocumentText className={`${iconClass} text-gray-500`} />;
  };

  const getStatusBadgeVariant = (status) => {
    if (status === STATUS_VALUES.DONE) return "default";
    if (status === STATUS_VALUES.IN_PROGRESS) return "secondary";
    if (status === STATUS_VALUES.BLOCKED) return "destructive";
    return "outline";
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  const handleStatusChange = (status) => {
    if (!selectedStory) return;
    const updatedStory = { ...selectedStory, status };
    setSelectedStory(updatedStory);
    onUpdateStoryStatus?.(selectedStory.id, status);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[350px] sm:w-[400px] md:w-[540px] p-0">
        <SheetHeader className="p-4 sm:p-6 pb-3 sm:pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <HiDocumentText className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <SheetTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-left">
                {t('sidebar.title')}
              </SheetTitle>
              <SheetDescription className="text-xs text-gray-500 dark:text-gray-400 text-left">
                {t('sidebar.subtitle')}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50/30 dark:bg-gray-800/30 h-full">
          {/* Search Bar */}
          <div className="relative">
            <HiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={t('sidebar.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-2 sm:p-3 text-center border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center mb-1">
                <HiClock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mr-1" />
                <span className="text-sm sm:text-lg font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {t('sidebar.stats.inProgress')}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-2 sm:p-3 text-center border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center mb-1">
                <HiCheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                <span className="text-sm sm:text-lg font-bold text-green-600 dark:text-green-400">{stats.completed}</span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                {t('sidebar.stats.completed')}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-2 sm:p-3 text-center border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-center mb-1">
                <HiExclamationCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1" />
                <span className="text-sm sm:text-lg font-bold text-gray-600 dark:text-gray-300">{stats.pending}</span>
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
              {t('sidebar.sections.recent')} ({filteredStories.length})
            </h3>
            <Button size="sm" variant="outline" className="h-6 sm:h-7 px-2 text-xs">
              <HiPlus className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">{t('common.create')}</span>
            </Button>
          </div>

          {/* Stories List with ScrollArea */}
          <ScrollArea className="h-[calc(100vh-320px)] sm:h-[calc(100vh-380px)] pr-2 sm:pr-4">
            <div className="space-y-2 sm:space-y-3">
              {filteredStories.map((story, index) => (
                <div 
                  key={story.id || index}
                  className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => handleStoryClick(story)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <StatusIcon status={story.status} />
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {story.title}
                      </h4>
                    </div>
                    <Badge variant={getStatusBadgeVariant(story.status)} className="text-xs flex-shrink-0 ml-2">
                      {getStatusLabel(story.status)}
                    </Badge>
                  </div>
                  
                  {story.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {story.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 flex-wrap gap-1">
                    <div className="flex items-center space-x-1">
                      {story.priority && (
                        <Badge variant="outline" className="text-xs">
                          {story.priority}
                        </Badge>
                      )}
                      {story.estimate && <span>{story.estimate} pts</span>}
                    </div>
                    <span className="text-xs">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}

              {filteredStories.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Nenhuma história encontrada para "{searchTerm}"
                  </p>
                </div>
              )}

              {stories.length === 0 && (
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

      {selectedStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedStory.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(selectedStory.createdAt).toLocaleString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseModal} aria-label="Close">
                <HiX className="h-5 w-5" />
              </Button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </span>
                  <Badge variant={getStatusBadgeVariant(selectedStory.status)}>
                    {getStatusLabel(selectedStory.status)}
                  </Badge>
                </div>
                <div className="min-w-[220px]">
                  <Select value={selectedStory.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <MarkdownPreviewer
                markdown={selectedStory.markdown}
                title={t('userStory.preview.title')}
                showCopyButton
                showToggleButton
              />
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
};

export default Sidebar;
