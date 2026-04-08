import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage('tm-theme', 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return { theme, toggleTheme };
}
