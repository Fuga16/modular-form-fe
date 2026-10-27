import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';

export const getFilterValues = (
  searchParams: URLSearchParams,
  config: FieldConfig[],
) => {
  return config.reduce(
    (acc, filter) => {
      const value = searchParams.get(filter.name) ?? '';

      acc[filter.name] =
        'sanitize' in filter && filter.sanitize
          ? filter.sanitize(value)
          : value;

      return acc;
    },
    {} as Record<string, string>,
  );
};
