import { type ChangeEvent, type KeyboardEvent, useState } from 'react';

import { Input } from '../../../design-system';
import { PAGE_NUMBER_ARIA_LABEL } from '../Pagination.constants';

import styles from './PageInput.module.css';
import type { PageInputProps } from './PageInput.types';

/**
 * Editable page number. The user types a page and commits it on blur or Enter.
 *
 * Non-digit characters are removed while typing. On commit the value is clamped
 * to the valid range. If the result equals the current page, the field resets
 * to the current page.
 */
export function PageInput({ page, totalPages, onChange }: PageInputProps) {
  const [value, setValue] = useState(String(page));
  const [prevPage, setPrevPage] = useState(page);

  // Keeps the field in sync when the page changes from outside (buttons, URL).
  if (page !== prevPage) {
    setPrevPage(page);
    setValue(String(page));
  }

  const commit = () => {
    const safeTotalPages = Math.max(1, totalPages);
    const parsed = Number(value);
    const nextPage = parsed > 0 ? Math.min(safeTotalPages, parsed) : 1;

    if (nextPage !== page) {
      onChange(nextPage);
    } else {
      setValue(String(page));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.replace(/\D/g, ''));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <div className={styles.container}>
      <Input
        value={value}
        inputMode="numeric"
        aria-label={PAGE_NUMBER_ARIA_LABEL}
        onChange={handleChange}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
