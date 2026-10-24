import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { RESOURCE_PRIORITY_VALUES } from '@/constants/ResourcePriority';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import { mapToOptions } from '@/utils/mapToOptions';

const INVALID_DESCRIPTION_CHARS = /[^A-Za-z0-9 -]/g;
const INVALID_OWNER_CHARS = /[^A-Za-z ]/g;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { description, email, owner } = FIELD_TOOLTIPS;

export const basicInfoFieldsConfig: FieldConfig[] = [
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    tooltip: description,
    sanitize: (value: string) => value.replace(INVALID_DESCRIPTION_CHARS, ''),
  },
  {
    label: 'Email',
    name: 'email',
    type: 'input',
    tooltip: email,
    rules: {
      pattern: EMAIL_PATTERN,
      message: 'Please enter a valid email address.',
    },
  },
  {
    label: 'Owner',
    name: 'owner',
    type: 'input',
    tooltip: owner,
    sanitize: (value: string) => value.replace(INVALID_OWNER_CHARS, ''),
  },
  {
    label: 'Priority',
    name: 'priority',
    type: 'select',
    options: mapToOptions(RESOURCE_PRIORITY_VALUES),
  },
];
