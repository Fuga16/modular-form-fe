import type { InputHTMLAttributes } from 'react';

/** Props for the Checkbox component. */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Text label shown next to the checkbox.
   * Required: a checkbox without a label is not accessible.
   */
  label: string;
}
