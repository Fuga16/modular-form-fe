import { forwardRef } from 'react';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import styles from './Breadcrumb.module.css';
import type { BreadcrumbProps } from './Breadcrumb.types';

/**
 * Navigation trail showing the user's location in the page hierarchy.
 *
 * The last item is the current page: it gets `aria-current="page"` and is
 * styled as active. Items are separated visually by a `/` drawn in CSS.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ items, className }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={clsx(styles.nav, className)}
      >
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;

            return (
              <li
                key={item.href}
                className={styles.item}
              >
                <Link
                  to={item.href}
                  className={styles.link}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
