import type { ReactNode } from 'react';

import type { DateRange } from '@/design-system/components/Calendar';

/** Size of the field. Matches the other form controls. */
export type DateRangePickerSize = 'sm' | 'md' | 'lg';

/** Props for the DateRangePicker component. */
export interface DateRangePickerProps {
  /** Label shown above the field. */
  label?: string;
  /**
   * Selected range. Empty strings mean the bound is not set.
   * Dates are stored as `YYYY-MM-DD` strings.
   */
  value: DateRange;
  /**
   * Called with the new range once both dates are picked, or with an empty range when cleared.
   * Partial selections are kept inside the popup and are not reported.
   */
  onChange: (value: DateRange) => void;
  /** Called when the trigger loses focus. Passed through by react-hook-form. */
  onBlur?: () => void;
  /** Name of the field, used by forms. */
  name?: string;
  /** Earliest selectable date, `YYYY-MM-DD`. Earlier days are shown but disabled. */
  min?: string;
  /** Latest selectable date, `YYYY-MM-DD`. Later days are shown but disabled. */
  max?: string;
  /**
   * Text shown in the trigger when nothing is selected.
   * @default 'Select dates'
   */
  placeholder?: string;
  /** Helper text shown below the field. Replaced by `error` when both are set. */
  helperText?: string;
  /** Error message shown below the field. Sets `aria-invalid`. */
  error?: string;
  /** Tooltip text shown from the label icon. */
  tooltip?: string;
  /**
   * Locked state: the popup cannot be opened and the field shows `lockIcon`.
   * The value stays visible and is still submitted with the form.
   * @default false
   */
  locked?: boolean;
  /**
   * Icon shown when `locked` is true.
   * @default '🔒'
   */
  lockIcon?: ReactNode;
  /**
   * Disables the field. The popup cannot be opened.
   * @default false
   */
  disabled?: boolean;
  /**
   * Size of the field.
   * @default 'md'
   */
  size?: DateRangePickerSize;
  /** Id of the trigger input. Generated when omitted. */
  id?: string;
  /** Extra class for the root element. */
  className?: string;
}
