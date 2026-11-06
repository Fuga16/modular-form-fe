import {
  type KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import {
  addMonths,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  startOfMonth,
} from 'date-fns';

import styles from './DateRangePicker.module.css';
import type { DateRangePickerProps } from './DateRangePicker.types';
import { Button } from '@/design-system/components/Button/Button';
import { Calendar } from '@/design-system/components/Calendar/Calendar';
import type { DateRange } from '@/design-system/components/Calendar/Calendar.types';
import {
  parseIsoDate,
  toIsoDate,
} from '@/design-system/components/Calendar/Calendar.utils';
import { IconButton } from '@/design-system/components/IconButton/IconButton';
import { Tooltip } from '@/design-system/components/Tooltip/Tooltip';

/** Icon shown in the locked state. */
const DEFAULT_LOCK_ICON = '🔒';

/** Media query for one-month mode. Keep the value in sync with `--mobile` in breakpoints.css. */
const MOBILE_QUERY = '(max-width: 640px)';

/** Format of dates in the trigger text. */
const DISPLAY_FORMAT = 'MMM d, yyyy';

/** Range with no dates selected. */
const EMPTY_RANGE: DateRange = { from: '', to: '' };

/** Keys that open the popup when the trigger is focused. */
const OPEN_KEYS = ['Enter', ' ', 'ArrowDown'];

/** Tracks whether the viewport matches the mobile query. */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

/** Text for the trigger. Missing bounds are shown as an ellipsis. */
function formatRangeText(range: DateRange): string {
  const from = parseIsoDate(range.from);
  const to = parseIsoDate(range.to);

  if (!from && !to) return '';

  const fromText = from ? format(from, DISPLAY_FORMAT) : '…';
  const toText = to ? format(to, DISPLAY_FORMAT) : '…';

  return `${fromText} – ${toText}`;
}

/**
 * Day that the calendar opens on: the start of the range if set, otherwise today,
 * clamped to `min` and `max`.
 */
function getInitialFocus(range: DateRange, min?: string, max?: string): string {
  let date = parseIsoDate(range.from) ?? new Date();

  const minDate = parseIsoDate(min);
  const maxDate = parseIsoDate(max);

  if (minDate && isBefore(date, minDate)) date = minDate;
  if (maxDate && isAfter(date, maxDate)) date = maxDate;

  return toIsoDate(date);
}

/**
 * Date range field with a popup calendar.
 *
 * The first click sets the start date, the second click sets the end date and
 * commits the range. The popup closes on Escape, on a click outside, and after
 * a range is committed. Escape stops propagation, so a surrounding dialog stays open.
 */
export const DateRangePicker = forwardRef<
  HTMLInputElement,
  DateRangePickerProps
>(function DateRangePicker(
  {
    label,
    value,
    onChange,
    onBlur,
    name,
    min,
    max,
    placeholder = 'Select dates',
    helperText,
    error,
    tooltip,
    locked = false,
    lockIcon = DEFAULT_LOCK_ICON,
    disabled = false,
    size = 'md',
    id,
    className,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const popupId = `${inputId}-popup`;
  const helpId = `${inputId}-help`;

  const isMobile = useIsMobile();
  const visibleMonths = isMobile ? 1 : 2;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setOpen] = useState(false);
  const [pendingFrom, setPendingFrom] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(new Date()),
  );
  const [focusedDate, setFocusedDate] = useState<string>(() =>
    getInitialFocus(value, min, max),
  );

  const isInteractive = !disabled && !locked;
  const popupOpen = isOpen && isInteractive;

  const hasError = Boolean(error);
  const message = error ?? helperText;

  const setTriggerRef = (node: HTMLInputElement | null) => {
    triggerRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const closePopup = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    setPendingFrom(null);
    setHoverDate(null);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  const openPopup = () => {
    if (!isInteractive) return;

    const initial = getInitialFocus(value, min, max);

    setFocusedDate(initial);
    setViewMonth(startOfMonth(parseIsoDate(initial) ?? new Date()));
    setPendingFrom(null);
    setHoverDate(null);
    setOpen(true);
  };

  // Close on a pointer press outside the field and its popup.
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closePopup(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, closePopup]);

  // Moves focus to the focused day when the popup opens or the day changes,
  // but not when focus is on a navigation button inside the popup.
  useEffect(() => {
    const popup = popupRef.current;
    if (!isOpen || !popup) return;

    const active = document.activeElement;
    const grid = popup.querySelector('[role="grid"]');
    const shouldMoveFocus =
      !popup.contains(active) || Boolean(grid?.contains(active));

    if (!shouldMoveFocus) return;

    popup
      .querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)
      ?.focus();
  }, [isOpen, focusedDate]);

  const handleTriggerClick = () => {
    if (isOpen) {
      closePopup(false);
    } else {
      openPopup();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && isOpen) {
      // Keeps a surrounding modal or drawer from closing as well.
      event.stopPropagation();
      closePopup(true);
      return;
    }

    if (
      event.target === triggerRef.current &&
      !isOpen &&
      OPEN_KEYS.includes(event.key)
    ) {
      event.preventDefault();
      openPopup();
    }
  };

  const handleDayClick = (iso: string) => {
    console.log('handleDayClick', iso);

    setFocusedDate(iso);

    if (pendingFrom === null) {
      setPendingFrom(iso);
      return;
    }

    // ISO dates compare correctly as strings.
    const [start, end] =
      pendingFrom <= iso ? [pendingFrom, iso] : [iso, pendingFrom];
    onChange({ from: start, to: end });
    closePopup(true);
  };

  const handleFocusChange = (iso: string) => {
    const date = parseIsoDate(iso);
    if (!date) return;

    setFocusedDate(iso);

    const lastVisibleEnd = endOfMonth(addMonths(viewMonth, visibleMonths - 1));

    if (isBefore(date, viewMonth)) {
      setViewMonth(startOfMonth(date));
    } else if (isAfter(date, lastVisibleEnd)) {
      setViewMonth(addMonths(startOfMonth(date), -(visibleMonths - 1)));
    }
  };

  const shiftMonth = (delta: number) => {
    setViewMonth((prev) => addMonths(prev, delta));
    setFocusedDate((prev) =>
      toIsoDate(addMonths(parseIsoDate(prev) ?? new Date(), delta)),
    );
  };

  const handleClear = () => {
    onChange(EMPTY_RANGE);
    setPendingFrom(null);
    setHoverDate(null);
  };

  // While the first date is picked, the calendar previews the range up to the hovered day.
  const displayRange: DateRange = pendingFrom
    ? { from: pendingFrom, to: '' }
    : value;

  const displayText = pendingFrom
    ? formatRangeText({ from: pendingFrom, to: '' })
    : formatRangeText(value);

  const months = Array.from({ length: visibleMonths }, (_, index) =>
    addMonths(viewMonth, index),
  );

  return (
    <div className={clsx(styles.field, className)}>
      {label ? (
        <div className={styles.labelRow}>
          <label
            htmlFor={inputId}
            className={styles.label}
          >
            {label}
          </label>

          {tooltip ? <Tooltip content={tooltip} /> : null}
        </div>
      ) : null}

      <div
        ref={wrapperRef}
        className={styles.wrapper}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.shell}>
          <input
            ref={setTriggerRef}
            id={inputId}
            name={name}
            type="text"
            readOnly
            value={displayText}
            placeholder={placeholder}
            disabled={disabled}
            onClick={handleTriggerClick}
            onBlur={onBlur}
            aria-haspopup="dialog"
            aria-expanded={popupOpen}
            aria-controls={popupOpen ? popupId : undefined}
            aria-invalid={hasError}
            aria-describedby={message ? helpId : undefined}
            className={clsx(
              styles.control,
              styles[size],
              popupOpen && styles.controlOpen,
              locked && styles.locked,
            )}
          />

          <span
            aria-hidden="true"
            className={styles.indicator}
          >
            {locked ? (
              <span className={styles.lockIcon}>{lockIcon}</span>
            ) : (
              <span
                className={clsx(
                  styles.chevron,
                  popupOpen && styles.chevronOpen,
                )}
              />
            )}
          </span>
        </div>

        {popupOpen ? (
          <div
            ref={popupRef}
            id={popupId}
            role="dialog"
            aria-label="Choose date range"
            className={styles.popup}
          >
            <div className={styles.navRow}>
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Previous month"
                onClick={() => shiftMonth(-1)}
              >
                ‹
              </IconButton>

              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Next month"
                onClick={() => shiftMonth(1)}
              >
                ›
              </IconButton>
            </div>

            <div className={styles.months}>
              {months.map((month, index) => (
                <Calendar
                  key={toIsoDate(month)}
                  month={month}
                  range={displayRange}
                  hoverDate={pendingFrom ? hoverDate : null}
                  min={min}
                  max={max}
                  focusedDate={focusedDate}
                  labelId={`${inputId}-month-${index}`}
                  onFocusChange={handleFocusChange}
                  onDayClick={handleDayClick}
                  onDayHover={setHoverDate}
                />
              ))}
            </div>

            <div className={styles.footer}>
              <span
                aria-live="polite"
                className={styles.hint}
              >
                {pendingFrom ? 'Pick an end date' : 'Pick a start date'}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={!value.from && !value.to && !pendingFrom}
              >
                Clear
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {message ? (
        <p
          id={helpId}
          className={clsx(styles.helper, hasError && styles.helperError)}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
});

export default DateRangePicker;
