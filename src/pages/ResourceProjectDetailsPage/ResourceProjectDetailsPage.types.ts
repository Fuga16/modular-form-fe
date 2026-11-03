import type { ResourceProjectCategory } from '@/constants/ResourceProjectCategory';
import type { TeamMember } from '@/constants/TeamOptions';

export interface ProjectDetailsFormValues {
  budget: string;
  projectCategory: ResourceProjectCategory | '';
  options: TeamMember[];
  projectName: string;
}
