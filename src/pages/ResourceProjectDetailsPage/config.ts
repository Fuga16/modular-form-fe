import { SELECT_TEAM_OPTIONS } from '@/constants/TeamOptions'
import { RESOURCE_CATEGORY_VALUES } from '@/constants/ResourceCategory'
import { mapToOptions } from '@/utils/mapToOptions'
import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types'
import { FIELD_TOOLTIPS } from '@/constants/tooltips'

const DIGITS_ONLY = /\D/g
const INVALID_PROJECT_NAME_CHARS = /[^A-Za-z0-9 -]/g

const { budget, projectName } = FIELD_TOOLTIPS

export const projectDetailsConfig: FieldConfig[] = [
  {
    label: 'Budget',
    name: 'budget',
    type: 'input',
    tooltip: budget,
    sanitize: (value: string) => value.replace(DIGITS_ONLY, ''),
  },
  {
    label: 'Category',
    name: 'category',
    type: 'select',
    options: mapToOptions(RESOURCE_CATEGORY_VALUES),
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
    tooltip: projectName,
    sanitize: (value: string) => value.replace(INVALID_PROJECT_NAME_CHARS, ''),
  },
]
