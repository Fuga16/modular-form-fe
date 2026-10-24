import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './Button.module.css';
import type { ButtonProps, ButtonSize } from './Button.types';

const DEFAULT_LOCK_ICON = '🔒';

const sizeClassName: Record<ButtonSize, string> = {
  sm: styles.small,
  md: styles.medium,
  lg: styles.large,
};

/**
 * Design-system button with variant, size, block layout and locked state.
 * Locked buttons are disabled and render a lock icon before the label.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      block = false,
      locked = false,
      lockIcon = DEFAULT_LOCK_ICON,
      lockedLabel = 'Locked',
      disabled = false,
      type = 'button',
      className,
      children,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || locked;

    const content = locked ? (
      <>
        <span
          aria-hidden="true"
          className={styles.lockedIcon}
        >
          {lockIcon}
        </span>
        <span>{children ?? lockedLabel}</span>
      </>
    ) : (
      children
    );

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={clsx(
          styles.button,
          styles[variant],
          sizeClassName[size],
          locked && styles.locked,
          block && styles.fullWidth,
          className,
        )}
      >
        {content}
      </button>
    );
  },
);
