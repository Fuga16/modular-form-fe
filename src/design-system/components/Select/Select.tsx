import { forwardRef, useId } from 'react';

import clsx from 'clsx';

import { Tooltip } from '../Tooltip';

import styles from './Select.module.css';
import type { SelectProps } from './Select.types';

/** Default icon for the locked state. */
const DEFAULT_LOCK_ICON = '🔒';

/**
 * Select field with label, helper or error text, tooltip, and locked state.
 *
 * Helper and error text are linked to the control with `aria-describedby`.
 * `aria-invalid` reflects the presence of `error`.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      helperText,
      error,
      tooltip,
      locked = false,
      lockIcon = DEFAULT_LOCK_ICON,
      options,
      disabled = false,
      id,
      className,
      ...selectProps
    },
    ref,
  ) {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const helpId = `${controlId}-help`;

    // Error replaces helper text, so only one message is rendered.
    const message = error ?? helperText;
    const hasError = Boolean(error);

    // Locked is disabled for a native select (see the types comment).
    const isDisabled = disabled || locked;

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
            {tooltip ? <Tooltip content={tooltip} /> : null}
          </div>
        ) : null}

        <div className={styles.shell}>
          <select
            {...selectProps}
            ref={ref}
            id={controlId}
            disabled={isDisabled}
            aria-invalid={hasError}
            aria-describedby={message ? helpId : undefined}
            className={clsx(styles.control, locked && styles.locked)}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Decorative arrow: the native select already exposes its state. */}
          <span
            aria-hidden="true"
            className={clsx(styles.chevron, locked && styles.chevronWithLock)}
          />

          {locked ? (
            <span
              aria-hidden="true"
              className={styles.lockIcon}
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
  },
);
