/** Props for the PageInput component. */
export interface PageInputProps {
  /** Current page, used to reset the field when it changes from outside. */
  page: number;
  /** Largest valid page. Typed values above it are clamped. */
  totalPages: number;
  /** Called with the page to navigate to. Not called if the page did not change. */
  onChange: (page: number) => void;
}
