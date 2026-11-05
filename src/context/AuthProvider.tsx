import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import {
  AUTH_TOKEN_CHANGED_EVENT,
  getAccessToken,
  setAccessToken,
} from '@/api/authState';
import { API_UNAUTHORIZED_EVENT, refreshAccessToken } from '@/api/client';
import {
  type CurrentUser,
  type UserRole,
  getCurrentUser,
  logoutUser,
} from '@/api/resources';
import { AuthContext } from '@/context/AuthContext';
import { queryClient } from '@/lib/react-query';
import { showErrorToast } from '@/utils/toast';

const AUTH_CHANNEL_NAME = 'form-creator-auth';

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const authChannel = useRef<BroadcastChannel | null>(null);
  const [accessToken, setAccessTokenState] = useState(getAccessToken);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isReady, setIsReady] = useState(false);
  const isAuthenticated = Boolean(accessToken);

  const authenticate = useCallback(async (token: string, role: UserRole) => {
    setAccessToken(token);
    setRole(role);

    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setRole(user.role);
    } catch (error) {
      setAccessToken(null);
      setCurrentUser(null);
      setRole(null);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setAccessToken(null);
      setCurrentUser(null);
      setRole(null);
      queryClient.clear();
      navigate('/login', { replace: true });
      authChannel.current?.postMessage('session-ended');
    }
  }, [navigate]);

  const handleUnauthorized = useCallback(() => {
    setAccessToken(null);
    setCurrentUser(null);
    setRole(null);
    queryClient.clear();
    navigate('/login', { replace: true });
    authChannel.current?.postMessage('session-ended');
  }, [navigate]);

  useEffect(() => {
    let active = true;
    const handleTokenChanged = () => {
      const token = getAccessToken();
      setAccessTokenState(token);
      if (!token) {
        setCurrentUser(null);
        setRole(null);
      }
    };
    const handleRemoteLogout = (event: MessageEvent<unknown>) => {
      if (event.data !== 'session-ended') {
        return;
      }

      setAccessToken(null);
      setCurrentUser(null);
      setRole(null);
      queryClient.clear();
      navigate('/login', { replace: true });
    };

    if (typeof BroadcastChannel !== 'undefined') {
      authChannel.current = new BroadcastChannel(AUTH_CHANNEL_NAME);
      authChannel.current.addEventListener('message', handleRemoteLogout);
    }

    window.addEventListener(AUTH_TOKEN_CHANGED_EVENT, handleTokenChanged);
    window.addEventListener(API_UNAUTHORIZED_EVENT, handleUnauthorized);

    refreshAccessToken()
      .then(async (token) => {
        if (token) {
          const user = await getCurrentUser();
          setCurrentUser(user);
          setRole(user.role);
        }
      })
      .catch((error: unknown) => {
        setAccessToken(null);
        setCurrentUser(null);
        setRole(null);
        showErrorToast(error);
      })
      .finally(() => {
        if (active) {
          setAccessTokenState(getAccessToken());
          setIsReady(true);
        }
      });

    return () => {
      active = false;
      authChannel.current?.removeEventListener('message', handleRemoteLogout);
      authChannel.current?.close();
      authChannel.current = null;
      window.removeEventListener(AUTH_TOKEN_CHANGED_EVENT, handleTokenChanged);
      window.removeEventListener(API_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [handleUnauthorized, navigate]);

  const value = useMemo(
    () => ({
      accessToken,
      currentUser,
      role,
      isReady,
      isAuthenticated,
      authenticate,
      logout,
    }),
    [
      accessToken,
      currentUser,
      role,
      isReady,
      isAuthenticated,
      authenticate,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children ?? <Outlet />}
    </AuthContext.Provider>
  );
}
