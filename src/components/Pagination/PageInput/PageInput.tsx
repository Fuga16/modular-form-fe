import { useState } from 'react';

import { Container } from './PageInput.styles.ts';
import type { PageInputProps } from './PageInput.types';
import { Input } from '@/design-system';

export function PageInput({ page, totalPages, onChange }: PageInputProps) {
  const [value, setValue] = useState(String(page));
  const [prevPage, setPrevPage] = useState(page);

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <Container>
      <Input
        value={value}
        inputMode="numeric"
        aria-label="Page number"
        onChange={(e) => setValue(e.target.value.replace(/\D/g, ''))}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
}
