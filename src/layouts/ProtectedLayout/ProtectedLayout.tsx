import { Navigate, Outlet } from 'react-router-dom';

import styles from './ProtectedLayout.module.css';
import { LoadingState } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/design-system';

export function ProtectedLayout() {
  const { isAuthenticated, isReady, logout } = useAuth();

  if (!isReady) {
    return <LoadingState message="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Button
          variant="secondary"
          onClick={logout}
        >
          Log out
        </Button>
      </header>
      <Outlet />
    </>
  );
}
