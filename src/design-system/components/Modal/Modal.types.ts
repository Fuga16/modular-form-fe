import type { ReactNode } from 'react';

/** Props for the Modal component. */
export interface ModalProps {
  /** Title shown in the header. Also used as the accessible name of the dialog. */
  title: string;
  /** Controls visibility. The parent must set it to false in response to `onClose`. */
  isOpen: boolean;
  /** Called when the user closes the dialog: the close button, the backdrop, or Escape. */
  onClose: () => void;
  /** Dialog content. */
  children: ReactNode;
}
