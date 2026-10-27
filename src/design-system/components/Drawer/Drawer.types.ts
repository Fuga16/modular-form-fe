import type { ReactNode } from 'react';

/**
 * Width of the drawer panel.
 * - `sm`: 20rem, for short forms and details.
 * - `md`: 28rem, for longer content.
 */
export type DrawerSize = 'sm' | 'md';

/** Props for the Drawer component. */
export interface DrawerProps {
  /** Title shown in the header. Also used as the accessible name of the dialog. */
  title: string;
  /** Controls visibility. The drawer stays mounted so the close animation can run. */
  isOpen: boolean;
  /**
   * Called when the user asks to close: the close button, the backdrop, or Escape.
   * The parent must set `isOpen` to false in response.
   */
  onClose: () => void;
  /** Drawer content. */
  children: ReactNode;
  /**
   * Panel width.
   * @default 'md'
   */
  size?: DrawerSize;
}
