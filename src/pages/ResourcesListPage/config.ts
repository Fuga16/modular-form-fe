import type {
  ResourceTable,
  ResourcesFilters,
} from './ResourcesListPage.types';
import { defineSelectField } from '@/components/FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import type { TableColumn } from '@/components/Table';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  EMAIL_FORMAT_REGEX,
  LETTERS_AND_NUMBERS_REGEX,
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
    tooltip: FIELD_TOOLTIPS.projectName,
    sanitize: (value: string) => value.replace(LETTERS_AND_NUMBERS_REGEX, ''),
    required: false,
  },
  defineSelectField<ResourcesFilters, 'active' | 'archived'>({
    name: 'status',
    label: 'Technical Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Technical Active' },
      { value: 'archived', label: 'Technical Archived' },
    ],
    defaultValue: 'active',
    required: false,
  }),
  {
    label: 'Technical Email',
    name: 'email',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.email,
    sanitize: (value: string) => value.replace(EMAIL_FORMAT_REGEX, ''),
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
