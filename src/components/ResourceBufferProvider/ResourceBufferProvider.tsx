import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import type {
  ResourceBuffer,
  ResourceBufferContextValue,
  ResourceBufferItem,
} from './ResourceBufferProvider.types';
import { ResourceBufferContext } from '@/context/ResourceBufferContext';

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

  const setResourceChanges = useCallback(
    (resourceId: string, changes: ResourceBufferItem) => {
      setBuffer((prev) => {
        if (Object.keys(changes).length === 0) {
          const next = { ...prev };
          delete next[resourceId];

          return next;
        }

        return {
          ...prev,
          [resourceId]: changes,
        };
      });
    },
    [],
  );

  const clearBuffer = useCallback((resourceId: string) => {
    setBuffer((prev) => {
      const next = { ...prev };
      delete next[resourceId];

      return next;
    });
  }, []);

  const value = useMemo<ResourceBufferContextValue>(
    () => ({
      buffer,
      getBuffer,
      setResourceChanges,
      clearBuffer,
    }),
    [buffer, getBuffer, setResourceChanges, clearBuffer],
  );

  return (
    <ResourceBufferContext.Provider value={value}>
      {children}
    </ResourceBufferContext.Provider>
  );
}
