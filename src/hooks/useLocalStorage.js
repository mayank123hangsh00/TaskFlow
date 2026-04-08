import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: Could not read key "${key}"`, err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.warn(`useLocalStorage: Could not set key "${key}"`, err);
    }
  };

  useEffect(() => {
    const handleStorageEvent = (e) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch {
          // ignore parse errors
        }
      }
    };
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
