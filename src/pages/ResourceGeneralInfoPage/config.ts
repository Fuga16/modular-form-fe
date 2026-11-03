import type { GeneralInfoFormValues } from './ResourceGeneralInfoPage.types';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { RESOURCE_PRIORITY_VALUES } from '@/constants/ResourcePriority';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import { mapToOptions } from '@/utils/mapToOptions';

/** Characters removed from the description: letters, digits, spaces and hyphens are kept. */
const INVALID_DESCRIPTION_CHARS = /[^A-Za-z0-9 -]/g;

/** Characters removed from the owner: letters and spaces are kept. */
const INVALID_OWNER_CHARS = /[^A-Za-z ]/g;

/** Basic shape check for an email address. Not a full RFC validation. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { description, email, owner } = FIELD_TOOLTIPS;

export const basicInfoFieldsConfig: FieldConfig<GeneralInfoFormValues>[] = [
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
    defaultValue: RESOURCE_PRIORITY_VALUES[0],
  },
];
