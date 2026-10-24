import { Circle, Icon, Item, List, StatusLabel, Title } from './Stepper.styles';
import type { StepperProps } from './Stepper.types';
import { createStepperSteps } from '@/utils/createStepperSteps';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

export function Stepper({ data }: StepperProps) {
  const basicInfoCompleted = isModuleCompleted(data.basicInfo);
  const projectDetailsCompleted = isModuleCompleted(data.projectDetails);
  const steps = createStepperSteps(basicInfoCompleted, projectDetailsCompleted);

  return (
    <List aria-label="Progress">
      {steps.map(({ title, status, icon }) => (
        <Item
          key={title}
          $status={status}
        >
          <Circle $status={status}>
            <Icon
              src={icon}
              alt=""
            />
          </Circle>

          <Title>{title}</Title>

          <StatusLabel $status={status}>
            {status === 'completed'
              ? 'Completed'
              : status === 'active'
                ? 'In Progress'
                : 'Locked'}
          </StatusLabel>
        </Item>
      ))}
    </List>
  );
}

export default Stepper;
