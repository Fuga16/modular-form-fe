import type { BreadcrumbItem } from '@/components';

export type BreadcrumbSection =
  'overview' | 'details' | 'basic-info' | 'project-details';

interface GetBreadcrumbsParams {
  resourceId?: string;
  name?: string;
  section?: BreadcrumbSection;
}

export const getBreadcrumbs = ({
  resourceId,
  name,
  section,
}: GetBreadcrumbsParams): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    {
      label: 'Resources List',
      href: '/resources',
    },
  ];

  if (!resourceId || !name) {
    return items;
  }

  const overviewItem: BreadcrumbItem = {
    label: `Resource Overview: ${name}`,
    href: `/resources/${resourceId}`,
  };

  const detailsItem: BreadcrumbItem = {
    label: `Resource Details: ${name}`,
    href: `/resources/${resourceId}/details`,
  };

  switch (section) {
    case 'overview':
      items.push(overviewItem);
      break;

    case 'details':
      items.push(overviewItem, detailsItem);
      break;

    case 'basic-info':
      items.push(overviewItem, detailsItem, {
        label: 'Basic Info',
        href: `/resources/${resourceId}/basic-info`,
      });
      break;

    case 'project-details':
      items.push(overviewItem, detailsItem, {
        label: 'Project Details',
        href: `/resources/${resourceId}/project-details`,
      });
      break;
  }

  return items;
};
