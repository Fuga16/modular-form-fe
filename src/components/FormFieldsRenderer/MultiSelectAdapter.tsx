import { Controller, useFormContext } from 'react-hook-form';

import { MultiSelect } from '../MultiSelect/MultiSelect';

import type {
  AdapterProps,
  MultiSelectField,
} from './FormFieldsRenderer.types';

export function MultiSelectAdapter({ field }: AdapterProps<MultiSelectField>) {
  const { control } = useFormContext();

  const { name, label, options, tooltip } = field;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState }) => (
        <MultiSelect
          label={label}
          tooltip={tooltip}
          options={options}
          value={field.value ?? []}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
