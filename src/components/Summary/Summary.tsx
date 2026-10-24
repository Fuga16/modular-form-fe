import {
  SummaryBody,
  SummaryCard,
  SummaryGrid,
  SummaryHeader,
  SummaryLabel,
  SummaryRow,
  SummaryStatus,
  SummaryTitle,
  SummaryValue,
} from './Summary.styles';
import type { SummaryProps } from './Summary.types';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

export function Summary({ resource }: SummaryProps) {
  const basicInfoCompleted = isModuleCompleted(resource.basicInfo);
  const projectDetailsCompleted = isModuleCompleted(resource.projectDetails);

  const steps = [
    {
      title: 'Basic Info',
      status: basicInfoCompleted,
      information: [
        {
          label: 'Description',
          value: resource.basicInfo.description,
        },
        {
          label: 'Email',
          value: resource.basicInfo.email,
        },
        {
          label: 'Owner',
          value: resource.basicInfo.owner,
        },
        {
          label: 'Priority',
          value: resource.basicInfo.priority,
        },
        {
          label: 'Resource name',
          value: resource.basicInfo.resourceName,
        },
      ],
    },
    {
      title: 'Project Details',
      status: projectDetailsCompleted,
      information: [
        {
          label: 'Budget',
          value: resource.projectDetails.budget,
        },
        {
          label: 'Category',
          value: resource.projectDetails.category,
        },
        {
          label: 'Options',
          value: resource.projectDetails.options.join(', '),
        },
        {
          label: 'Project name',
          value: resource.projectDetails.projectName,
        },
      ],
    },
    {
      title: 'Provision Resource',
      status: basicInfoCompleted && projectDetailsCompleted,
      information: [
        {
          label: '',
          value:
            !basicInfoCompleted || !projectDetailsCompleted
              ? 'Waiting for modules'
              : resource.status === 'completed'
                ? 'Resource has been Provisioned'
                : 'Ready for Provisioning',
        },
      ],
    },
  ];

  return (
    <SummaryGrid>
      {steps.map(({ title, information, status }) => (
        <SummaryCard key={title}>
          <SummaryHeader>
            <div>
              <SummaryTitle>{title}</SummaryTitle>

              <SummaryStatus $completed={status}>
                {status ? 'Completed' : 'Incomplete'}
              </SummaryStatus>
            </div>
          </SummaryHeader>

          <SummaryBody>
            {information.map(({ label, value }) => (
              <SummaryRow key={`${title}-${label}`}>
                <SummaryLabel>{label}</SummaryLabel>

                <SummaryValue>{value || '-'}</SummaryValue>
              </SummaryRow>
            ))}
          </SummaryBody>
        </SummaryCard>
      ))}
    </SummaryGrid>
  );
}
