import { useId, useRef } from 'react';

import { createPortal } from 'react-dom';

import clsx from 'clsx';

import { useDialog } from '../..';
import { IconButton } from '../IconButton';

import styles from './Drawer.module.css';
import type { DrawerProps, DrawerSize } from './Drawer.types';

/** Maps the public size API to CSS module classes. */
const sizeClassName: Record<DrawerSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

/**
 * Side drawer that overlays the page.
 *
 * Closes on the close button, a click on the backdrop, or Escape.
 * Focus and scroll behavior are shared with Modal through `useDialog`.
 * The drawer stays mounted and is hidden with `visibility`, so the close transition can run.
 */
export function Drawer({
  title,
  isOpen,
  onClose,
  children,
  size = 'md',
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useDialog({ isOpen, panelRef, onClose });

  // Close only when the click lands on the backdrop itself, not on the panel.
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={clsx(styles.overlay, isOpen && styles.open)}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={clsx(
          styles.panel,
          sizeClassName[size],
          isOpen && styles.open,
        )}
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
            size="sm"
            aria-label="Закрыть"
            onClick={onClose}
          >
            ✕
          </IconButton>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
