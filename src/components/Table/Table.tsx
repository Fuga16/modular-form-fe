import { useSearchParams } from 'react-router-dom';

import clsx from 'clsx';

import styles from './Table.module.css';
import type { SortOrder, TableProps } from './Table.types';
import DownArrowActive from '@/assets/triangle-down-active.svg';
import DownArrow from '@/assets/triangle-down.svg';
import TopArrowActive from '@/assets/triangle-top-active.svg';
import TopArrow from '@/assets/triangle-top.svg';
import { Button } from '@/design-system';
import { getNestedValue } from '@/utils/getNestedValue';
import { getNextSortOrder } from '@/utils/getNextSortOrder';

/**
 * Formats a cell value for display. `0` and `false` are real values and are shown as-is.
 */
function formatCellValue(value: unknown): string {
  return value === null || value === undefined || value === ''
    ? '-'
    : String(value);
}

/** Reads a valid sort direction from the URL. Any other value counts as no sorting. */
function readSortOrder(raw: string | null): SortOrder {
  return raw === 'asc' || raw === 'desc' ? raw : null;
}

/**
 * Data table with optional sorting, row click, row delete, and an empty state.
 *
 * Sorting is stored in the URL (`sortOrder`) and resets the page to the first one.
 * Clicking a sort arrow cycles through the directions as defined by `getNextSortOrder`.
 */
export function Table<T>({
  data,
  config,
  getRowId,
  onRowClick,
  onDeleteRow,
  emptyState,
}: TableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = readSortOrder(searchParams.get('sortOrder'));

  const handleSort = (clicked: 'asc' | 'desc') => {
    const nextSortOrder = getNextSortOrder(sortOrder, clicked);
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (nextSortOrder) {
      params.set('sortOrder', nextSortOrder);
    } else {
      params.delete('sortOrder');
    }

    setSearchParams(params);
  };

  const colSpan = config?.length + (onDeleteRow ? 1 : 0);
  const isEmpty = data?.length === 0;

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            {config?.map((column) => (
              <th
                key={column.fieldName}
                scope="col"
                className={styles.headerCell}
                aria-sort={
                  column.sortable
                    ? sortOrder === 'asc'
                      ? 'ascending'
                      : sortOrder === 'desc'
                        ? 'descending'
                        : 'none'
                    : undefined
                }
              >
                <div className={styles.sortBlock}>
                  {column.title}

                  {column.sortable ? (
                    <div className={styles.arrows}>
                      <button
                        type="button"
                        className={styles.sortButton}
                        aria-label={`Sort ${column.title} ascending`}
                        aria-pressed={sortOrder === 'asc'}
                        onClick={() => handleSort('asc')}
                      >
                        <img
                          src={sortOrder === 'asc' ? TopArrowActive : TopArrow}
                          alt=""
                        />
                      </button>

                      <button
                        type="button"
                        className={styles.sortButton}
                        aria-label={`Sort ${column.title} descending`}
                        aria-pressed={sortOrder === 'desc'}
                        onClick={() => handleSort('desc')}
                      >
                        <img
                          src={
                            sortOrder === 'desc' ? DownArrowActive : DownArrow
                          }
                          alt=""
                        />
                      </button>
                    </div>
                  ) : null}
                </div>
              </th>
            ))}

            {onDeleteRow ? (
              <th
                scope="col"
                aria-hidden="true"
                className={styles.headerCell}
              />
            ) : null}
          </tr>
        </thead>

        <tbody>
          {isEmpty && emptyState ? (
            <tr>
              <td
                colSpan={colSpan}
                className={styles.emptyCell}
              >
                <div className={styles.emptyWrapper}>
                  {emptyState.icon ? (
                    <div className={styles.emptyIcon}>{emptyState.icon}</div>
                  ) : null}

                  <p className={styles.emptyTitle}>{emptyState.title}</p>

                  {emptyState.description ? (
                    <p className={styles.emptyDescription}>
                      {emptyState.description}
                    </p>
                  ) : null}

                  {emptyState.action ? (
                    <div className={styles.emptyAction}>
                      {emptyState.action}
                    </div>
                  ) : null}
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              // Mouse-only shortcut: the row is not focusable and has no role.
              // Keyboard access must come from a control inside the row.
              <tr
                key={getRowId(item)}
                className={clsx(styles.row, onRowClick && styles.clickable)}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {config?.map((column) => {
                  const value = getNestedValue(
                    column.fieldName,
                    item as Record<string, unknown>,
                  );

                  return (
                    <td
                      key={column.fieldName}
                      className={styles.cell}
                    >
                      {column.converter
                        ? column.converter(value)
                        : formatCellValue(value)}
                    </td>
                  );
                })}

                {onDeleteRow ? (
                  <td className={styles.actionsCell}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteRow(item);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                ) : null}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
