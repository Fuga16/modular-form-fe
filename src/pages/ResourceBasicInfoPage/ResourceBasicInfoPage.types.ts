import type { BasicInfo, Resource } from '@/api/types';

/** Values of the basic info form. The resource name is set at creation and is not editable here. */
export type BasicInfoFormValues = Omit<BasicInfo, 'resourceName'>;

/** Partial basic info kept in the resource buffer while the user is editing. */
export type BasicInfoDraft = {
  /** Unsaved basic info fields, if any. */
  basicInfo?: Partial<Resource['basicInfo']>;
};
