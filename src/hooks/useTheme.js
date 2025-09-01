import { useState, useEffect } from 'react';
import { themeUtils } from '../utils/storage';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Função para detectar preferência do sistema
  const getSystemPreference = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  useEffect(() => {
    // Primeiro verifica se há preferência salva, senão usa a preferência do sistema
    const storedTheme = themeUtils.getStoredTheme();
    
    let initialTheme;
    if (storedTheme !== null) {
      // Há uma preferência salva
      initialTheme = storedTheme;
    } else {
      // Não há preferência salva, usa a do sistema
      initialTheme = getSystemPreference();
    }
    
    setIsDarkMode(initialTheme);
    themeUtils.applyTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Só salva após a inicialização para não sobrescrever o valor carregado
    if (isInitialized) {
      themeUtils.setStoredTheme(isDarkMode);
      themeUtils.applyTheme(isDarkMode);
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
