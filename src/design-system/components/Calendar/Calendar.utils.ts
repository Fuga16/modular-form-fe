import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  isValid,
  isWithinInterval,
  parse,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import type { DateRange } from './Calendar.types';

/** Format of every date value in the design system. */
export const ISO_DATE_FORMAT = 'yyyy-MM-dd';

/** Monday is the first day of the week. */
export const WEEK_STARTS_ON = 1 as const;

/** Parses a `YYYY-MM-DD` string. Returns `null` for empty or invalid values. */
export function parseIsoDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const parsed = parse(value, ISO_DATE_FORMAT, new Date());

  return isValid(parsed) ? parsed : null;
}

/** Formats a date as `YYYY-MM-DD`. */
export function toIsoDate(date: Date): string {
  return format(date, ISO_DATE_FORMAT);
}

/** Position of a date's weekday counted from the first day of the week (0 to 6). */
function weekOffset(date: Date): number {
  return (getDay(date) - WEEK_STARTS_ON + 7) % 7;
}

/**
 * Returns the cells of a month grid in order: `null` for the blank cells before
 * the first day and after the last day, and a `Date` for each day of the month.
 */
export function getMonthCells(month: Date): (Date | null)[] {
  const first = startOfMonth(month);
  const last = endOfMonth(month);

  const days = eachDayOfInterval({ start: first, end: last });
  const leading: null[] = Array(weekOffset(first)).fill(null);
  const trailing: null[] = Array(6 - weekOffset(last)).fill(null);

  return [...leading, ...days, ...trailing];
}

/** Short weekday names starting from the first day of the week, for example `Mo`. */
export function getWeekdayLabels(): string[] {
  const start = startOfWeek(new Date(), { weekStartsOn: WEEK_STARTS_ON });

  return Array.from({ length: 7 }, (_, index) =>
    format(addDays(start, index), 'EEEEEE'),
  );
}

/** Date that keyboard focus moves to for a key, or `null` if the key is not a navigation key. */
export function getNextFocusDate(current: Date, key: string): Date | null {
  switch (key) {
    case 'ArrowLeft':
      return addDays(current, -1);
    case 'ArrowRight':
      return addDays(current, 1);
    case 'ArrowUp':
      return addDays(current, -7);
    case 'ArrowDown':
      return addDays(current, 7);
    case 'Home':
      return startOfWeek(current, { weekStartsOn: WEEK_STARTS_ON });
    case 'End':
      return endOfWeek(current, { weekStartsOn: WEEK_STARTS_ON });
    case 'PageUp':
      return addMonths(current, -1);
    case 'PageDown':
      return addMonths(current, 1);
    default:
      return null;
  }
}

/** Input for `getDayState`. */
export interface DayStateInput {
  range: DateRange;
  hoverDate: string | null;
  min?: string;
  max?: string;
}

/** Visual and accessibility state of one day. */
export interface DayState {
  isDisabled: boolean;
  isSelected: boolean;
  isEdge: boolean;
  isInRange: boolean;
  isToday: boolean;
}

/**
 * Works out how a day should look.
 *
 * - `isEdge`: the day is the start or end of the selection, or the preview end under the pointer.
 * - `isInRange`: the day lies between the two edges, including the preview.
 * - `isDisabled`: the day is outside `min` and `max`.
 */
export function getDayState(date: Date, input: DayStateInput): DayState {
  const from = parseIsoDate(input.range.from);
  const to = parseIsoDate(input.range.to);
  const hover = parseIsoDate(input.hoverDate);
  const min = parseIsoDate(input.min);
  const max = parseIsoDate(input.max);

  const isBeforeMin = min ? isBefore(date, min) : false;
  const isAfterMax = max ? isAfter(date, max) : false;

  const isStart = from ? isSameDay(date, from) : false;
  const isEnd = to ? isSameDay(date, to) : false;
  const isPreviewEnd = Boolean(from && !to && hover && isSameDay(date, hover));

  const rangeEnd = to ?? (from && hover ? hover : null);

  let isInRange = false;
  if (from && rangeEnd) {
    const [start, end] = from <= rangeEnd ? [from, rangeEnd] : [rangeEnd, from];
    isInRange = isWithinInterval(date, { start, end });
  }

  const isSelected = isStart || isEnd;

  return {
    isDisabled: isBeforeMin || isAfterMax,
    isSelected,
    isEdge: isSelected || isPreviewEnd,
    isInRange: isInRange && !isSelected,
    isToday: isToday(date),
  };
}
