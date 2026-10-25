import type { Resource } from '../../api/types';

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

/** Props for the Summary component. */
export interface SummaryProps {
  /** Resource whose sections are summarized. */
  resource: Resource;
}
