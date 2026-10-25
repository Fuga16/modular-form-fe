import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '../../design-system';
import { getRequiredRule } from '../../utils/getRequiredRule';

import type { AdapterProps, InputField } from './FormFieldsRenderer.types';

export function InputAdapter({ field }: AdapterProps<InputField>) {
  const { control } = useFormContext();

  const { label, type, name, required, sanitize, rules, tooltip } = field;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: getRequiredRule(required, label),
        pattern: rules
          ? {
              value: rules.pattern,
              message: rules.message,
            }
          : undefined,
      }}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          label={label}
          multiline={type === 'textarea'}
          tooltip={tooltip}
          error={fieldState.error?.message}
          onChange={(e) => {
            const value = sanitize ? sanitize(e.target.value) : e.target.value;

            field.onChange(value);
          }}
        />
      )}
    />
  );
}
