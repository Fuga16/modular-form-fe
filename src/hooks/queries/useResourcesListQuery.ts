import { useQuery } from '@tanstack/react-query'
import { listResources } from '@/api/resources'
import type { ListResourcesQuery } from '@/api/types'

export function useResourcesListQuery(query: ListResourcesQuery) {
  return useQuery({
    queryKey: ['resources', query],
    queryFn: ({ signal }) => listResources(query, signal),
  })
}
