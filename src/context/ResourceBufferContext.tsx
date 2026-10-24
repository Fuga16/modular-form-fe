import type { ResourceBufferContextValue } from '@/components/ResourceBufferProvider/ResourceBufferProvider.types'
import { createContext } from 'react'

export const ResourceBufferContext = createContext<ResourceBufferContextValue | null>(
  null,
)
