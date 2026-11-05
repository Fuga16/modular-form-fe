import type { JSX } from 'react/jsx-runtime';

import type { Resource } from '@/api/types';

/** One row of information in a summary card. */
export interface SummaryInfoItem {
  /** Name of the field. An empty label renders the row without a label. */
  label: string;
  /** Value of the field. An empty value renders as `-`. */
  value: JSX.Element | string;
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

/** Props for the Summary component. */
export interface SummaryProps {
  /** Source data for the step statuses. */
  data: Resource;
}
