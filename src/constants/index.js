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
