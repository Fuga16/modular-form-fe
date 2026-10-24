import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './IconButton.module.css';
import type { IconButtonProps, IconButtonSize } from './IconButton.types';

/** Default icon for the locked state. Kept here so it is easy to replace globally. */
const DEFAULT_LOCK_ICON = '🔒';

/**
 * Maps the public size API to CSS module classes.
 * A `Record` makes TypeScript fail if a size is added without a class.
 */
const sizeClassName: Record<IconButtonSize, string> = {
  sm: styles.small,
  md: styles.medium,
  lg: styles.large,
};

/**
 * Compact square button for icon-only actions.
 *
 * Accessibility: `aria-label` is required by the types, because an icon-only
 * button has no visible text for a screen reader to read.
 *
 * `locked` disables the button and replaces its content with `lockIcon`.
 * The original icon is not rendered, so the user only sees the lock state.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = 'solid',
      size = 'md',
      locked = false,
      lockIcon = DEFAULT_LOCK_ICON,
      disabled = false,
      type = 'button',
      className,
      children,
      ...props
    },
    ref,
  ) {
    // A locked button is always disabled, even if `disabled` is not passed.
    const isDisabled = disabled || locked;

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={clsx(
          styles.iconButton,
          styles[variant],
          sizeClassName[size],
          locked && styles.locked,
          className,
        )}
      >
        {locked ? (
          // Decorative: the button's aria-label already describes the action.
          <span
            aria-hidden="true"
            className={styles.lockedIcon}
          >
            {lockIcon}
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);
