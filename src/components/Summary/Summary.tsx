import { useParams } from 'react-router-dom';

import clsx from 'clsx';

import { DraftValue } from '../DraftValue';

import styles from './Summary.module.css';
import type { SummaryProps, SummaryStep } from './Summary.types';
import { ResourceStatus } from '@/api/types';
import { EMPTY_VALUE } from '@/constants/constants';
import { FIELD_NAMES } from '@/constants/fieldNames';
import { FIELD_LABELS } from '@/constants/labels';
import { useResourceBuffer } from '@/hooks/useResourceBuffer';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

const {
  DESCRIPTION_LABEL,
  EMAIL_LABEL,
  OWNER_LABEL,
  PRIORITY_LABEL,
  BUDGET_LABEL,
  CATEGORY_LABEL,
  OPTIONS_LABEL,
  PROJECT_NAME_LABEL,
  SUMMARY_STATUS_LABEL,
  RESOURCE_NAME_LABEL,
} = FIELD_LABELS;

const {
  DESCRIPTION_FIELD_NAME,
  EMAIL_FIELD_NAME,
  OWNER_FIELD_NAME,
  PRIORITY_FIELD_NAME,
  BUDGET_FIELD_NAME,
  PROJECT_CATEGORY_FIELD_NAME,
  OPTIONS_FIELD_NAME,
} = FIELD_NAMES;

/**
 * Read-only summary of all modules of a resource, one card per module.
 *
 * Missing sections are treated as empty, so the component renders during loading
 * or when a module has not been filled in yet.
 */
export function Summary({ data }: SummaryProps) {
  const { resourceId } = useParams();

  const { description, email, owner, priority, name, projectDetails } =
    data ?? {};

  const basicInfoCompleted = isModuleCompleted({
    description,
    email,
    owner,
    priority,
    name,
  });
  const projectDetailsCompleted = isModuleCompleted(projectDetails);
  const allCompleted = basicInfoCompleted && projectDetailsCompleted;

  const { budget, projectCategory, options, projectName } =
    projectDetails ?? {};

  const { getBuffer } = useResourceBuffer();

  const draft = getBuffer(resourceId ?? '');

  const generalInfoDraft = draft;
  const projectDetailsDraft = draft?.projectDetails;

  const steps: SummaryStep[] = [
    {
      title: 'General Information',
      completed: basicInfoCompleted,
      information: [
        {
          label: DESCRIPTION_LABEL,
          value: (
            <DraftValue
              draft={generalInfoDraft}
              field={DESCRIPTION_FIELD_NAME}
              originalValue={description}
            />
          ),
        },
        {
          label: EMAIL_LABEL,
          value: (
            <DraftValue
              draft={generalInfoDraft}
              field={EMAIL_FIELD_NAME}
              originalValue={email}
            />
          ),
        },
        {
          label: OWNER_LABEL,
          value: (
            <DraftValue
              draft={generalInfoDraft}
              field={OWNER_FIELD_NAME}
              originalValue={owner}
            />
          ),
        },
        {
          label: PRIORITY_LABEL,
          value: (
            <DraftValue
              draft={generalInfoDraft}
              field={PRIORITY_FIELD_NAME}
              originalValue={priority}
            />
          ),
        },
        {
          label: RESOURCE_NAME_LABEL,
          value: name ?? '',
        },
      ],
    },
    {
      title: 'Project Details',
      completed: projectDetailsCompleted,
      information: [
        {
          label: BUDGET_LABEL,
          value: (
            <DraftValue
              draft={projectDetailsDraft}
              field={BUDGET_FIELD_NAME}
              originalValue={budget}
            />
          ),
        },
        {
          label: CATEGORY_LABEL,
          value: (
            <DraftValue
              draft={projectDetailsDraft}
              field={PROJECT_CATEGORY_FIELD_NAME}
              originalValue={projectCategory}
            />
          ),
        },
        {
          label: OPTIONS_LABEL,
          value: (
            <DraftValue
              draft={projectDetailsDraft}
              field={OPTIONS_FIELD_NAME}
              originalValue={options}
            />
          ),
        },
        {
          label: PROJECT_NAME_LABEL,
          value: projectName ?? '',
        },
      ],
    },
    {
      title: 'Provision Resource',
      completed: allCompleted,
      information: [
        {
          label: SUMMARY_STATUS_LABEL,
          value: !allCompleted
            ? 'Waiting for modules'
            : data.status === ResourceStatus.COMPLETED
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
