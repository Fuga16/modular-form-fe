import PositiveMark from '@/assets/positive-mark.svg';
import Progress from '@/assets/spinner.svg';
import WarningMark from '@/assets/warning-mark.svg';
import type { Step } from '@/components/Stepper';

export const createStepperSteps = (
  basicInfoCompleted: boolean,
  projectDetailsCompleted: boolean,
): Step[] => [
  {
    title: 'Basic Info',
    description: basicInfoCompleted ? 'Completed' : 'Fill required information',
    status: basicInfoCompleted ? 'completed' : 'active',
    icon: basicInfoCompleted ? PositiveMark : Progress,
  },
  {
    title: 'Project Details',
    description: !basicInfoCompleted
      ? 'Waiting for Basic Info module'
      : projectDetailsCompleted
        ? 'Completed'
        : 'Fill required information',
    status: !basicInfoCompleted
      ? 'locked'
      : projectDetailsCompleted
        ? 'completed'
        : 'active',
    icon: !basicInfoCompleted
      ? WarningMark
      : projectDetailsCompleted
        ? PositiveMark
        : Progress,
  },
  {
    title: 'Provisioning Resource',
    description:
      basicInfoCompleted && projectDetailsCompleted
        ? 'Ready for Provisioning'
        : 'Waiting for modules',
    status:
      basicInfoCompleted && projectDetailsCompleted ? 'completed' : 'locked',
    icon:
      basicInfoCompleted && projectDetailsCompleted
        ? PositiveMark
        : WarningMark,
  },
];
