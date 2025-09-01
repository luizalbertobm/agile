import { memo } from 'react';

const UserStoryCard = memo(({ story, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Em progresso':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div
      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick?.(story)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(story);
        }
      }}
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
        {story.title}
      </h3>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
          {story.status}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(story.priority)}`}>
          {story.priority}
        </span>
      </div>
    </div>
  );
});

UserStoryCard.displayName = 'UserStoryCard';

export default UserStoryCard;
