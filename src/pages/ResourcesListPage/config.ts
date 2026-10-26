import type {
  ResourceTable,
  ResourcesFilters,
} from './ResourcesListPage.types';
import { defineSelectField } from '@/components/FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import type { TableColumn } from '@/components/Table';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import { formatIsoDate } from '@/utils/formatIsoDate';

/** Characters removed from the name filter: letters, digits, spaces and hyphens are kept. */
const INVALID_RESOURCE_NAME_CHARS = /[^A-Za-z0-9 -]/g;

/** Formats a date value for the table. Non-string values are converted with `String` first. */
const isoDateConverter = (value: unknown) =>
  formatIsoDate(typeof value === 'string' ? value : String(value));

/** Filter fields rendered above the table. */
export const filtersConfig: FieldConfig<ResourcesFilters>[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.projectName,
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

/** Columns of the resources table. */
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
