import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  type ResolvedTheme,
  ThemeContext,
  type ThemeContextValue,
  type ThemePreference,
} from './ThemeContext';

/** localStorage key for the saved preference. Also used by the inline script in index.html. */
const STORAGE_KEY = 'theme-preference';

/** Media query that matches when the OS prefers dark colors. */
const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Props for the ThemeProvider component. */
export interface ThemeProviderProps {
  children: ReactNode;
}

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

/** Reads the saved preference. Falls back to `system` if storage is unavailable or the value is invalid. */
function readStoredPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isThemePreference(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/**
 * Sets `data-theme` on the root element.
 * For `system` the attribute is removed, so the media query in tokens.css decides.
 */
function applyPreference(preference: ThemePreference) {
  const root = document.documentElement;

  if (preference === 'system') {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = preference;
  }
}

/**
 * Holds the theme preference for the whole app and keeps `data-theme` in sync.
 *
 * Mount it once, near the root. Only one OS theme listener is attached,
 * no matter how many components read the theme.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] =
    useState<ThemePreference>(readStoredPreference);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    applyPreference(preference);
  }, [preference]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((next: ThemePreference) => {
    setPreference(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage is unavailable (private mode, blocked cookies): the choice lasts for this session.
    }
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedTheme: ResolvedTheme =
      preference === 'system' ? systemTheme : preference;

    return { preference, resolvedTheme, setTheme };
  }, [preference, systemTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
