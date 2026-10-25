import { DEFAULT_QUERY_PARAMS } from '../constants/constants';

/**
 * Builds the query string for a filter search.
 *
 * Starts from the current URL, so parameters that are not filter fields
 * (for example `sort`) are kept. Submitted filter fields replace their previous
 * values, empty fields are removed, and pagination restarts from the first page.
 * Without `currentParams` the result contains only the filter values and pagination.
 */
export const createSearchParamsFromForm = (
  data: Record<string, unknown>,
  currentParams: URLSearchParams = new URLSearchParams(),
) => {
  const params = new URLSearchParams(currentParams);

  Object.keys(data).forEach((key) => params.delete(key));
  params.delete('page');
  params.delete('pageSize');

  params.set('page', String(DEFAULT_QUERY_PARAMS.page));
  params.set('pageSize', String(DEFAULT_QUERY_PARAMS.pageSize));

  Object.entries(data).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params;
};
