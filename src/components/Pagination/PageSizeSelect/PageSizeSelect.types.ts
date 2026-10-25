/** Props for the PageSizeSelect component. */
export interface PageSizeSelectProps {
  /** Current number of items per page. */
  value: number;
  /** Called with the selected size as a number. */
  onChange: (value: number) => void;
}
