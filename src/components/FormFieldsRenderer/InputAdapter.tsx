import type { ChangeEvent } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import type { AdapterProps, InputField } from './FormFieldsRenderer.types';
import { Input } from '@/design-system';
import { getRequiredRule } from '@/utils/getRequiredRule';

/**
 * Renders an `input` or `textarea` field bound to react-hook-form.
 *
 * `sanitize` runs on every change, before the value is written to the form.
 */
export function InputAdapter({ field }: AdapterProps<InputField>) {
  const { control } = useFormContext();

  const { label, type, name, required, sanitize, rules, tooltip, placeholder } =
    field;

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
      render={({ field: controllerField, fieldState }) => {
        const handleChange = (
          event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          const value = sanitize
            ? sanitize(event.target.value)
            : event.target.value;

          controllerField.onChange(value);
        };

        const inputProps = {
          ...controllerField,
          label,
          tooltip,
          placeholder,
          error: fieldState.error?.message,
          onChange: handleChange,
        };

        return type === 'textarea' ? (
          <Input
            multiline
            {...inputProps}
          />
        ) : (
          <Input {...inputProps} />
        );
      }}
    />
  );
}
