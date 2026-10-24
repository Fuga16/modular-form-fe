import { useId } from 'react';

import clsx from 'clsx';

import { Checkbox } from '../Checkbox';

import styles from './CheckboxGroup.module.css';
import type { CheckboxGroupProps } from './CheckboxGroup.types';

/**
 * Checkbox group with optional helper or error text and a label tooltip.
 *
 * Uses `<fieldset>` and `<legend>`, so assistive technologies announce the
 * group name for every checkbox in it. Helper and error text are linked
 * through `aria-describedby`.
 */
export const CheckboxGroup = ({
  label,
  tooltip,
  options,
  value,
  onChange,
  helper,
  error,
  disabled = false,
}: CheckboxGroupProps) => {
  const groupId = useId();
  const messageId = `${groupId}-message`;
  const tooltipId = `${groupId}-tooltip`;

  // Error replaces helper text, so only one message is rendered.
  const message = error ?? helper;
  const hasError = Boolean(error);

  const handleToggle = (option: string) => {
    const next = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];
    onChange(next);
  };

  return (
    <fieldset
      className={styles.group}
      disabled={disabled}
      aria-describedby={message ? messageId : undefined}
    >
      <legend className={styles.legend}>
        <span className={styles.labelRow}>
          {label}
          {tooltip ? (
            // Focusable so keyboard users can read the tooltip too.
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
        </span>
      </legend>

      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option}>
            <Checkbox
              label={option}
              checked={value.includes(option)}
              disabled={disabled}
              onChange={() => handleToggle(option)}
            />
          </li>
        ))}
      </ul>

      {message ? (
        <p
          id={messageId}
          className={clsx(styles.helper, hasError && styles.error)}
        >
          {message}
        </p>
      ) : null}
    </fieldset>
  );
}
