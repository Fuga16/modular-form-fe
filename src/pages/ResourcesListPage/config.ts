import type {
  ResourceTable,
  ResourcesFilters,
} from './ResourcesListPage.types';
import type { ResourceStatus } from '@/api/types';
import { defineSelectField } from '@/components/FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import type { TableColumn } from '@/components/Table';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  SANITIZE_EMAIL_FORMAT_REGEX,
  SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX,
} from '@/constants/validation';
import { formatIsoDate } from '@/utils/formatIsoDate';

/** Formats a date value for the table. Non-string values are converted with `String` first. */
const isoDateConverter = (value: unknown) =>
  formatIsoDate(typeof value === 'string' ? value : String(value));

/** Filter fields rendered above the table. */
export const filtersConfig: FieldConfig<ResourcesFilters>[] = [
  {
    label: 'Technical Name',
    name: 'name',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.name,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
    required: false,
  },
  defineSelectField<ResourcesFilters, ResourceStatus>({
    name: 'status',
    label: 'Technical Status',
    type: 'select',
    options: [
      { value: 'PROCESSING', label: 'Technical Processing' },
      { value: 'COMPLETED', label: 'Technical Completed' },
    ],
    defaultValue: 'PROCESSING',
    required: false,
  }),
  {
    label: 'Technical Email',
    name: 'email',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.email,
    sanitize: (value: string) => value.replace(SANITIZE_EMAIL_FORMAT_REGEX, ''),
    required: false,
  },
  {
    label: 'Resource Owner',
    name: 'owner',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.owner,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
    required: false,
  },
  defineSelectField<ResourcesFilters, 'HIGH' | 'MIDDLE' | 'LOW'>({
    name: 'priority',
    label: 'Technical priority',
    type: 'select',
    options: [
      { value: 'HIGH', label: 'High priority' },
      { value: 'MIDDLE', label: 'Middle priority' },
      { value: 'LOW', label: 'Low priority' },
    ],
    defaultValue: 'HIGH',
    required: false,
  }),
  {
    label: 'Created At',
    type: 'daterange',
    from: 'createdAtFrom',
    to: 'createdAtTo',
    tooltip: FIELD_TOOLTIPS.createdAtRange,
    required: false,
  },
  {
    label: 'Updated At',
    type: 'daterange',
    from: 'updatedAtFrom',
    to: 'updatedAtTo',
    tooltip: FIELD_TOOLTIPS.updatedAtRange,
    required: false,
  },
];

/** Columns of the resources table. */
export const tableConfig: TableColumn<ResourceTable>[] = [
  {
    title: 'Technical Name',
    fieldName: 'name',
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
