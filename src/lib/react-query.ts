import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { showErrorToast } from '@/utils/toast'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error) {
      showErrorToast(error)
    },
  }),

  mutationCache: new MutationCache({
    onError(error) {
      showErrorToast(error)
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
