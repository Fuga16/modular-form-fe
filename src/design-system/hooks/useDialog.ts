import { type RefObject, useEffect, useRef } from 'react';

/** Class added to `body` while at least one dialog is open. Defined in global.css. */
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

/** Panels of all open dialogs, in opening order. The last one is the topmost. */
const openPanels: HTMLElement[] = [];

/** Body children that this module made `inert`, so they can be restored. */
const inertElements = new Set<Element>();

/**
 * Makes every top-level element on `body` inert except the ones that contain an open panel.
 * Called on every open and close, so the state always matches the stack.
 */
function syncInert() {
  inertElements.forEach((element) => element.removeAttribute('inert'));
  inertElements.clear();

  if (openPanels.length === 0) return;

  Array.from(document.body.children).forEach((element) => {
    const containsOpenPanel = openPanels.some((panel) =>
      element.contains(panel),
    );
    if (!containsOpenPanel) {
      element.setAttribute('inert', '');
      inertElements.add(element);
    }
  });
}

/** Options for the useDialog hook. */
interface UseDialogOptions {
  /** Whether the dialog is open. */
  isOpen: boolean;
  /** Ref to the element that receives focus and traps Tab. */
  panelRef: RefObject<HTMLElement | null>;
  /** Called on Escape. Only the topmost open dialog reacts. */
  onClose: () => void;
}

/**
 * Shared dialog behavior for Modal and Drawer.
 *
 * - Keeps a stack of open dialogs. Only the topmost one reacts to Escape and Tab.
 * - Locks page scroll while any dialog is open, compensating for the scrollbar width.
 * - Makes the rest of the page `inert` while a dialog is open.
 * - Moves focus into the panel on open and returns it to the previous element on close.
 */
export function useDialog({ isOpen, panelRef, onClose }: UseDialogOptions) {
  // Keeps the latest onClose without re-subscribing listeners on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!isOpen || !panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;

    openPanels.push(panel);

    if (openPanels.length === 1) {
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      documentElement.style.setProperty(
        SCROLLBAR_WIDTH_VAR,
        `${scrollbarWidth}px`,
      );
      body.classList.add(SCROLL_LOCK_CLASS);
    }

    syncInert();

    (panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? panel).focus();

    const isTopmost = () => openPanels[openPanels.length - 1] === panel;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTopmost()) return;

      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (isTopmost() && !panel.contains(event.target as Node)) {
        panel.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);

      const index = openPanels.indexOf(panel);
      if (index !== -1) openPanels.splice(index, 1);

      if (openPanels.length === 0) {
        body.classList.remove(SCROLL_LOCK_CLASS);
        documentElement.style.removeProperty(SCROLLBAR_WIDTH_VAR);
      }

      syncInert();
      previouslyFocused?.focus?.();
    };
  }, [isOpen, panelRef]);
}
