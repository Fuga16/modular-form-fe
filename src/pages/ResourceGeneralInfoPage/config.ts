import type { GeneralInfoFormValues } from './ResourceGeneralInfoPage.types';
import { RESOURCE_PRIORITY, RESOURCE_PRIORITY_VALUES } from '@/api/types';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { FIELD_NAMES } from '@/constants/fieldNames';
import { FIELD_LABELS } from '@/constants/labels';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  ALLOWED_EMAIL_FORMAT_REGEX,
  SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX,
} from '@/constants/validation';
import { FIELD_WARNINGS } from '@/constants/warnings';
import { mapToOptions } from '@/utils/mapToOptions';

const { DESCRIPTION, EMAIL, OWNER } = FIELD_TOOLTIPS;
const { EMAIL_WARNING } = FIELD_WARNINGS;
const { DESCRIPTION_LABEL, EMAIL_LABEL, OWNER_LABEL, PRIORITY_LABEL } =
  FIELD_LABELS;
const {
  DESCRIPTION_FIELD_NAME,
  EMAIL_FIELD_NAME,
  OWNER_FIELD_NAME,
  PRIORITY_FIELD_NAME,
} = FIELD_NAMES;

export const basicInfoFieldsConfig: FieldConfig<GeneralInfoFormValues>[] = [
  {
    label: DESCRIPTION_LABEL,
    name: DESCRIPTION_FIELD_NAME,
    type: 'textarea',
    tooltip: DESCRIPTION,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
  },
  {
    label: EMAIL_LABEL,
    name: EMAIL_FIELD_NAME,
    type: 'input',
    tooltip: EMAIL,
    rules: {
      pattern: ALLOWED_EMAIL_FORMAT_REGEX,
      message: EMAIL_WARNING,
    },
  },
  {
    label: OWNER_LABEL,
    name: OWNER_FIELD_NAME,
    type: 'input',
    tooltip: OWNER,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
  },
  {
    label: PRIORITY_LABEL,
    name: PRIORITY_FIELD_NAME,
    type: 'select',
    options: mapToOptions(RESOURCE_PRIORITY_VALUES),
    defaultValue: RESOURCE_PRIORITY.LOW,
  },
];
