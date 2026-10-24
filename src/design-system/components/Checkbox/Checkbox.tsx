import { forwardRef, useId } from 'react';

import clsx from 'clsx';

import styles from './Checkbox.module.css';
import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox control with a custom visual box and an associated text label.
 *
 * The native `<input>` stays in the DOM and in the tab order, but is visually
 * hidden. The custom box is a sibling element and is styled with
 * `input:checked + .box` and `input:focus-visible + .box`, so keyboard focus
 * and checked state are always in sync with the real input.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, id, className, ...props }, ref) {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;

    return (
      <div className={clsx(styles.wrapper, className)}>
        <input
          {...props}
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={styles.input}
        />
        {/* Decorative: the label below provides the accessible name. */}
        <span
          aria-hidden="true"
          className={styles.box}
        />
        <label
          htmlFor={checkboxId}
          className={styles.label}
        >
          {label}
        </label>
      </div>
    );
  },
);
