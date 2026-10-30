import type { GeneralInfo, ProjectDetails, ResourceStatus } from '@/api/types';

/** One row of information in a summary card. */
export interface SummaryInfoItem {
  /** Name of the field. An empty label renders the row without a label. */
  label: string;
  /** Value of the field. An empty value renders as `-`. */
  value: string;
}

/** Summary card for one module of the resource. */
export interface SummaryStep {
  /** Module name, shown as the card heading. */
  title: string;
  /** Whether the module is complete. Drives the status badge. */
  completed: boolean;
  /** Rows of information shown in the card body. */
  information: SummaryInfoItem[];
}

export interface SummaryData {
  /** General information section, if it has been loaded. */
  generalInfo?: GeneralInfo;
  /** Project details section, if it has been loaded. */
  projectDetails?: ProjectDetails;
  status: ResourceStatus;
}

/** Props for the Summary component. */
export interface SummaryProps {
  /** Source data for the step statuses. */
  data: SummaryData;
}
