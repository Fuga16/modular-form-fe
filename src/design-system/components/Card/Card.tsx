import { forwardRef } from 'react';

import clsx from 'clsx';

import styles from './Card.module.css';
import type { CardProps } from './Card.types';

/**
 * Surface container used to group related content and actions.
 *
 * Renders a plain `<div>` with no semantic role. If the card represents a
 * distinct section or a self-contained item, pass the appropriate `role` or
 * wrap it in `<section>` / `<article>` from the consumer side.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'outline', className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(styles.card, styles[variant], className)}
    />
  );
});
