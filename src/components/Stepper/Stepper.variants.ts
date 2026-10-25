import type { StepStatus } from './Stepper.types';

/** Text shown under each step, keyed by status. */
export const STEP_STATUS_LABELS: Record<StepStatus, string> = {
  completed: 'Completed',
  active: 'In Progress',
  locked: 'Locked',
};
