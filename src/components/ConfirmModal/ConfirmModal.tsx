import styles from './ConfirmModal.module.css';
import type { ConfirmModalProps } from './ConfirmModal.types';
import { Button, Modal } from '@/design-system';

/**
 * Confirmation dialog with a message and cancel and confirm actions.
 *
 * While `isConfirming` is true, both buttons are disabled and the confirm
 * button shows a pending label. `onConfirm` may return a promise; the dialog
 * does not close itself, the parent controls `isOpen`.
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isConfirming = false,
  isConfirmDisabled = false,
}: ConfirmModalProps) {
  // Wrapped so the click event is not passed to `onConfirm`,
  // and the returned promise is not left unhandled in the event handler.
  const handleConfirm = () => {
    void onConfirm();
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children ? <div className={styles.description}>{children}</div> : null}

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isConfirming}
        >
          {cancelLabel}
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleConfirm}
          disabled={isConfirming || isConfirmDisabled}
        >
          {isConfirming ? 'Please wait…' : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
