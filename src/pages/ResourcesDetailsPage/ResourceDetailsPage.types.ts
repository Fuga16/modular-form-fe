import type { BasicInfo, ProjectDetails } from '@/api/types';

export interface DetailCardItem {
  label: string;
  value: string;
}

export interface DetailCardConfig {
  title: string;
  status: boolean;
  information?: DetailCardItem[];
  onOpen: () => void;
  disabled?: boolean;
  actionLabel?: string;
  icon?: string;
}

export type ModuleCompletionInput = BasicInfo | ProjectDetails;
