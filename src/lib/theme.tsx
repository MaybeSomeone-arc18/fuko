"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Theme = "light" | "dark" | "funky";

const STORAGE_KEY = "fuko:theme";
const DEFAULT_THEME: Theme = "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // After mount: read saved theme and apply to DOM (client-only, no SSR mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const valid: Theme[] = ["light", "dark", "funky"];
      const resolved = saved && valid.includes(saved) ? saved : DEFAULT_THEME;
      setThemeState(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
