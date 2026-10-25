import type { BasicInfo, ProjectDetails } from '../../api/types';

/**
 * Progress state of one step.
 * - `completed`: the step is filled in.
 * - `active`: the step is the one the user should work on now.
 * - `locked`: the step is not available yet.
 */
export type StepStatus = 'completed' | 'active' | 'locked';

/** One step in the progress list. */
export interface Step {
  /** Name of the step, shown as a heading. */
  title: string;
  /** Short description of the step. */
  description: string;
  /** Current progress state. */
  status: StepStatus;
  /** URL of the icon shown inside the circle. */
  icon: string;
}

/** Data the progress is calculated from. Each section is optional until it is loaded. */
export interface StepperData {
  /** Basic info section, if it has been loaded. */
  basicInfo?: BasicInfo;
  /** Project details section, if it has been loaded. */
  projectDetails?: ProjectDetails;
}

/** Props for the Stepper component. */
export interface StepperProps {
  /** Source data for the step statuses. */
  data: StepperData;
}
