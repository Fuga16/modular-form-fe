import { Controller, useFormContext } from 'react-hook-form'

import { Select } from '@/design-system'

import { getRequiredRule } from '@/utils/getRequiredRule'

import type { AdapterProps, SelectField } from './FormFieldsRenderer.types'

export function SelectAdapter({ field }: AdapterProps<SelectField>) {
  const { control } = useFormContext()

  const { name, label, options, required } = field

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: getRequiredRule(required, label),
      }}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          label={label}
          options={options}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
