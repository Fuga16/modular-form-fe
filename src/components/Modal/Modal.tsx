import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

import { AnimatePresence } from 'framer-motion';

import { OVERLAY_ANIMATION, PANEL_ANIMATION } from './Modal.constants';
import { Content, Header, Overlay, Panel, Title } from './Modal.styles';
import type { ModalProps } from './Modal.types';
import { IconButton } from '@/design-system';

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    panelRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        previouslyFocused.current?.focus();
      }}
    >
      {isOpen && (
        <Overlay
          {...OVERLAY_ANIMATION}
          onClick={onClose}
        >
          <Panel
            {...PANEL_ANIMATION}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <Header>
              <Title id="modal-title">{title}</Title>

              <IconButton
                type="button"
                variant="ghost"
                onClick={onClose}
                aria-label="Close dialog"
              >
                ✕
              </IconButton>
            </Header>

            <Content>{children}</Content>
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default Modal;
