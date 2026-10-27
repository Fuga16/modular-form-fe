import type { ResourceCategory } from '@/constants/ResourceCategory';
import type { TeamMember } from '@/constants/TeamOptions';

export interface ProjectDetailsFormValues {
  budget: string;
  category: ResourceCategory | '';
  options: TeamMember[];
  projectName: string;
}
