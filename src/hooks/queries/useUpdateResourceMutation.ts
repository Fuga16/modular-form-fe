import { useQueryClient } from '@tanstack/react-query';

import { updateResource } from '@/api/resources';
import type { ResourcePayload } from '@/api/types';
import { useApiMutation } from '@/hooks/useApiMutation';

export function useUpdateResourceMutation(resourceId: string | undefined) {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (payload: ResourcePayload) =>
      updateResource(resourceId!, payload),

    successMessage: 'Resource updated successfully.',

    onSuccess: (updated) => {
      queryClient.setQueryData(['resource', resourceId], updated);
    },
  });
}
