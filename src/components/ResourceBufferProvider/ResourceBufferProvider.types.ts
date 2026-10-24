import type { BasicInfo, ProjectDetails } from '@/api/types'

export type ResourceBufferItem = {
  basicInfo?: Partial<BasicInfo>
  projectDetails?: Partial<ProjectDetails>
}

export type ResourceBuffer = Record<string, ResourceBufferItem>

export interface ResourceBufferContextValue {
  buffer: ResourceBuffer

  getBuffer: (resourceId: string) => ResourceBufferItem | undefined

  updateBasicInfo: (resourceId: string, data: Partial<BasicInfo>) => void

  updateProjectDetails: (resourceId: string, data: Partial<ProjectDetails>) => void

  clearBuffer: (resourceId: string) => void
}
