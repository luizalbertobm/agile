import { useState } from 'react';
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
} from '@/components/ui/sheet';
import { 
  HiDocumentText, 
  HiSearch, 
  HiClock, 
  HiCheckCircle, 
  HiExclamationCircle,
  HiPlus
} from 'react-icons/hi';
import { useLanguage } from '../../../hooks/useLanguage';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demo purposes - in a real app this would come from local storage or API
  const mockStories = [
    {
      id: 1,
      title: "Login do usuário",
      description: "Como usuário, eu quero fazer login no sistema para acessar funcionalidades personalizadas",
      status: t('userStory.status.completed'),
      priority: "Alta",
      estimate: "5",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Dashboard principal",
      description: "Como administrador, eu quero visualizar um dashboard com métricas importantes",
      status: t('userStory.status.inProgress'),
      priority: "Média",
      estimate: "8",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Relatórios personalizados",
      description: "Como gerente, eu quero gerar relatórios personalizados para análise de dados",
      status: t('userStory.status.pending'),
      priority: "Baixa",
      estimate: "13",
      createdAt: new Date().toISOString()
    }
  ];

  // Filter stories based on search term
  const filteredStories = mockStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats calculation
  const stats = {
    inProgress: mockStories.filter(s => s.status === t('userStory.status.inProgress')).length,
    completed: mockStories.filter(s => s.status === t('userStory.status.completed')).length,
    pending: mockStories.filter(s => s.status === t('userStory.status.pending')).length,
    total: mockStories.length
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {t('sidebar.sections.recent')} ({filteredStories.length})
            </h3>
            <Button size="sm" variant="outline" className="h-7 px-2">
              <HiPlus className="h-3 w-3 mr-1" />
              {t('common.create')}
            </Button>
          </div>

          {/* Stories List with ScrollArea */}
          <ScrollArea className="h-[calc(100vh-380px)] pr-4">
            <div className="space-y-3">
              {filteredStories.map((story, index) => (
                <div 
                  key={story.id || index}
                  className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <StatusIcon status={story.status} />
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {story.title}
                      </h4>
                    </div>
                    <Badge variant={getStatusBadgeVariant(story.status)} className="text-xs">
                      {story.status}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {story.description}
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

              {mockStories.length === 0 && (
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
