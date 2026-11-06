import { DEFAULT_LOADING_MESSAGE } from './LoadingState.constants';
import styles from './LoadingState.module.css';
import type { LoadingStateProps } from './LoadingState.types';

/**
 * Loading placeholder with a spinner and a status message.
 *
 * `role="status"` makes the message a polite live region, so screen readers
 * announce it without moving focus. `aria-busy` tells assistive technology
 * that the region is still updating.
 */
export const LoadingState = ({
  message = DEFAULT_LOADING_MESSAGE,
}: LoadingStateProps) => {
  return (
    <div
      role="status"
      aria-busy="true"
      className={styles.container}
    >
      <div
        aria-hidden="true"
        className={styles.spinnerWrapper}
      >
        <div
          data-motion-essential
          className={styles.spinner}
        />
      </div>

      <p className={styles.message}>{message}</p>
    </div>
  );
};
