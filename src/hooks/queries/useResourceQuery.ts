import { useQuery } from '@tanstack/react-query';

import { getResource } from '@/api/resources';

export function useResourceQuery(resourceId: string | undefined) {
  return useQuery({
    queryKey: ['resource', resourceId],
    queryFn: ({ signal }) => getResource(resourceId!, signal),
    enabled: !!resourceId,
  });
}
