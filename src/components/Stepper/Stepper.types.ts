import type { Resource } from '@/api/types';

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

/** Props for the Stepper component. */
export interface StepperProps {
  /** Source data for the step statuses. */
  data: Resource;
}
