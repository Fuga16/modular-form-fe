import { defineSelectField } from '../FormFieldsRenderer/FormFieldsRenderer.fields';
import type { FieldConfig } from '../FormFieldsRenderer/FormFieldsRenderer.types';

import type { CreateResourceFormValues } from './CreateResourceModal.types';
import { FIELD_NAMES } from '@/constants/fieldNames';
import { FIELD_LABELS, LABELS } from '@/constants/labels';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  ALLOWED_EMAIL_FORMAT_REGEX,
  ALLOWED_LETTERS_NUMBERS_AND_SPACES_REGEX,
  SANITIZE_EMAIL_FORMAT_REGEX,
  SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX,
} from '@/constants/validation';
import { FIELD_WARNINGS } from '@/constants/warnings';

export const DEFAULT_VALUES: CreateResourceFormValues = {
  name: '',
  email: '',
  priority: 'HIGH',
};

export const CREATE_RESOURCE_ERROR =
  'Failed to create resource. Please try again.';

const { RESOURCE_NAME_PLACEHOLDER } = LABELS.CREATE_RESOURCE_MODAL;
const { PROJECT_NAME, EMAIL } = FIELD_TOOLTIPS;
const { EMAIL_WARNING, NAME_WARNING } = FIELD_WARNINGS;
const { RESOURCE_NAME_LABEL, EMAIL_LABEL, PRIORITY_LABEL } = FIELD_LABELS;
const { PRIORITY_FIELD_NAME, RESOURCE_NAME_FIELD_NAME, EMAIL_FIELD_NAME } =
  FIELD_NAMES;

/** Form fields rendered in the modal. */
export const fieldsConfig: FieldConfig<CreateResourceFormValues>[] = [
  {
    label: RESOURCE_NAME_LABEL,
    name: RESOURCE_NAME_FIELD_NAME,
    type: 'input',
    tooltip: PROJECT_NAME,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
    placeholder: RESOURCE_NAME_PLACEHOLDER,
    rules: {
      pattern: ALLOWED_LETTERS_NUMBERS_AND_SPACES_REGEX,
      message: NAME_WARNING,
    },
  },
  defineSelectField<CreateResourceFormValues, 'HIGH' | 'MIDDLE' | 'LOW'>({
    name: PRIORITY_FIELD_NAME,
    label: PRIORITY_LABEL,
    type: 'select',
    options: [
      { value: 'HIGH', label: 'High' },
      { value: 'MIDDLE', label: 'Middle' },
      { value: 'LOW', label: 'Low' },
    ],
    defaultValue: 'HIGH',
  }),
  {
    label: EMAIL_LABEL,
    name: EMAIL_FIELD_NAME,
    type: 'input',
    tooltip: EMAIL,
    sanitize: (value: string) => value.replace(SANITIZE_EMAIL_FORMAT_REGEX, ''),
    rules: {
      pattern: ALLOWED_EMAIL_FORMAT_REGEX,
      message: EMAIL_WARNING,
    },
  },
];
