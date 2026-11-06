/** One selectable option. */
export interface MultiSelectOption {
  /** Value stored in the form array. */
  value: string;
  /** Text shown next to the checkbox and in the trigger. */
  label: string;
}

/** Props for the MultiSelect component. */
export interface MultiSelectProps {
  /** Label shown above the field. */
  label?: string;
  /** Tooltip text shown from the label icon. */
  tooltip?: string;
  /** Helper text shown below the field. Replaced by `error` when both are set. */
  helperText?: string;
  /** Error message shown below the field. Sets `aria-invalid` on the trigger. */
  error?: string;
  /** Disables the trigger. The dropdown cannot open while disabled. */
  disabled?: boolean;
  /** Options to choose from. */
  options: MultiSelectOption[];
  /** Selected option values. */
  value: string[];
  /** Called with the new array of selected values, not with an event. */
  onChange: (value: string[]) => void;
  /**
   * Text shown in the trigger when nothing is selected.
   * @default 'Select options'
   */
  placeholder?: string;
}
