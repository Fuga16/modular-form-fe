import { useState, type PropsWithChildren } from 'react'

import type { ResourceBuffer } from './ResourceBufferProvider.types'
import { ResourceBufferContext } from '@/context/ResourceBufferContext'
import type { BasicInfo, ProjectDetails } from '@/api/types'

export function ResourceBufferProvider({ children }: PropsWithChildren) {
  const [buffer, setBuffer] = useState<ResourceBuffer>({})

  const getBuffer = (resourceId: string) => {
    return buffer[resourceId]
  }

  const updateBasicInfo = (resourceId: string, data: Partial<BasicInfo>) => {
    setBuffer((prev) => ({
      ...prev,
      [resourceId]: {
        ...prev[resourceId],
        basicInfo: {
          ...prev[resourceId]?.basicInfo,
          ...data,
        },
      },
    }))
  }

  const updateProjectDetails = (resourceId: string, data: Partial<ProjectDetails>) => {
    setBuffer((prev) => ({
      ...prev,
      [resourceId]: {
        ...prev[resourceId],
        projectDetails: {
          ...prev[resourceId]?.projectDetails,
          ...data,
        },
      },
    }))
  }

  const clearBuffer = (resourceId: string) => {
    setBuffer((prev) => {
      const next = { ...prev }

      delete next[resourceId]

      return next
    })
  }

  return (
    <ResourceBufferContext.Provider
      value={{
        buffer,
        getBuffer,
        updateBasicInfo,
        updateProjectDetails,
        clearBuffer,
      }}
    >
      {children}
    </ResourceBufferContext.Provider>
  )
}
