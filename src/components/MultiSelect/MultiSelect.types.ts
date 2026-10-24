export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  label?: string
  tooltip?: string
  helperText?: string
  error?: string
  disabled?: boolean

  options: MultiSelectOption[]

  value: string[]
  onChange: (value: string[]) => void

  placeholder?: string
}
