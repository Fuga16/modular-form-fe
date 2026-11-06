import type { FieldValues } from 'react-hook-form';

import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { parseIsoDate, toIsoDate } from '@/design-system/components/Calendar';

type AnyField = FieldConfig<FieldValues>;

/** Returns true only for a canonical `YYYY-MM-DD` string, so each date has one URL form. */
export function isCanonicalIsoDate(
  value: string | null | undefined,
): value is string {
  if (!value) return false;

  const parsed = parseIsoDate(value);

  return parsed !== null && toIsoDate(parsed) === value;
}

/** Returns the value when it is a canonical date, otherwise an empty string. */
function canonicalOrEmpty(value: string | null): string {
  return isCanonicalIsoDate(value) ? value : '';
}

/**
 * Returns every form and URL key a field occupies.
 * A date range occupies two keys, every other field occupies its `name`.
 */
export function getFieldKeys(field: AnyField): string[] {
  if (field.type === 'daterange') {
    return [field.from, field.to];
  }

  return [field.name];
}

/**
 * Reads a field's values from the URL, keyed by form key.
 *
 * Date bounds that are not canonical dates become `''`.
 * Other values pass through `sanitize` when the field defines it.
 */
export function readFieldFromUrl(
  field: AnyField,
  params: URLSearchParams,
): Record<string, string> {
  if (field.type === 'daterange') {
    return {
      [field.from]: canonicalOrEmpty(params.get(field.from)),
      [field.to]: canonicalOrEmpty(params.get(field.to)),
    };
  }

  const raw = params.get(field.name) ?? '';
  const sanitized =
    'sanitize' in field && field.sanitize ? field.sanitize(raw) : raw;

  return { [field.name]: sanitized };
}
