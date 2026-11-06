import {
  type ForwardedRef,
  type KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
} from 'react';

import clsx from 'clsx';
import { format, isSameMonth, startOfMonth } from 'date-fns';

import styles from './Calendar.module.css';
import type { CalendarProps } from './Calendar.types';
import {
  getDayState,
  getMonthCells,
  getNextFocusDate,
  getWeekdayLabels,
  parseIsoDate,
  toIsoDate,
} from './Calendar.utils';

/**
 * One month as a keyboard-navigable grid.
 *
 * Only the focused day is in the tab order (roving tabindex). Arrow keys move
 * focus by a day or a week, Home and End go to the start and end of the week,
 * PageUp and PageDown move by a month. The parent owns `focusedDate` and must
 * keep it inside the visible months.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      month,
      range,
      hoverDate = null,
      min,
      max,
      focusedDate,
      labelId,
      onFocusChange,
      onDayClick,
      onDayHover,
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    const gridRef = useRef<HTMLDivElement | null>(null);

    const setGridRef = (node: HTMLDivElement | null) => {
      gridRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Moves DOM focus to the focused day when focus is already inside the grid.
    useEffect(() => {
      const grid = gridRef.current;

      if (!grid || !grid.contains(document.activeElement)) return;

      grid
        .querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)
        ?.focus();
    }, [focusedDate]);

    const focusedDay = parseIsoDate(focusedDate);
    const focusedInMonth = focusedDay ? isSameMonth(focusedDay, month) : false;

    // If the focused day is in another month, the first day becomes the tab stop.
    const tabStop = focusedInMonth
      ? focusedDate
      : toIsoDate(startOfMonth(month));

    const cells = getMonthCells(month);
    const rows: (Date | null)[][] = [];

    for (let index = 0; index < cells.length; index += 7) {
      rows.push(cells.slice(index, index + 7));
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const current = parseIsoDate(focusedDate);
      if (!current) return;

      const next = getNextFocusDate(current, event.key);
      if (!next) return;

      event.preventDefault();
      onFocusChange(toIsoDate(next));
    };

    return (
      <div className={styles.calendar}>
        <div
          id={labelId}
          className={styles.caption}
        >
          {format(month, 'MMMM yyyy')}
        </div>

        <div
          ref={setGridRef}
          role="grid"
          aria-labelledby={labelId}
          className={styles.grid}
          onKeyDown={handleKeyDown}
        >
          <div
            role="row"
            className={styles.row}
          >
            {getWeekdayLabels().map((label) => (
              <div
                key={label}
                role="columnheader"
                className={styles.weekday}
              >
                {label}
              </div>
            ))}
          </div>

          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              role="row"
              className={styles.row}
            >
              {row.map((date, cellIndex) => {
                if (!date) {
                  return (
                    <div
                      key={`blank-${cellIndex}`}
                      role="presentation"
                    />
                  );
                }

                const iso = toIsoDate(date);
                const state = getDayState(date, {
                  range,
                  hoverDate,
                  min,
                  max,
                });

                return (
                  <div
                    key={iso}
                    role="gridcell"
                    aria-selected={state.isSelected}
                    className={clsx(
                      styles.cell,
                      state.isInRange && styles.cellInRange,
                    )}
                  >
                    <button
                      type="button"
                      data-date={iso}
                      tabIndex={iso === tabStop ? 0 : -1}
                      aria-label={format(date, 'PPPP')}
                      aria-disabled={state.isDisabled || undefined}
                      className={clsx(
                        styles.day,
                        state.isEdge && styles.dayEdge,
                        state.isToday && styles.dayToday,
                        state.isDisabled && styles.dayDisabled,
                      )}
                      onClick={() => {
                        if (!state.isDisabled) {
                          onDayClick(iso);
                        }
                      }}
                      onMouseEnter={() => onDayHover?.(iso)}
                      onMouseLeave={() => onDayHover?.(null)}
                    >
                      {format(date, 'd')}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
