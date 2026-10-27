import { patchBasicInfo } from '@/api/resources';
import type { BasicInfo } from '@/api/types';
import { useApiMutation } from '@/hooks/useApiMutation';

export function usePatchBasicInfoMutation(resourceId: string | undefined) {
  return useApiMutation({
    mutationFn: (payload: BasicInfo) => patchBasicInfo(resourceId!, payload),

    successMessage: 'Basic information saved successfully.',
  });
}
