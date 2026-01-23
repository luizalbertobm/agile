// User Story Status - These will be replaced by i18n translations
export const USER_STORY_STATUS = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em progresso',
  COMPLETED: 'Concluído'
};

// User Story Priority - These will be replaced by i18n translations
export const USER_STORY_PRIORITY = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta'
};

// Status value constants (used for filtering and comparisons)
export const STATUS_VALUES = {
  TO_DO: 'to do',
  IN_PROGRESS: 'in progress',
  TO_TEST: 'to test',
  BLOCKED: 'blocked',
  DONE: 'done'
};

// Function to get status options with translations
export const getUserStoryStatusOptions = (t) => [
  { value: STATUS_VALUES.TO_DO, label: t('userStory.status.toDo') },
  { value: STATUS_VALUES.IN_PROGRESS, label: t('userStory.status.inProgress') },
  { value: STATUS_VALUES.TO_TEST, label: t('userStory.status.toTest') },
  { value: STATUS_VALUES.BLOCKED, label: t('userStory.status.blocked') },
  { value: STATUS_VALUES.DONE, label: t('userStory.status.done') }
];

// Deprecated - for backwards compatibility
export const USER_STORY_STATUS_OPTIONS = [
  { value: 'to do', label: 'to do' },
  { value: 'in progress', label: 'in progress' },
  { value: 'to test', label: 'to test' },
  { value: 'blocked', label: 'blocked' },
  { value: 'done', label: 'done' }
];

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'bee-agile-theme',
  LANGUAGE: 'bee-agile-language',
  USER_STORIES: 'bee-agile-user-stories'
};

export const THEME_STORAGE_KEY = 'darkMode'; // Deprecated - use STORAGE_KEYS.THEME

export const SIDEBAR_WIDTH = 320; // w-80 in Tailwind
