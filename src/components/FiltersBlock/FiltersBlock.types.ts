import type { FieldValues } from 'react-hook-form';

import type { FieldConfig } from '../FormFieldsRenderer/FormFieldsRenderer.types';

/** Props for the FiltersBlock component. */
export interface FiltersBlockProps<TValues extends FieldValues = FieldValues> {
  /**
   * Field definitions passed to `FormFieldsRenderer`.
   * Each `name` is a key of the parent form and a query parameter in the URL.
   */
  config: FieldConfig<TValues>[];
}
