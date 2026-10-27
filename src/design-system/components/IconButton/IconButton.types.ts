import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Visual emphasis of the icon button. */
export type IconButtonVariant = 'solid' | 'ghost';

/** Size of the icon button. Matches Button sizes. */
export type IconButtonSize = 'sm' | 'md' | 'lg';

/** Props for the IconButton component. */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual emphasis.
   * - `solid`: filled background, for primary icon actions.
   * - `ghost`: transparent, for toolbars and dense layouts.
   * @default 'solid'
   */
  variant?: IconButtonVariant;

  /**
   * Size of the square button. Matches the `Button` size scale.
   * @default 'md'
   */
  size?: IconButtonSize;

  /**
   * Locked state: the button is disabled and shows `lockIcon` instead of its children.
   * Use it when an action is visible but not available to the user.
   */
  locked?: boolean;

  /**
   * Icon rendered when `locked` is true.
   * @default '🔒'
   */
  lockIcon?: ReactNode;

  /**
   * Accessible name is required for icon-only buttons.
   * Declared here so TypeScript enforces it; the DOM still receives it via `aria-label`.
   */
  'aria-label': string;
}
