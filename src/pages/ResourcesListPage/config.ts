import { defineSelectField } from '../../components/FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '../../components/FormFieldsRenderer/FormFieldsRenderer.types';
import type { TableColumn } from '../../components/Table';
import { FIELD_TOOLTIPS } from '../../constants/tooltips';
import { formatIsoDate } from '../../utils/formatIsoDate';

import type { ResourceTable } from './ResourcesListPage.types';

const INVALID_RESOURCE_NAME_CHARS = /[^A-Za-z0-9 -]/g;

type ResourcesFilters = {
  status: string;
  type: string;
};

const isoDateConverter = (value: unknown) =>
  formatIsoDate(typeof value === 'string' ? value : String(value));

export const filtersConfig: FieldConfig[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.projectName,
    required: false,
    sanitize: (value: string) => value.replace(INVALID_RESOURCE_NAME_CHARS, ''),
  },
  defineSelectField<ResourcesFilters, 'active' | 'archived'>({
    name: 'status',
    label: 'Статус',
    type: 'select',
    options: [
      { value: 'active', label: 'Активные' },
      { value: 'archived', label: 'Архивные' },
    ],
    defaultValue: 'active',
  }),
];

export const tableConfig: TableColumn<ResourceTable>[] = [
  {
    title: 'Technical Name',
    fieldName: 'resourceName',
  },
  {
    title: 'Technical description',
    fieldName: 'description',
  },
  {
    title: 'Technical email',
    fieldName: 'email',
  },
  {
    title: 'Technical owner',
    fieldName: 'owner',
  },
  {
    title: 'Technical priority',
    fieldName: 'priority',
  },
  {
    title: 'Technical status',
    fieldName: 'status',
  },
  {
    title: 'Start date',
    fieldName: 'createdAt',
    converter: isoDateConverter,
    sortable: true,
  },
  {
    title: 'Last Activity',
    fieldName: 'updatedAt',
    converter: isoDateConverter,
  },
];
