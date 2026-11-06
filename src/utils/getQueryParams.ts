import { getDefaultFilterValues } from './getDefaultFilterValues';
import { type ListResourcesQuery, ResourceStatus } from '@/api/types';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { DEFAULT_QUERY_PARAMS } from '@/constants/constants';

const SORT_ORDERS = ['asc', 'desc'] as const;
type SortOrder = (typeof SORT_ORDERS)[number];

const toSortOrder = (value: string | null): SortOrder | undefined =>
  SORT_ORDERS.includes(value as SortOrder) ? (value as SortOrder) : undefined;

const toResourceStatus = (value: string): ResourceStatus | undefined =>
  ResourceStatus?.[value as keyof typeof ResourceStatus]
    ? (value as ResourceStatus)
    : undefined;

/**
 * Builds the query for the resources list request.
 *
 * `daterange` fields are sent as their two URL keys, so the API receives
 * `periodFrom` and `periodTo`, not a nested object.
 */
export const getQueryParams = (
  searchParams: URLSearchParams,
  config: FieldConfig[],
): ListResourcesQuery => {
  const formValues = getDefaultFilterValues(searchParams, config);
  const page = Number(searchParams.get('page') ?? DEFAULT_QUERY_PARAMS.page);
  const pageSize = Number(
    searchParams.get('pageSize') ?? DEFAULT_QUERY_PARAMS.pageSize,
  );

  return {
    ...formValues,
    page: Math.max(1, page),
    pageSize: Math.max(1, pageSize),
    sortOrder: toSortOrder(searchParams.get('sortOrder')),
    status: toResourceStatus(formValues.status ?? ''),
  };
};
