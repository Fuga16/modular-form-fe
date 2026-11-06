import type { ProjectDetailsFormValues } from './ResourceProjectDetailsPage.types';
import {
  RESOURCE_PROJECT_CATEGORY,
  RESOURCE_PROJECT_CATEGORY_VALUES,
} from '@/api/types';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { SELECT_TEAM_OPTIONS } from '@/constants/TeamOptions';
import { FIELD_NAMES } from '@/constants/fieldNames';
import { FIELD_LABELS } from '@/constants/labels';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import {
  SANITIZE_DIGITS_REGEX,
  SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX,
} from '@/constants/validation';
import { mapToOptions } from '@/utils/mapToOptions';

const { BUDGET, PROJECT_NAME } = FIELD_TOOLTIPS;
const { BUDGET_LABEL, CATEGORY_LABEL, OPTIONS_LABEL, PROJECT_NAME_LABEL } =
  FIELD_LABELS;
const {
  BUDGET_FIELD_NAME,
  PROJECT_CATEGORY_FIELD_NAME,
  OPTIONS_FIELD_NAME,
  PROJECT_NAME_FIELD_NAME,
} = FIELD_NAMES;

export const projectDetailsConfig: FieldConfig<ProjectDetailsFormValues>[] = [
  {
    label: BUDGET_LABEL,
    name: BUDGET_FIELD_NAME,
    type: 'input',
    required: true,
    tooltip: BUDGET,
    sanitize: (value: string) => value.replace(SANITIZE_DIGITS_REGEX, ''),
  },
  {
    label: CATEGORY_LABEL,
    name: PROJECT_CATEGORY_FIELD_NAME,
    type: 'select',
    options: mapToOptions(RESOURCE_PROJECT_CATEGORY_VALUES),
    defaultValue: RESOURCE_PROJECT_CATEGORY.INTERNAL,
  },
  {
    label: OPTIONS_LABEL,
    name: OPTIONS_FIELD_NAME,
    type: 'multiselect',
    options: SELECT_TEAM_OPTIONS,
  },
  {
    label: PROJECT_NAME_LABEL,
    name: PROJECT_NAME_FIELD_NAME,
    type: 'input',
    required: true,
    tooltip: PROJECT_NAME,
    sanitize: (value: string) =>
      value.replace(SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX, ''),
  },
];
