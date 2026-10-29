import { defineSelectField } from '../FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '../FormFieldsRenderer/FormFieldsRenderer.types';

import type { CreateResourceFormValues } from './CreateResourceModal.types';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  EMAIL_REGEX,
  INVALID_RESOURCE_NAME_CHARS,
} from '@/constants/validation';

export const DEFAULT_VALUES: CreateResourceFormValues = {
  name: '',
  email: '',
  priority: 'high',
};

export const MODAL_TITLE = 'Add Resource';

export const RESOURCE_NAME_LABEL = 'Resource Name';

export const RESOURCE_NAME_PLACEHOLDER = 'MacBook Pro';

export const RESOURCE_NAME_TOOLTIP =
  'Name of the resource; letters, digits and spaces only.';

export const RESOURCE_NAME_REQUIRED_ERROR = 'Resource name is required';

export const CREATE_RESOURCE_ERROR =
  'Could not create resource. Please try again.';

export const CANCEL_LABEL = 'Cancel';

export const CREATING_LABEL = 'Creating…';

/** Form fields rendered in the modal. */
export const fieldsConfig: FieldConfig<CreateResourceFormValues>[] = [
  {
    label: RESOURCE_NAME_LABEL,
    name: 'name',
    type: 'input',
    tooltip: RESOURCE_NAME_TOOLTIP,
    sanitize: (value: string) => value.replace(INVALID_RESOURCE_NAME_CHARS, ''),
    placeholder: RESOURCE_NAME_PLACEHOLDER,
    rules: {
      pattern: /^[a-zA-Z0-9 ]*$/,
      message: RESOURCE_NAME_REQUIRED_ERROR,
    },
  },
  defineSelectField<CreateResourceFormValues, 'high' | 'low'>({
    name: 'priority',
    label: 'Technical Priority',
    type: 'select',
    options: [
      { value: 'high', label: 'Technical High' },
      { value: 'low', label: 'Technical Low' },
    ],
    defaultValue: 'high',
  }),
  {
    label: 'Technical Email',
    name: 'email',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.email,
    sanitize: (value: string) => value.replace(EMAIL_REGEX, ''),
  },
];
