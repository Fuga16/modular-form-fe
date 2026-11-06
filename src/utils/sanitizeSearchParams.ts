import { sanitizePaginationParams } from './sanitizePaginationParams';
import { sanitizeSortParams } from './sanitizeSortParams';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { readFieldFromUrl } from '@/utils/fieldUrl';

export const sanitizeSearchParams = (
  searchParams: URLSearchParams,
  config: FieldConfig[],
) => {
  const params = new URLSearchParams();

  config.forEach((field) => {
    Object.entries(readFieldFromUrl(field, searchParams)).forEach(
      ([key, value]) => {
        if (value) params.set(key, value);
      },
    );
  });

  const { page, pageSize } = sanitizePaginationParams(searchParams);

  params.set('page', page);
  params.set('pageSize', pageSize);

  const sortOrder = sanitizeSortParams(searchParams);

  if (sortOrder) {
    params.set('sortOrder', sortOrder);
  }

  return params;
};
