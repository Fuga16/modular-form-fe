import { ResourceBufferContext } from '@/context/ResourceBufferContext'
import { useContext } from 'react'

export function useResourceBuffer() {
  const context = useContext(ResourceBufferContext)

  if (!context) {
    throw new Error('useResourceBuffer must be used within ResourceBufferProvider')
  }

  return context
}
