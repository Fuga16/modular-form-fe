import { useId, useRef } from 'react';

import { createPortal } from 'react-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { IconButton, useDialog } from '../..';

import { getOverlayAnimation, getPanelAnimation } from './Modal.constants';
import styles from './Modal.module.css';
import type { ModalProps } from './Modal.types';

/**
 * Modal dialog rendered in a portal, with a backdrop and an entry/exit animation.
 *
 * Closes on the close button, a click on the backdrop, or Escape.
 * Focus and scroll behavior are shared with Drawer through `useDialog`.
 */
export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useDialog({ isOpen, panelRef, onClose });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...getOverlayAnimation()}
          className={styles.overlay}
          onClick={onClose}
        >
          <motion.div
            {...getPanelAnimation()}
            ref={panelRef}
            className={styles.panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.header}>
              <h2
                id={titleId}
                className={styles.title}
              >
                {title}
              </h2>

              <IconButton
                type="button"
                variant="ghost"
                onClick={onClose}
                aria-label="Закрыть"
              >
                ✕
              </IconButton>
            </div>

            <div className={styles.content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default Modal;
