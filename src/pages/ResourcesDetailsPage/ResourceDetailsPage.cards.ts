import type { NavigateFunction } from 'react-router-dom'

import type { Resource } from '@/api/types'
import type { DetailCardConfig } from './ResourceDetailsPage.types'
import { isModuleCompleted } from '@/utils/isModuleCompleted'

interface BuildDetailsCardsParams {
  resource: Resource
  resourceId: string
  navigate: NavigateFunction
  onProvision: () => void
}

export function buildDetailsCards({
  resource,
  resourceId,
  navigate,
  onProvision,
}: BuildDetailsCardsParams): DetailCardConfig[] {
  const basicInfoCompleted = isModuleCompleted(resource.basicInfo)
  const projectDetailsCompleted = isModuleCompleted(resource.projectDetails)
  const isCompleted = resource.status === 'completed'

  return [
    {
      title: 'Basic Info',
      status: basicInfoCompleted,
      information: [
        { label: 'Description', value: resource.basicInfo.description },
        { label: 'Email', value: resource.basicInfo.email },
        { label: 'Owner', value: resource.basicInfo.owner },
        { label: 'Priority', value: resource.basicInfo.priority },
        { label: 'Resource name', value: resource.basicInfo.resourceName },
      ],
      onOpen: () => navigate(`/resources/${resourceId}/basic-info`),
    },
    {
      title: 'Project Details',
      status: projectDetailsCompleted,
      icon: '🚧',
      information: [
        { label: 'Budget', value: resource.projectDetails.budget },
        { label: 'Category', value: resource.projectDetails.category },
        {
          label: 'Options',
          value: resource.projectDetails.options.join(', '),
        },
        {
          label: 'Project name',
          value: resource.projectDetails.projectName,
        },
      ],
      onOpen: () => navigate(`/resources/${resourceId}/project-details`),
      disabled: !basicInfoCompleted,
    },
    {
      title: 'Provisioning',
      status: isCompleted,
      icon: '✅',
      onOpen: onProvision,
      disabled: !basicInfoCompleted || !projectDetailsCompleted || isCompleted,
      actionLabel: 'Provision Resource',
    },
  ]
}
