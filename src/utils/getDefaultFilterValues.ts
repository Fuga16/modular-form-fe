import { readFieldFromUrl } from './fieldUrl';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';

export const getDefaultFilterValues = (
  searchParams: URLSearchParams,
  config: FieldConfig[],
) =>
  config.reduce<Record<string, string>>(
    (acc, field) => Object.assign(acc, readFieldFromUrl(field, searchParams)),
    {},
  );
