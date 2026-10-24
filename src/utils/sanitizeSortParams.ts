export const sanitizeSortParams = (searchParams: URLSearchParams) => {
  const sortOrder = searchParams.get('sortOrder')

  if (sortOrder === 'asc' || sortOrder === 'desc') {
    return sortOrder
  }

  return null
}
