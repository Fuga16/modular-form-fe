import { Modal } from '../Modal';

import { Actions, Description } from './ConfirmModal.styles';
import type { ConfirmModalProps } from './ConfirmModal.types';
import { Button } from '@/design-system';

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
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children && <Description>{children}</Description>}

      <Actions>
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
          onClick={onConfirm}
          disabled={isConfirming || isConfirmDisabled}
        >
          {isConfirming ? 'Please wait…' : confirmLabel}
        </Button>
      </Actions>
    </Modal>
  );
}
