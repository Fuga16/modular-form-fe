import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for the Button component. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. */
  variant?: ButtonVariant;
  /** Size of the button. */
  size?: ButtonSize;
  /** Stretch the button to the width of its container. */
  block?: boolean;
  /** Locked state: the button is disabled and shows a lock icon. */
  locked?: boolean;
  /** Icon shown when locked. */
  lockIcon?: ReactNode;
  /** Label shown when locked and no children are passed. */
  lockedLabel?: ReactNode;
}