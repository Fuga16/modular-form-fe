import { useQueryClient } from '@tanstack/react-query';

import { createResource } from '@/api/resources';
import type { CreateResourceFormValues } from '@/components';
import { useApiMutation } from '@/hooks/useApiMutation';

export function useCreateResourceMutation() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (args: CreateResourceFormValues) => createResource(args),
    successMessage: 'Resource created successfully.',

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resources'],
      });
    },
  });
}
