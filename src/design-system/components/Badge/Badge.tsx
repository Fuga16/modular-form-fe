import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './Badge.module.css';
import type { BadgeProps } from './Badge.types';

/**
 * Compact status label used to display lightweight semantic state.
 *
 * Renders a `<span>`, so it can sit inside text or next to a button.
 * It does not announce changes by itself; if the status updates dynamically,
 * wrap it in an element with `aria-live`.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', className, ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={clsx(styles.badge, styles[variant], className)}
    />
  );
});
