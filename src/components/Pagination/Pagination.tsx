import { useSearchParams } from 'react-router-dom';

import { PageInput } from './PageInput';
import { PageSizeSelect } from './PageSizeSelect';
import {
  NEXT_BUTTON_LABEL,
  PAGINATION_ARIA_LABEL,
  PREV_BUTTON_LABEL,
} from './Pagination.constants';
import styles from './Pagination.module.css';
import type { PaginationProps } from './Pagination.types';
import { Button } from '@/design-system';
import { updateSearchParams } from '@/utils/updateSearchParams';

/**
 * Pagination controls synced with URL search params.
 *
 * Changing the page keeps every other parameter. Changing the page size also
 * resets the page to the first one, because the old page number may not exist
 * at the new size.
 */
export function Pagination({ page, totalPages, pageSize }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePage = (nextPage: number) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: String(nextPage),
      }),
    );
  };

  const updatePageSize = (nextPageSize: number) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: '1',
        pageSize: String(nextPageSize),
      }),
    );
  };

  return (
    <nav
      aria-label={PAGINATION_ARIA_LABEL}
      className={styles.container}
    >
      <Button
        type="button"
        variant="secondary"
        disabled={page <= 1}
        onClick={() => updatePage(page - 1)}
      >
        {PREV_BUTTON_LABEL}
      </Button>

      <PageInput
        page={page}
        totalPages={totalPages}
        onChange={updatePage}
      />

      <span
        aria-live="polite"
        className={styles.status}
      >
        {page} / {totalPages}
      </span>

      <PageSizeSelect
        value={pageSize}
        onChange={updatePageSize}
      />

      <Button
        type="button"
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => updatePage(page + 1)}
      >
        {NEXT_BUTTON_LABEL}
      </Button>
    </nav>
  );
}
