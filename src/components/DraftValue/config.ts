import type { ReactNode } from 'react';

import { EMPTY_VALUE } from '@/constants/constants';

export const formatValue = (value: unknown): ReactNode => {
  if (value === null || value === undefined || value === '') {
    return EMPTY_VALUE;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : EMPTY_VALUE;
  }

  return String(value);
};
