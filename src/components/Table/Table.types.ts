import type { ReactNode } from 'react';

/** Direction of the active sort, as stored in the `sortOrder` URL parameter. */
export type SortOrder = 'asc' | 'desc' | null;

/** One column of the table. */
export interface TableColumn<T> {
  /** Key of the row object shown in this column. Dot paths are read with `getNestedValue`. */
  fieldName: keyof T & string;
  /** Column heading. */
  title: string;
  /** Shows the sort controls in the heading. */
  sortable?: boolean;
  /**
   * Formats the raw value for display. Without it, empty values render as `-`.
   */
  converter?: (value: unknown) => ReactNode;
}

/** Props for the Table component. */
export interface TableProps<T> {
  /** Rows to render. An empty array shows `emptyState` when it is provided. */
  data: T[];
  /** Columns in display order. */
  config: TableColumn<T>[];
  /** Returns a stable key for a row. */
  getRowId: (item: T) => string | number;
  /**
   * Called when a row is clicked with a mouse. Makes the whole row clickable.
   * Not reachable from the keyboard: when the row action must be available to
   * keyboard users, expose it as a control inside the row instead.
   */
  onRowClick?: (item: T) => void;
  /** Adds a Delete button to each row. The click does not reach `onRowClick`. */
  onDeleteRow?: (item: T) => void;
  /** Content shown in place of the rows when `data` is empty. */
  emptyState?: {
    /** Main message. */
    title: string;
    /** Optional secondary message under the title. */
    description?: string;
    /** Optional icon above the title. */
    icon?: ReactNode;
    /** Optional action below the description. */
    action?: ReactNode;
  };
}
