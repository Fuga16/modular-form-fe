import { areValuesEqual } from './areValuesEqual';

export const getChangedFields = <T extends object>(
  original: T,
  updated: T,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key of Object.keys(original) as (keyof T)[]) {
    if (!areValuesEqual(original[key], updated[key])) {
      result[key] = updated[key];
    }
  }

  return result;
};
