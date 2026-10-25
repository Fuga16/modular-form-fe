import type { ReactNode, SelectHTMLAttributes } from 'react';

/** One option in the select list. */
export interface SelectOption {
  /** Value submitted with the form. */
  value: string;
  /** Text shown to the user. */
  label: string;
}

/** Props for the Select component. */
export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children'
> {
  /** Label shown above the field. */
  label?: string;
  /** Helper text shown below the field. Replaced by `error` when both are set. */
  helperText?: string;
  /** Error message shown below the field. Sets `aria-invalid`. */
  error?: string;
  /** Tooltip text shown from the label icon. */
  tooltip?: string;
  /**
   * Locked state: the select is disabled and shows `lockIcon`.
   * A native select has no read-only mode, so its value is not submitted while locked.
   */
  locked?: boolean;
  /**
   * Icon shown when `locked` is true.
   * @default '🔒'
   */
  lockIcon?: ReactNode;
  /** Options to render. */
  options: readonly SelectOption[];
}
