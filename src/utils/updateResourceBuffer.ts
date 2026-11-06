import type { GeneralInfo, ProjectDetails } from '@/api/types';
import type { ResourceBufferItem } from '@/components';

type UpdateResourceBufferParams =
  | {
      section: 'generalInfo';
      currentBuffer?: ResourceBufferItem;
      changes: Partial<GeneralInfo>;
    }
  | {
      section: 'projectDetails';
      currentBuffer?: ResourceBufferItem;
      changes: Partial<ProjectDetails>;
    };

export function updateResourceBuffer({
  section,
  currentBuffer = {},
  changes,
}: UpdateResourceBufferParams): ResourceBufferItem {
  if (section === 'generalInfo') {
    const { projectDetails } = currentBuffer;

    return {
      ...changes,
      ...(projectDetails && Object.keys(projectDetails).length > 0
        ? { projectDetails }
        : {}),
    };
  }

  const nextBuffer = { ...currentBuffer };

  delete nextBuffer.projectDetails;

  return {
    ...nextBuffer,
    ...(Object.keys(changes).length > 0 ? { projectDetails: changes } : {}),
  };
}
