import { useId } from 'react';

import clsx from 'clsx';

import styles from './Tooltip.module.css';
import type { TooltipProps } from './Tooltip.types';

/**
 * Hint shown on hover or keyboard focus.
 *
 * The tooltip text is linked to the trigger with `aria-describedby`, so it is
 * announced when the trigger receives focus. The text is rendered in the DOM
 * even when hidden, which is what makes the link work.
 *
 * Shown with CSS only (`:hover` and `:focus-visible`). It does not close on Escape
 * and does not reposition near viewport edges. Add those when a case needs them.
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  const tooltipId = useId();

  return (
    <span
      className={clsx(styles.trigger, className)}
      tabIndex={0}
      aria-describedby={tooltipId}
    >
      {children ?? (
        // Decorative: the text is announced through aria-describedby.
        <span
          aria-hidden="true"
          className={styles.icon}
        >
          i
        </span>
      )}
      <span
        id={tooltipId}
        role="tooltip"
        className={styles.content}
      >
        {content}
      </span>
    </span>
  );
}
