import { DEFAULT_QUERY_PARAMS } from '@/constants/constants'

export const sanitizePaginationParams = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get('page'))
  const pageSize = Number(searchParams.get('pageSize'))

  return {
    page: Number.isFinite(page) && page > 0 ? String(page) : DEFAULT_QUERY_PARAMS.page,

    pageSize:
      Number.isFinite(pageSize) && pageSize > 0
        ? String(pageSize)
        : DEFAULT_QUERY_PARAMS.pageSize,
  }
}
