import clsx from 'clsx';

import { isModuleCompleted } from '../../utils/isModuleCompleted';

import styles from './Summary.module.css';
import type { SummaryProps, SummaryStep } from './Summary.types';

/** Placeholder for an empty value. */
const EMPTY_VALUE = '-';

/**
 * Read-only summary of all modules of a resource, one card per module.
 *
 * Missing sections are treated as empty, so the component renders during loading
 * or when a module has not been filled in yet.
 */
export function Summary({ resource }: SummaryProps) {
  const basicInfo = resource.basicInfo;
  const projectDetails = resource.projectDetails;

  const basicInfoCompleted = isModuleCompleted(basicInfo);
  const projectDetailsCompleted = isModuleCompleted(projectDetails);
  const allCompleted = basicInfoCompleted && projectDetailsCompleted;

  const steps: SummaryStep[] = [
    {
      title: 'Basic Info',
      completed: basicInfoCompleted,
      information: [
        { label: 'Description', value: basicInfo?.description ?? '' },
        { label: 'Email', value: basicInfo?.email ?? '' },
        { label: 'Owner', value: basicInfo?.owner ?? '' },
        { label: 'Priority', value: basicInfo?.priority ?? '' },
        { label: 'Resource name', value: basicInfo?.resourceName ?? '' },
      ],
    },
    {
      title: 'Project Details',
      completed: projectDetailsCompleted,
      information: [
        { label: 'Budget', value: projectDetails?.budget ?? '' },
        { label: 'Category', value: projectDetails?.category ?? '' },
        {
          label: 'Options',
          value: projectDetails?.options?.join(', ') ?? '',
        },
        { label: 'Project name', value: projectDetails?.projectName ?? '' },
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
            : resource.status === 'completed'
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
