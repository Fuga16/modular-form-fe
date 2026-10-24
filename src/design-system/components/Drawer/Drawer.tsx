import { type MouseEvent, useEffect, useId, useRef } from 'react';

import { createPortal } from 'react-dom';

import clsx from 'clsx';

import { IconButton } from '../IconButton';

import styles from './Drawer.module.css';
import type { DrawerProps, DrawerSize } from './Drawer.types';

/** Class added to `body` while the drawer is open. Defined in global.css. */
const SCROLL_LOCK_CLASS = 'is-scroll-locked';

/** CSS variable that global.css uses to compensate for the scrollbar width. */
const SCROLLBAR_WIDTH_VAR = '--scrollbar-width';

/** Selector for elements that can receive keyboard focus. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Maps the public size API to CSS module classes. */
const sizeClassName: Record<DrawerSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

/**
 * Side drawer that overlays the page.
 *
 * Accessibility:
 * - Renders as a modal dialog labelled by its title.
 * - Moves focus into the panel on open and returns it to the previously focused element on close.
 * - Keeps Tab inside the panel while open.
 * - Marks the rest of the page `inert` while open, so background content cannot be reached.
 *
 * Closing: the close button, a click on the backdrop, or Escape call `onClose`.
 * The component does not close itself; the parent controls `isOpen`.
 *
 * Only one drawer should be open at a time, because each one manages `inert`
 * and scroll lock on its own.
 */
export function Drawer({
  title,
  isOpen,
  onClose,
  children,
  size = 'md',
}: DrawerProps) {
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep the latest onClose without re-subscribing listeners on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Open-time effects: scroll lock, inert background, focus management.
  useEffect(() => {
    if (!isOpen) return;

    const { body, documentElement } = document;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Compensate for the scrollbar so the page does not shift when it is hidden.
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    documentElement.style.setProperty(
      SCROLLBAR_WIDTH_VAR,
      `${scrollbarWidth}px`,
    );
    body.classList.add(SCROLL_LOCK_CLASS);

    // Make every top-level element except this drawer inert.
    const inertElements = Array.from(body.children).filter(
      (element) =>
        element !== overlayRef.current && !element.hasAttribute('inert'),
    );
    inertElements.forEach((element) => element.setAttribute('inert', ''));

    // Move focus into the panel: first focusable element, or the panel itself.
    const firstFocusable =
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? null;
    (firstFocusable ?? panelRef.current)?.focus();

    return () => {
      inertElements.forEach((element) => element.removeAttribute('inert'));
      body.classList.remove(SCROLL_LOCK_CLASS);
      documentElement.style.removeProperty(SCROLLBAR_WIDTH_VAR);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  // Keyboard handling: Escape closes, Tab stays inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // If focus somehow leaves the panel, bring it back.
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        panelRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isOpen]);

  // Close only when the click lands on the backdrop itself, not on the panel.
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
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
