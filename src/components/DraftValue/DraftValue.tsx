import styles from './DraftValue.module.css';
import type { DraftValueProps } from './DraftValue.types';
import { formatValue } from './config';

export const DraftValue = ({
  draft,
  field,
  originalValue,
}: DraftValueProps) => {
  const hasChanges =
    draft !== undefined && Object.prototype.hasOwnProperty.call(draft, field);

  if (!hasChanges) {
    return <>{formatValue(originalValue)}</>;
  }

  const newValue = (draft as Record<string, unknown>)[field];

  return (
    <div>
      <p className={styles.updated_value}>{formatValue(newValue)}</p>
      <del className={styles.original_value}>{formatValue(originalValue)}</del>
    </div>
  );
};
