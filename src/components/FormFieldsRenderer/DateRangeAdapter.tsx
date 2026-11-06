import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { DateRangePicker } from '../DateRangePicker';

import type { AdapterProps, DateRangeField } from './FormFieldsRenderer.types';

/**
 * Checks a pair of bounds.
 *
 * Both bounds empty is valid unless the field is required.
 * A single bound is never valid, because a half-open range cannot be applied.
 */
function checkBounds(
  from: string,
  to: string,
  label: string,
  required: boolean,
): true | string {
  if (!from && !to) {
    return required ? `${label} is required` : true;
  }

  if (!from || !to) {
    return 'Select both dates';
  }

  return true;
}

/**
 * Date range field bound to two flat form keys.
 *
 * The `from` controller renders the picker and owns the ref and blur handling.
 * The `to` controller is rendered inside it and only supplies its value and change handler.
 */
export function DateRangeAdapter({ field }: AdapterProps<DateRangeField>) {
  const { control, getValues } = useFormContext();

  const {
    from,
    to,
    label,
    required = false,
    min,
    max,
    tooltip,
    placeholder,
  } = field;

  const fromValue: string = useWatch({ control, name: from }) ?? '';
  const toValue: string = useWatch({ control, name: to }) ?? '';

  return (
    <Controller
      name={from}
      control={control}
      rules={{
        validate: (value: string) =>
          checkBounds(value ?? '', getValues(to) ?? '', label, required),
      }}
      render={({ field: fromField, fieldState }) => (
        <Controller
          name={to}
          control={control}
          render={({ field: toField }) => (
            <DateRangePicker
              ref={fromField.ref}
              label={label}
              value={{ from: fromValue, to: toValue }}
              onChange={(range) => {
                fromField.onChange(range.from);
                toField.onChange(range.to);
              }}
              onBlur={fromField.onBlur}
              min={min}
              max={max}
              tooltip={tooltip}
              placeholder={placeholder}
              error={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
}
