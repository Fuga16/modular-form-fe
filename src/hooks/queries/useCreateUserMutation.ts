import { useQueryClient } from '@tanstack/react-query';

import { type AuthCredentials, createUser } from '@/api/resources';
import { useAuth } from '@/context/AuthContext';
import { useApiMutation } from '@/hooks/useApiMutation';

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const { authenticate } = useAuth();

  return useApiMutation({
    mutationFn: (credentials: AuthCredentials) => createUser(credentials),
    successMessage: 'User created successfully.',

    onSuccess: (authResponse) => {
      authenticate(authResponse.accessToken, 'USER');
      queryClient.invalidateQueries({
        queryKey: ['resources'],
      });
    },
  });
}
