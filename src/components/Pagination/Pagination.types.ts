/** Props for the Pagination component. */
export interface PaginationProps {
  /** Current page, starting from 1. */
  page: number;
  /** Total number of pages. Controls the upper bound of the navigation. */
  totalPages: number;
  /** Number of items per page, as stored in the URL. */
  pageSize: number;
}
