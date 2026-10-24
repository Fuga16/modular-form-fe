import { useQueryClient } from '@tanstack/react-query'

import { provisionResource } from '@/api/resources'
import { useApiMutation } from '@/hooks/useApiMutation'

export function useProvisionResourceMutation(resourceId: string | undefined) {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: () => provisionResource(resourceId!),

    successMessage: 'Resource provisioned successfully.',

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resource', resourceId],
      })
    },
  })
}
