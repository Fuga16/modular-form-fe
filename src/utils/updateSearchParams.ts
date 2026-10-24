export const updateSearchParams = (
  searchParams: URLSearchParams,
  updates: Record<string, string>,
) => {
  const params = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, value);
  });

  return params;
};
