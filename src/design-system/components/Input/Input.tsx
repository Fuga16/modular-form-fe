import {
  type InputHTMLAttributes,
  type Ref,
  type TextareaHTMLAttributes,
  forwardRef,
  useId,
} from 'react';

import clsx from 'clsx';

import styles from './Input.module.css';
import type { InputProps } from './Input.types';

/** Default icon for the locked state. */
const DEFAULT_LOCK_ICON = '🔒';

/** Default visible rows for multiline fields. */
const DEFAULT_ROWS = 4;

/**
 * Text input or textarea with label, helper or error text, tooltip, and locked state.
 *
 * Helper and error text are linked to the control with `aria-describedby`.
 * `aria-invalid` reflects the presence of `error`.
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(function Input(props, ref) {
  const {
    label,
    helperText,
    error,
    tooltip,
    locked = false,
    lockIcon = DEFAULT_LOCK_ICON,
    disabled = false,
    id,
    className,
    multiline = false,
    ...controlProps
  } = props;

  const generatedId = useId();
  const controlId = id ?? generatedId;
  const helpId = `${controlId}-help`;
  const tooltipId = `${controlId}-tooltip`;

  // Error replaces helper text, so only one message is rendered.
  const message = error ?? helperText;
  const hasError = Boolean(error);

  const controlClassName = clsx(
    styles.control,
    multiline && styles.textarea,
    locked && styles.locked,
    locked && styles.hasLockIcon,
  );

  // Shared attributes for both native elements.
  const sharedAttributes = {
    id: controlId,
    disabled,
    readOnly: locked,
    'aria-invalid': hasError,
    'aria-describedby': message ? helpId : undefined,
    className: controlClassName,
  };

  // forwardRef cannot narrow the element type by `multiline`, so the ref
  // and the remaining props are cast in each branch. The branch itself
  // guarantees the correct type.
  const control = multiline ? (
    <textarea
      rows={DEFAULT_ROWS}
      {...(controlProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      {...sharedAttributes}
      ref={ref as Ref<HTMLTextAreaElement>}
    />
  ) : (
    <input
      {...(controlProps as InputHTMLAttributes<HTMLInputElement>)}
      {...sharedAttributes}
      ref={ref as Ref<HTMLInputElement>}
    />
  );

  return (
    <div className={clsx(styles.field, className)}>
      {label ? (
        <div className={styles.labelRow}>
          <label
            htmlFor={controlId}
            className={styles.label}
          >
            {label}
          </label>
          {tooltip ? (
            <span
              className={styles.tooltipTrigger}
              tabIndex={0}
              aria-describedby={tooltipId}
            >
              <span aria-hidden="true">i</span>
              <span
                id={tooltipId}
                role="tooltip"
                className={styles.tooltipContent}
              >
                {tooltip}
              </span>
            </span>
          ) : null}
        </div>
      ) : null}

      <div className={styles.shell}>
        {control}
        {locked ? (
          // Decorative: the locked state is already exposed via `readOnly`.
          <span
            aria-hidden="true"
            className={clsx(styles.lockIcon, multiline && styles.lockIconTop)}
          >
            {lockIcon}
          </span>
        ) : null}
      </div>

      {message ? (
        <p
          id={helpId}
          className={clsx(styles.helper, hasError && styles.helperError)}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
});
