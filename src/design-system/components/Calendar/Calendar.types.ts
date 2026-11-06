/** Selected range. Empty strings mean the bound is not set. */
export interface DateRange {
  /** Start date in `YYYY-MM-DD`, or empty. */
  from: string;
  /** End date in `YYYY-MM-DD`, or empty. */
  to: string;
}

/** Props for the Calendar component. */
export interface CalendarProps {
  /** Any date inside the month to render. */
  month: Date;
  /** Selected range, used to mark the edges and the band between them. */
  range: DateRange;
  /**
   * Date under the pointer. While only `from` is set, the range is previewed up to this date.
   * @default null
   */
  hoverDate?: string | null;
  /** Earliest selectable date, `YYYY-MM-DD`. Earlier days are shown but disabled. */
  min?: string;
  /** Latest selectable date, `YYYY-MM-DD`. Later days are shown but disabled. */
  max?: string;
  /**
   * Day that holds keyboard focus, `YYYY-MM-DD`. The parent keeps it inside the visible months.
   * It is the only day in the grid that is reachable with Tab.
   */
  focusedDate: string;
  /** `id` of the caption element, used as the accessible name of the grid. */
  labelId: string;
  /** Called when the keyboard moves focus to another day. */
  onFocusChange: (date: string) => void;
  /** Called when an enabled day is clicked. Disabled days do nothing. */
  onDayClick: (date: string) => void;
  /** Called with the day under the pointer, and with `null` when the pointer leaves it. */
  onDayHover?: (date: string | null) => void;
}
