import clsx from 'clsx';

import styles from './Summary.module.css';
import type { SummaryProps, SummaryStep } from './Summary.types';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

/** Placeholder for an empty value. */
const EMPTY_VALUE = '-';

/**
 * Read-only summary of all modules of a resource, one card per module.
 *
 * Missing sections are treated as empty, so the component renders during loading
 * or when a module has not been filled in yet.
 */
export function Summary({ data }: SummaryProps) {
  const generalInfo = data.generalInfo;
  const projectDetails = data.projectDetails;

  const basicInfoCompleted = isModuleCompleted(generalInfo);
  const projectDetailsCompleted = isModuleCompleted(projectDetails);
  const allCompleted = basicInfoCompleted && projectDetailsCompleted;
  const { description, email, owner, priority, name } = generalInfo ?? {};
  const { budget, projectCategory, options, projectName } = projectDetails ?? {};

  const steps: SummaryStep[] = [
    {
      title: 'General Information',
      completed: basicInfoCompleted,
      information: [
        { label: 'Description', value: description ?? '' },
        { label: 'Email', value: email ?? '' },
        { label: 'Owner', value: owner ?? '' },
        { label: 'Priority', value: priority ?? '' },
        { label: 'Resource name', value: name ?? '' },
      ],
    },
    {
      title: 'Project Details',
      completed: projectDetailsCompleted,
      information: [
        { label: 'Budget', value: budget ?? '' },
        { label: 'Category', value: projectCategory ?? '' },
        {
          label: 'Options',
          value: options?.join(', ') ?? '',
        },
        { label: 'Project name', value: projectName ?? '' },
      ],
    },
    {
      title: 'Provision Resource',
      completed: allCompleted,
      information: [
        {
          label: 'Status',
          value: !allCompleted
            ? 'Waiting for modules'
            : data.status === 'completed'
              ? 'Resource has been Provisioned'
              : 'Ready for Provisioning',
        },
      ],
    },
  ];

  return (
    <div className={styles.grid}>
      {steps.map(({ title, completed, information }) => (
        <section
          key={title}
          className={styles.card}
          aria-labelledby={`summary-${title}`}
        >
          <header className={styles.header}>
            <p
              id={`summary-${title}`}
              className={styles.title}
            >
              {title}
            </p>

            <span
              className={clsx(
                styles.status,
                completed ? styles.statusCompleted : styles.statusIncomplete,
              )}
            >
              {completed ? 'Completed' : 'Incomplete'}
            </span>
          </header>

          <dl className={styles.body}>
            {information.map(({ label, value }) => (
              <div
                key={`${title}-${label}`}
                className={styles.row}
              >
                <dt className={styles.label}>{label}</dt>
                <dd className={styles.value}>{value || EMPTY_VALUE}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
