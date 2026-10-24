import type { BasicInfo, ProjectDetails } from '@/api/types';

export const isModuleCompleted = (
  module?: BasicInfo | ProjectDetails,
): boolean => {
  if (!module) {
    return false;
  }

  return Object.values(module).every(
    (value) => value !== null && value !== undefined && value !== '',
  );
};
