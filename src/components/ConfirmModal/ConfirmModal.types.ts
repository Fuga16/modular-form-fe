import type { ReactNode } from 'react';

/** Props for the ConfirmModal component. */
export interface ConfirmModalProps {
  /** Controls visibility. The parent must set it to false in response to `onClose` or `onConfirm`. */
  isOpen: boolean;
  /** Called when the user cancels: the cancel button, the close button, the backdrop, or Escape. */
  onClose: () => void;
  /**
   * Called when the user confirms. May return a promise; the dialog does not close itself.
   * Use `isConfirming` to show progress while the promise is pending.
   */
  onConfirm: () => void | Promise<void>;
  /** Title shown in the dialog header. */
  title: string;
  /** Optional message shown above the actions. Not rendered when empty. */
  children?: ReactNode;
  /**
   * Label of the confirm button.
   * @default 'Confirm'
   */
  confirmLabel?: string;
  /**
   * Label of the cancel button.
   * @default 'Cancel'
   */
  cancelLabel?: string;
  /**
   * True while `onConfirm` is running. Disables both buttons and changes the confirm label.
   * @default false
   */
  isConfirming?: boolean;
  /**
   * Disables the confirm button without affecting the cancel button,
   * for example when the required input is not valid yet.
   * @default false
   */
  isConfirmDisabled?: boolean;
}
