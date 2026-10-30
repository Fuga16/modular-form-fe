import type { GeneralInfo, ProjectDetails } from '@/api/types';

/** Any module whose completion is checked. */
export type ModuleCompletionInput = GeneralInfo | ProjectDetails;

/**
 * Returns true when the module has data for every required field.
 * A missing module (`undefined`) is never complete.
 */
export function isModuleCompleted(
  module: ModuleCompletionInput | undefined,
): boolean {
  if (!module) {
    return false;
  }

  return Object.values(module).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
  });
}
