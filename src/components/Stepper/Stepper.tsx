import clsx from 'clsx';

import styles from './Stepper.module.css';
import type { StepperProps } from './Stepper.types';
import { STEP_STATUS_LABELS } from './Stepper.variants';
import { createStepperSteps } from '@/utils/createStepperSteps';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

/**
 * Progress list showing each step as completed, active, or locked.
 *
 * Statuses are derived from `data`: a step is completed when its section is
 * complete, and the first unfinished step is active.
 */
export function Stepper({ data }: StepperProps) {
  const { name, owner, email, description, priority, projectDetails } = data;
  const basicInfoCompleted = isModuleCompleted({
    name,
    owner,
    email,
    description,
    priority,
  });
  const projectDetailsCompleted = isModuleCompleted(projectDetails);
  const steps = createStepperSteps(basicInfoCompleted, projectDetailsCompleted);

  return (
    <ol
      aria-label="Progress"
      className={styles.list}
    >
      {steps.map(({ title, description, status, icon }) => (
        <li
          key={title}
          className={styles.item}
        >
          <div
            className={clsx(styles.circle, styles[status])}
            aria-hidden="true"
          >
            <img
              src={icon}
              alt=""
              className={styles.icon}
            />
          </div>

          <p className={styles.title}>{title}</p>

          <p className={styles.description}>{description}</p>

          <span className={clsx(styles.statusLabel, styles[`${status}Label`])}>
            {STEP_STATUS_LABELS[status]}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default Stepper;
