import type { ResourceProjectCategory } from '@/api/types';
import type { TeamMember } from '@/constants/TeamOptions';

export interface ProjectDetailsFormValues {
  budget: string;
  projectCategory: ResourceProjectCategory | '';
  options: TeamMember[];
  projectName: string;
}
