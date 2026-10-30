import type { FieldValues } from 'react-hook-form';

import type { SelectField } from './FormFieldsRenderer.types';

/**
 * Creates a select field config and checks that `defaultValue` is one of the options.
 *
 * The option values are inferred as literal types, so a `defaultValue` outside
 * of them fails to compile. Use it inside a config array to keep the exact types.
 */
export function defineSelectField<
  TValues extends FieldValues,
  const TValue extends string,
>(field: SelectField<TValues, TValue>): SelectField<TValues, TValue> {
  return field;
}
