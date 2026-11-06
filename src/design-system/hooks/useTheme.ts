import { useContext } from 'react';

import { ThemeContext, type ThemeContextValue } from '../theme/ThemeContext';

/**
 * Reads the theme from the nearest ThemeProvider.
 *
 * Throws if used outside the provider, because the value would be meaningless
 * and the error is easier to find here than as a silent fallback.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useTheme must be used inside ThemeProvider.');
  }

  return context;
}
