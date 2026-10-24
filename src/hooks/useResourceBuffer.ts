import { useContext } from 'react';

import { ResourceBufferContext } from '@/context/ResourceBufferContext';

export function useResourceBuffer() {
  const context = useContext(ResourceBufferContext);

  if (!context) {
    throw new Error(
      'useResourceBuffer must be used within ResourceBufferProvider',
    );
  }

  return context;
}
