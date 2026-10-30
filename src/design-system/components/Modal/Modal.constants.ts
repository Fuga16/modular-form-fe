/** Default duration in seconds, used when the CSS token cannot be read. */
const FALLBACK_DURATION_S = 0.18;

/** Easing matching `--ease-standard` in tokens.css. framer-motion needs numbers, not a CSS variable. */
const EASE_STANDARD: [number, number, number, number] = [0.2, 0, 0, 1];

/**
 * Reads a duration token from the root element and converts it to seconds.
 * Accepts values in `ms` or `s`.
 */
function readDurationToken(token: string): number {
  if (typeof window === 'undefined') return FALLBACK_DURATION_S;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();

  if (!raw) return FALLBACK_DURATION_S;

  const value = parseFloat(raw);
  if (Number.isNaN(value)) return FALLBACK_DURATION_S;

  return raw.endsWith('ms') ? value / 1000 : value;
}

/** Backdrop fade, duration taken from `--duration-base`. */
export function getOverlayAnimation() {
  const duration = readDurationToken('--duration-base');

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration, ease: EASE_STANDARD },
  };
}

/** Panel fade, scale, and slide, duration taken from `--duration-base`. */
export function getPanelAnimation() {
  const duration = readDurationToken('--duration-base');

  return {
    initial: { opacity: 0, scale: 0.96, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 12 },
    transition: { duration, ease: EASE_STANDARD },
  };
}
