import { Outlet } from 'react-router-dom'

import { ResourceBufferProvider } from '@/components/ResourceBufferProvider/ResourceBufferProvider'

export function ResourceLayout() {
  return (
    <ResourceBufferProvider>
      <Outlet />
    </ResourceBufferProvider>
  )
}
