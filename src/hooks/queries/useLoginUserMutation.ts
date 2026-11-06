import { useQueryClient } from '@tanstack/react-query';

import { type AuthCredentials, loginUser } from '@/api/resources';
import { useApiMutation } from '@/hooks/useApiMutation';

export function useLoginUserMutation() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (credentials: AuthCredentials) => loginUser(credentials),
    successMessage: 'User logged in successfully.',

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resources'],
      });
    },
  });
}
