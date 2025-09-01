import { useState, useEffect } from 'react';
import { themeUtils } from '../utils/storage';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para detectar preferência do sistema
  const getSystemPreference = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  useEffect(() => {
    // Primeiro verifica se há preferência salva, senão usa a preferência do sistema
    const storedTheme = themeUtils.getStoredTheme();
    const initialTheme = storedTheme !== null ? storedTheme : getSystemPreference();
    
    setIsDarkMode(initialTheme);
    themeUtils.applyTheme(initialTheme);
    
    // Salva a preferência inicial se não havia uma salva
    if (storedTheme === null) {
      themeUtils.setStoredTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    themeUtils.setStoredTheme(isDarkMode);
    themeUtils.applyTheme(isDarkMode);
  }, [isDarkMode]);

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
