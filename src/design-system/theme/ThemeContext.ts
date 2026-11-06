import { createContext } from 'react';

/** Theme chosen by the user. `system` follows the OS setting. */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Theme that is actually applied. */
export type ResolvedTheme = 'light' | 'dark';

/** Value shared through ThemeContext. */
export interface ThemeContextValue {
  /** Theme chosen by the user, including `system`. */
  preference: ThemePreference;
  /** Theme in effect right now. Useful for logic outside CSS. */
  resolvedTheme: ResolvedTheme;
  /** Applies the choice immediately and saves it to localStorage. */
  setTheme: (next: ThemePreference) => void;
}

/** Context for the theme. Read it through `useTheme`, not directly. */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
