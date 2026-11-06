import { createContext } from 'react';

import type { ResourceBufferContextValue } from '../components/ResourceBufferProvider/ResourceBufferProvider.types';

export const ResourceBufferContext =
  createContext<ResourceBufferContextValue | null>(null);
