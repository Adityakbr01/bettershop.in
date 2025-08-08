// src/utils/storage.ts

// LocalStorage
export const setLocal = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocal = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const removeLocal = (key: string): void => {
  localStorage.removeItem(key);
};

// SessionStorage
export const setSession = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSession = <T>(key: string): T | null => {
  const value = sessionStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const removeSession = (key: string): void => {
  sessionStorage.removeItem(key);
};
