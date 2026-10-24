import { patchProjectDetails } from '@/api/resources'
import type { ProjectDetails } from '@/api/types'

import { useApiMutation } from '@/hooks/useApiMutation'

export function usePatchProjectDetailsMutation(resourceId: string | undefined) {
  return useApiMutation({
    mutationFn: (payload: ProjectDetails) => patchProjectDetails(resourceId!, payload),

    successMessage: 'Project details saved successfully.',
  })
}
