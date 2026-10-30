import type { ProjectDetailsFormValues } from './ResourceProjectDetailsPage.types';
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types';
import { RESOURCE_CATEGORY_VALUES } from '@/constants/ResourceCategory';
import { SELECT_TEAM_OPTIONS } from '@/constants/TeamOptions';
import { FIELD_TOOLTIPS } from '@/constants/tooltips';
import { mapToOptions } from '@/utils/mapToOptions';

/** Characters removed from the budget: only digits are kept. */
const DIGITS_ONLY = /\D/g;

/** Characters removed from the project name: letters, digits, spaces and hyphens are kept. */
const INVALID_PROJECT_NAME_CHARS = /[^A-Za-z0-9 -]/g;

const { budget, projectName } = FIELD_TOOLTIPS;

export const projectDetailsConfig: FieldConfig<ProjectDetailsFormValues>[] = [
  {
    label: 'Budget',
    name: 'budget',
    type: 'input',
    required: true,
    tooltip: budget,
    sanitize: (value: string) => value.replace(DIGITS_ONLY, ''),
  },
  {
    label: 'Category',
    name: 'category',
    type: 'select',
    options: mapToOptions(RESOURCE_CATEGORY_VALUES),
    defaultValue: '',
  },
  {
    label: 'Options',
    name: 'options',
    type: 'multiselect',
    options: SELECT_TEAM_OPTIONS,
  },
  {
    label: 'Project Name',
    name: 'projectName',
    type: 'input',
    required: true,
    tooltip: projectName,
    sanitize: (value: string) => value.replace(INVALID_PROJECT_NAME_CHARS, ''),
  },
];
