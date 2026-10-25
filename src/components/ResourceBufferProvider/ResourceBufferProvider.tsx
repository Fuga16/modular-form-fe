import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import type { BasicInfo, ProjectDetails } from '../../api/types';
import { ResourceBufferContext } from '../../context/ResourceBufferContext';

import type {
  ResourceBuffer,
  ResourceBufferContextValue,
} from './ResourceBufferProvider.types';

/**
 * Keeps unsaved edits for resources outside of the form that is currently mounted,
 * so they survive navigation between screens.
 *
 * Updates use functional `setState`, so the callbacks stay stable and do not
 * depend on the buffer. Only `getBuffer` changes identity when the buffer changes.
 */
export function ResourceBufferProvider({ children }: PropsWithChildren) {
  const [buffer, setBuffer] = useState<ResourceBuffer>({});

  const getBuffer = useCallback(
    (resourceId: string) => buffer[resourceId],
    [buffer],
  );

  const updateBasicInfo = useCallback(
    (resourceId: string, data: Partial<BasicInfo>) => {
      setBuffer((prev) => ({
        ...prev,
        [resourceId]: {
          ...prev[resourceId],
          basicInfo: {
            ...prev[resourceId]?.basicInfo,
            ...data,
          },
        },
      }));
    },
    [],
  );

  const updateProjectDetails = useCallback(
    (resourceId: string, data: Partial<ProjectDetails>) => {
      setBuffer((prev) => ({
        ...prev,
        [resourceId]: {
          ...prev[resourceId],
          projectDetails: {
            ...prev[resourceId]?.projectDetails,
            ...data,
          },
        },
      }));
    },
    [],
  );

  const clearBuffer = useCallback((resourceId: string) => {
    setBuffer((prev) => {
      // Copy first so the previous state object is not mutated.
      const next = { ...prev };
      delete next[resourceId];
      return next;
    });
  }, []);

  const value = useMemo<ResourceBufferContextValue>(
    () => ({
      buffer,
      getBuffer,
      updateBasicInfo,
      updateProjectDetails,
      clearBuffer,
    }),
    [buffer, getBuffer, updateBasicInfo, updateProjectDetails, clearBuffer],
  );

  return (
    <ResourceBufferContext.Provider value={value}>
      {children}
    </ResourceBufferContext.Provider>
  );
}
