import type { BasicInfo, Resource } from '@/api/types'

export type BasicInfoFormValues = Omit<BasicInfo, 'resourceName'>

export type BasicInfoDraft = {
  basicInfo?: Partial<Resource['basicInfo']>
}
