import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Função para detectar preferência do sistema
  const getSystemPreference = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Função para aplicar o tema
  const applyTheme = (darkMode) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Primeiro verifica se há preferência salva, senão usa a preferência do sistema
    const storedTheme = getStorageItem(STORAGE_KEYS.THEME);
    
    let initialTheme;
    if (storedTheme !== null) {
      // Há uma preferência salva
      initialTheme = storedTheme === 'true' || storedTheme === true;
    } else {
      // Não há preferência salva, usa a do sistema
      initialTheme = getSystemPreference();
    }
    
    setIsDarkMode(initialTheme);
    applyTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Só salva após a inicialização para não sobrescrever o valor carregado
    if (isInitialized) {
      setStorageItem(STORAGE_KEYS.THEME, isDarkMode);
      applyTheme(isDarkMode);
    }
  }, [isDarkMode, isInitialized]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const setDarkMode = () => setIsDarkMode(true);
  const setLightMode = () => setIsDarkMode(false);

  return { 
    isDarkMode, 
    toggleDarkMode,
    setDarkMode,
    setLightMode
  };
};
