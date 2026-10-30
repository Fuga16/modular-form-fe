import { Controller, useFormContext } from 'react-hook-form';

import type { AdapterProps, SelectField } from './FormFieldsRenderer.types';
import { Select } from '@/design-system';
import { getRequiredRule } from '@/utils/getRequiredRule';

export function SelectAdapter({ field }: AdapterProps<SelectField>) {
  const { control } = useFormContext();

  const { name, label, options, required, defaultValue } = field;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: getRequiredRule(required, label),
      }}
      render={({ field: controllerField, fieldState }) => (
        <Select
          {...controllerField}
          value={controllerField.value ?? ''}
          label={label}
          options={options}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
