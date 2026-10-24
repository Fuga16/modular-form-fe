import type { Resource } from '@/api/types';

export type StepStatus = 'done' | 'working' | 'pending';

export interface Step {
  title: string;
  information: {
    label: string;
    value: string;
  }[];
  status: StepStatus;
}

export interface SummaryProps {
  resource: Resource;
}
