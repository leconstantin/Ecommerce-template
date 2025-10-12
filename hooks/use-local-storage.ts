/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    // Generate initial default (safe fallback)
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  // On client mount, read from localStorage and override
  useEffect(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      if (jsonValue != null) {
        setValue(JSON.parse(jsonValue) as T);
      }
    } catch (err) {
      console.warn("useLocalStorage read error:", err);
    }
  }, [key]);

  // Sync to localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("useLocalStorage write error:", err);
    }
  }, [key, value]);

  return [value, setValue];
}
