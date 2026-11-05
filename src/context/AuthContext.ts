import { createContext, useContext } from 'react';

import type { CurrentUser, UserRole } from '@/api/resources';

export interface AuthContextValue {
  accessToken: string | null;
  currentUser: CurrentUser | null;
  role: UserRole | null;
  isReady: boolean;
  isAuthenticated: boolean;
  authenticate: (accessToken: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export function useHasRole(role: UserRole): boolean {
  return useAuth().role === role;
}
