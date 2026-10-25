import type { MouseEvent } from 'react';

import clsx from 'clsx';

import { Badge, Card } from '../../design-system';

import styles from './ResourceCard.module.css';
import type { ResourceCardProps } from './ResourceCard.types';

/**
 * Summary card for a single resource.
 *
 * Mouse users can open the resource by clicking anywhere on the card.
 * Keyboard users open it through the footer button, which is the only
 * focusable element, so the card itself is not interactive for assistive technology.
 */
export function ResourceCard({
  title,
  information = [],
  status,
  onOpen,
  disabled = false,
  actionLabel = 'Open',
  icon = '📦',
}: ResourceCardProps) {
  const handleOpen = () => {
    if (!disabled) {
      onOpen();
    }
  };

  const handleActionClick = (event: MouseEvent) => {
    // Prevents the card click handler from opening the resource a second time.
    event.stopPropagation();
    handleOpen();
  };

  return (
    <Card
      variant="outline"
      className={clsx(styles.card, disabled && styles.disabled)}
      onClick={handleOpen}
    >
      <div className={styles.headerInfo}>
        <span
          aria-hidden="true"
          className={styles.iconBox}
        >
          {icon}
        </span>

        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>

          <Badge variant={status ? 'success' : 'warning'}>
            {status ? 'Completed' : 'Incomplete'}
          </Badge>
        </div>
      </div>

      <div className={styles.content}>
        {information.filter(Boolean).map(({ label, value }) => (
          <div
            key={`${title}-${label}`}
            className={styles.row}
          >
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value || '-'}</span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.action}
          disabled={disabled}
          onClick={handleActionClick}
        >
          {actionLabel} →
        </button>
      </div>
    </Card>
  );
}

export default ResourceCard;
