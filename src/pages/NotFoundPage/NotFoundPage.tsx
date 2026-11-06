import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.css';
import { Button } from '@/design-system';

/** Route for the "Go to Resources" action. */
const RESOURCES_PATH = '/resources';

/**
 * Fallback page for unknown routes.
 *
 * The heading is the page title for assistive technology. The button navigates
 * to the resources list, the main entry point of the app.
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <section
        className={styles.card}
        aria-labelledby="not-found-title"
      >
        <span className={styles.code}>404</span>

        <h1
          id="not-found-title"
          className={styles.title}
        >
          Page Not Found
        </h1>

        <p className={styles.description}>
          The page you are looking for does not exist or may have been moved.
        </p>

        <Button
          variant="primary"
          onClick={() => navigate(RESOURCES_PATH)}
        >
          Go to Resources
        </Button>
      </section>
    </main>
  );
};

export default NotFoundPage;
