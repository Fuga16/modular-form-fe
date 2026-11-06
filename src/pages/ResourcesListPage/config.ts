import type {
  ResourceTable,
  ResourcesFilters,
} from './ResourcesListPage.types';
import type { ResourceStatus } from '@/api/types';
import { defineSelectField } from '@/components/FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import type { TableColumn } from '@/components/Table';
import { FIELD_NAMES } from '@/constants/fieldNames';
import { FIELD_LABELS } from '@/constants/labels';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  SANITIZE_EMAIL_FORMAT_REGEX,
  SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX,
} from '@/constants/validation';
import { formatIsoDate } from '@/utils/formatIsoDate';

/** Formats a date value for the table. Non-string values are converted with `String` first. */
const isoDateConverter = (value: unknown) =>
  formatIsoDate(typeof value === 'string' ? value : String(value));

const { PROJECT_NAME, EMAIL, OWNER, CREATED_AT_RANGE, UPDATED_AT_RANGE } =
  FIELD_TOOLTIPS;

const {
  RESOURCE_NAME_LABEL,
  EMAIL_LABEL,
  PRIORITY_LABEL,
  STATUS_LABEL,
  OWNER_LABEL,
  CREATED_DATE_LABEL,
  UPDATED_DATE_LABEL,
  DESCRIPTION_LABEL,
} = FIELD_LABELS;

const {
  RESOURCE_NAME_FIELD_NAME,
  EMAIL_FIELD_NAME,
  OWNER_FIELD_NAME,
  PRIORITY_FIELD_NAME,
  STATUS_FIELD_NAME,
  CREATED_AT_FROM_FIELD_NAME,
  CREATED_AT_TO_FIELD_NAME,
  UPDATED_AT_FROM_FIELD_NAME,
  UPDATED_AT_TO_FIELD_NAME,
  DESCRIPTION_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  UPDATED_AT_FIELD_NAME,
} = FIELD_NAMES;

/** Filter fields rendered above the table. */
export const filtersConfig: FieldConfig<ResourcesFilters>[] = [
  {
    label: RESOURCE_NAME_LABEL,
    name: RESOURCE_NAME_FIELD_NAME,
    type: 'input',
    tooltip: PROJECT_NAME,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
    required: false,
  },
  defineSelectField<ResourcesFilters, ResourceStatus>({
    name: STATUS_FIELD_NAME,
    label: STATUS_LABEL,
    type: 'select',
    options: [
      { value: 'PROCESSING', label: 'Processing' },
      { value: 'COMPLETED', label: 'Completed' },
    ],
    defaultValue: 'PROCESSING',
    required: false,
  }),
  {
    label: EMAIL_LABEL,
    name: EMAIL_FIELD_NAME,
    type: 'input',
    tooltip: EMAIL,
    sanitize: (value: string) => value.replace(SANITIZE_EMAIL_FORMAT_REGEX, ''),
    required: false,
  },
  {
    label: OWNER_LABEL,
    name: OWNER_FIELD_NAME,
    type: 'input',
    tooltip: OWNER,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
    required: false,
  },
  defineSelectField<ResourcesFilters, 'HIGH' | 'MIDDLE' | 'LOW'>({
    name: PRIORITY_FIELD_NAME,
    label: PRIORITY_LABEL,
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
    label: CREATED_DATE_LABEL,
    type: 'daterange',
    from: CREATED_AT_FROM_FIELD_NAME,
    to: CREATED_AT_TO_FIELD_NAME,
    tooltip: CREATED_AT_RANGE,
    required: false,
  },
  {
    label: UPDATED_DATE_LABEL,
    type: 'daterange',
    from: UPDATED_AT_FROM_FIELD_NAME,
    to: UPDATED_AT_TO_FIELD_NAME,
    tooltip: UPDATED_AT_RANGE,
    required: false,
  },
];

/** Columns of the resources table. */
export const tableConfig: TableColumn<ResourceTable>[] = [
  {
    title: RESOURCE_NAME_LABEL,
    fieldName: RESOURCE_NAME_FIELD_NAME,
  },
  {
    title: DESCRIPTION_LABEL,
    fieldName: DESCRIPTION_FIELD_NAME,
  },
  {
    title: EMAIL_LABEL,
    fieldName: EMAIL_FIELD_NAME,
  },
  {
    title: OWNER_LABEL,
    fieldName: OWNER_FIELD_NAME,
  },
  {
    title: PRIORITY_LABEL,
    fieldName: PRIORITY_FIELD_NAME,
  },
  {
    title: STATUS_LABEL,
    fieldName: STATUS_FIELD_NAME,
  },
  {
    title: CREATED_DATE_LABEL,
    fieldName: CREATED_AT_FIELD_NAME,
    converter: isoDateConverter,
    sortable: true,
  },
  {
    title: UPDATED_DATE_LABEL,
    fieldName: UPDATED_AT_FIELD_NAME,
    converter: isoDateConverter,
  },
];
