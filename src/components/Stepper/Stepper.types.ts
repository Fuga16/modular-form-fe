import type { BasicInfo, ProjectDetails } from '@/api/types'

export type StepStatus = 'completed' | 'active' | 'locked'

export interface Step {
  title: string
  description: string
  status: StepStatus
  icon: string
}

export interface StepperData {
  basicInfo?: BasicInfo
  projectDetails?: ProjectDetails
}

export interface StepperProps {
  data: StepperData
}
