import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';
import { useAuth } from '@/context/AuthContext';
import { Button, Input } from '@/design-system';
import { useLoginUserMutation } from '@/hooks/queries/useLoginUserMutation';

export function LoginPage() {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const loginMutation = useLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginMutation.isPending) {
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: async (authResponse) => {
          await authenticate(authResponse.accessToken, authResponse.role);
          navigate('/resources', { replace: true });
        },
      },
    );
  };

  return (
    <main className={styles.page}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-labelledby="login-title"
      >
        <h1
          id="login-title"
          className={styles.title}
        >
          Log in
        </h1>

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={loginMutation.isPending}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={loginMutation.isPending}
        />

        {loginMutation.isError ? (
          <p
            className={styles.error}
            role="alert"
          >
            {loginMutation.error.message ||
              'Unable to log in. Please try again.'}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          block
        >
          {loginMutation.isPending ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </main>
  );
}
