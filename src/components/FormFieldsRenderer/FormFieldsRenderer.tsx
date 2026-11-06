import type { FieldValues } from 'react-hook-form';

import { DateRangeAdapter } from './DateRangeAdapter';
import type { FormFieldsRendererProps } from './FormFieldsRenderer.types';
import { InputAdapter } from './InputAdapter';
import { MultiSelectAdapter } from './MultiSelectAdapter';
import { SelectAdapter } from './SelectAdapter';

/**
 * Renders fields from a config, one adapter per field type.
 *
 * The switch is exhaustive: a new field type without a case fails to compile
 * at the `never` check, so no field can be silently skipped.
 */
export function FormFieldsRenderer<TValues extends FieldValues = FieldValues>({
  config,
}: FormFieldsRendererProps<TValues>) {
  return (
    <>
      {config.map((field) => {
        switch (field.type) {
          case 'input':
          case 'textarea':
            return (
              <InputAdapter
                key={field.name}
                field={field}
              />
            );
          case 'select':
            return (
              <SelectAdapter
                key={field.name}
                field={field}
              />
            );
          case 'multiselect':
            return (
              <MultiSelectAdapter
                key={field.name}
                field={field}
              />
            );
          case 'daterange':
            return (
              <DateRangeAdapter
                key={field.from}
                field={field}
              />
            );
          default: {
            const unhandled: never = field;
            return unhandled;
          }
        }
      })}
    </>
  );
}
