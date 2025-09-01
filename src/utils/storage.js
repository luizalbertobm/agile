import { THEME_STORAGE_KEY } from '../constants';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }
};

export const themeUtils = {
  getStoredTheme: () => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === null) return null;
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return null;
    }
  },
  setStoredTheme: (isDark) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  },
  applyTheme: (isDark) => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
};
