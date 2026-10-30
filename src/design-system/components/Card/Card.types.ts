import type { HTMLAttributes } from 'react';

/**
 * Visual style of the card surface.
 * - `outline`: flat surface with a border, the default for most content.
 * - `elevated`: surface with a shadow, for content that should stand out from the page.
 */
export type CardVariant = 'outline' | 'elevated';

/** Props for the Card component. */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style of the card.
   * @default 'outline'
   */
  variant?: CardVariant;
}
