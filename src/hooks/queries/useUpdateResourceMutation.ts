import { useQueryClient } from '@tanstack/react-query';

import { updateResource } from '@/api/resources';
import type { UpdateResourcePayload } from '@/api/types';
import { useApiMutation } from '@/hooks/useApiMutation';

export function useUpdateResourceMutation(resourceId: string | undefined) {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (payload: UpdateResourcePayload) => {
      if (!resourceId) {
        throw new Error('Resource ID is required to update a resource.');
      }

      return updateResource(resourceId, payload);
    },

    successMessage: 'Resource updated successfully.',

    onSuccess: (updated) => {
      queryClient.setQueryData(['resource', resourceId], updated);

      queryClient.invalidateQueries({
        queryKey: ['resources'],
      });
    },
  });
}
