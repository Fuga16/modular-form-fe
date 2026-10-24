import { useQueryClient } from '@tanstack/react-query'

import { deleteResource } from '@/api/resources'
import { useApiMutation } from '@/hooks/useApiMutation'

export function useDeleteResourceMutation() {
  const queryClient = useQueryClient()

  return useApiMutation({
    mutationFn: deleteResource,

    successMessage: 'Resource deleted successfully.',

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resources'],
      })
    },
  })
}
