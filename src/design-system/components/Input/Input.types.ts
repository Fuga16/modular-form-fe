import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

/** Props shared by single-line and multiline fields. */
interface InputBaseProps {
  /** Label shown above the field. */
  label?: string;
  /** Helper text shown below the field. Replaced by `error` when both are set. */
  helperText?: string;
  /** Error message shown below the field. Sets `aria-invalid`. */
  error?: string;
  /** Tooltip text shown from the label icon. */
  tooltip?: string;
  /**
   * Locked state: the field is read-only and shows `lockIcon`.
   * Unlike `disabled`, a locked field stays focusable and its value is still submitted.
   */
  locked?: boolean;
  /**
   * Icon shown when `locked` is true.
   * @default '🔒'
   */
  lockIcon?: ReactNode;
}

/** Single-line text field. */
export interface InputFieldProps
  extends InputBaseProps, InputHTMLAttributes<HTMLInputElement> {
  /** Render a single-line `<input>`. */
  multiline?: false;
}

/** Multiline text field rendered as a `<textarea>`. */
export interface TextareaFieldProps
  extends InputBaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Render a multiline `<textarea>`. */
  multiline: true;
}

/**
 * Input props. `multiline` decides which native element is rendered,
 * so textarea-only props like `rows` are allowed only when `multiline` is true.
 */
export type InputProps = InputFieldProps | TextareaFieldProps;
