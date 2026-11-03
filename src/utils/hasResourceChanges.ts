import type { UpdateResourcePayload } from '@/api/types';

export function hasResourceChanges(changes: UpdateResourcePayload): boolean {
  return (
    Object.keys(changes).some((key) => key !== 'projectDetails') ||
    (changes.projectDetails !== undefined &&
      Object.keys(changes.projectDetails).length > 0)
  );
}
