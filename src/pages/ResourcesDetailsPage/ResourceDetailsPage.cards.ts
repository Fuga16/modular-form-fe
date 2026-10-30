import type { NavigateFunction } from 'react-router-dom';

import type { DetailCardConfig } from './ResourceDetailsPage.types';
import type { Resource } from '@/api/types';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

/** Parameters for `buildDetailsCards`. */
interface BuildDetailsCardsParams {
  /** Resource whose sections are shown. */
  resource: Resource;
  /** Resource id used in the navigation paths. */
  resourceId: string;
  /** Router navigation function. */
  navigate: NavigateFunction;
  /** Opens the provision confirmation dialog. */
  onProvision: () => void;
}

/**
 * Builds the three cards of the details page: general information, project details and provisioning.
 *
 * Project details is locked until general information is complete. Provisioning is locked
 * until both sections are complete, and is closed once the resource is completed.
 */
export function buildDetailsCards({
  resource,
  resourceId,
  navigate,
  onProvision,
}: BuildDetailsCardsParams): DetailCardConfig[] {
  const { name, owner, description, email, priority, projectDetails, status } =
    resource;
  const generalInfoCompleted = isModuleCompleted({
    name,
    owner,
    description,
    email,
    priority,
  });
  const projectDetailsCompleted = isModuleCompleted(projectDetails);
  const isCompleted = status === 'completed';

  return [
    {
      title: 'General Information',
      status: generalInfoCompleted,
      information: [
        { label: 'Description', value: description },
        { label: 'Email', value: email },
        { label: 'Owner', value: owner },
        { label: 'Priority', value: priority },
        { label: 'Resource name', value: name },
      ],
      onOpen: () => navigate(`/resources/${resourceId}/general-info`),
    },
    {
      title: 'Project Details',
      status: projectDetailsCompleted,
      icon: '🚧',
      information: [
        { label: 'Budget', value: projectDetails?.budget },
        { label: 'Category', value: projectDetails?.category },
        {
          label: 'Options',
          value: projectDetails?.options.join(', '),
        },
        {
          label: 'Project name',
          value: projectDetails?.projectName,
        },
      ],
      onOpen: () => navigate(`/resources/${resourceId}/project-details`),
      disabled: !generalInfoCompleted,
    },
    {
      title: 'Provisioning',
      status: isCompleted,
      icon: '✅',
      onOpen: onProvision,
      disabled:
        !generalInfoCompleted || !projectDetailsCompleted || isCompleted,
      actionLabel: 'Provision Resource',
    },
  ];
}
