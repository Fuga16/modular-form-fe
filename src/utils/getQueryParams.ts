import { getFilterValues } from './getDefaultFilterValues';
import type { ListResourcesQuery, ResourceStatus } from '@/api/types';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { DEFAULT_QUERY_PARAMS } from '@/constants/constants';

const SORT_ORDERS = ['asc', 'desc'] as const;
type SortOrder = (typeof SORT_ORDERS)[number];

const toSortOrder = (value: string | null): SortOrder | undefined =>
  SORT_ORDERS.includes(value as SortOrder) ? (value as SortOrder) : undefined;

const RESOURCE_STATUSES = ['draft', 'completed'] as const;

const toResourceStatus = (value: string): ResourceStatus | undefined =>
  (RESOURCE_STATUSES as readonly string[]).includes(value)
    ? (value as ResourceStatus)
    : undefined;

export const getQueryParams = (
  searchParams: URLSearchParams,
  config: FieldConfig[],
): ListResourcesQuery => {
  const filters = getFilterValues(searchParams, config);
  const page = Number(searchParams.get('page') ?? DEFAULT_QUERY_PARAMS.page);

  const pageSize = Number(
    searchParams.get('pageSize') ?? DEFAULT_QUERY_PARAMS.pageSize,
  );

  return {
    ...filters,
    page: Math.max(1, page),
    pageSize: Math.max(1, pageSize),
    sortOrder: toSortOrder(searchParams.get('sortOrder')),
    status: toResourceStatus(filters.status ?? ''),
  };
};
