import { ITEMS_PER_PAGE_ARIA_LABEL } from '../Pagination.constants';

import styles from './PageSizeSelect.module.css';
import type { PageSizeSelectProps } from './PageSizeSelect.types';
import { PAGE_SIZE_OPTIONS } from './PageSizeSelect.variants';
import { Select } from '@/design-system';

/** Options are built once at module load, not on every render. */
const SELECT_OPTIONS = PAGE_SIZE_OPTIONS.map((size) => ({
  value: String(size),
  label: String(size),
}));

/**
 * Select control for choosing the number of items per page.
 * The value is passed to `onChange` as a number, so the parent does not parse strings.
 */
export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <div className={styles.container}>
      <Select
        value={String(value)}
        aria-label={ITEMS_PER_PAGE_ARIA_LABEL}
        options={SELECT_OPTIONS}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
