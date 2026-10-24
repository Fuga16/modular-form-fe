import type { HTMLAttributes } from 'react';

/**
 * Semantic meaning of the badge.
 * - `neutral`: default, no special meaning.
 * - `info`: informational status.
 * - `success`: completed or healthy state.
 * - `warning`: needs attention, not an error.
 */
export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning';

/** Props for the Badge component. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic variant that sets background and text colors.
   * @default 'neutral'
   */
  variant?: BadgeVariant;
}
