import { patchBasicInfo } from '@/api/resources';
import type { GeneralInfo } from '@/api/types';
import { useApiMutation } from '@/hooks/useApiMutation';

export function usePatchBasicInfoMutation(resourceId: string | undefined) {
  return useApiMutation({
    mutationFn: (payload: GeneralInfo) => patchBasicInfo(resourceId!, payload),

    successMessage: 'General information saved successfully.',
  });
}
