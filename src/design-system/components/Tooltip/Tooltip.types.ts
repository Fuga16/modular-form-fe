import type { ReactNode } from 'react';

/** Props for the Tooltip component. */
export interface TooltipProps {
  /** Text shown in the tooltip. Also linked to the trigger for screen readers. */
  content: string;
  /**
   * Custom trigger element. If omitted, a round "i" icon is rendered.
   * The trigger is wrapped in a focusable element, so keyboard users can reach the tooltip.
   */
  children?: ReactNode;
  /** Extra class for the trigger wrapper. */
  className?: string;
}
