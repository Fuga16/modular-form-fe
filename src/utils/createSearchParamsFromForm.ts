import { DEFAULT_QUERY_PARAMS } from '@/constants/constants'

export const createSearchParamsFromForm = (data: Record<string, unknown>) => {
  const params = new URLSearchParams()

  params.set('page', String(DEFAULT_QUERY_PARAMS.page))

  params.set('pageSize', String(DEFAULT_QUERY_PARAMS.pageSize))

  Object.entries(data).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.set(key, String(value))
    }
  })

  return params
}
