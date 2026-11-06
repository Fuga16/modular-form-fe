export const FIELD_TOOLTIPS = {
  NAME: 'Resource name. Letters, digits, spaces and hyphens only.',
  DESCRIPTION: 'Brief resource description. Up to 500 characters.',
  EMAIL: 'Contact email of the resource owner. Must be a valid email address.',
  OWNER:
    'Name of the person responsible for the resource; letters and spaces only.',
  BUDGET: 'Specify the resource budget in arbitrary units. Numbers only.',
  PROJECT_NAME: 'Project name. Letters, digits, spaces and hyphens only.',
  CREATED_AT_RANGE:
    'Resources created between the selected dates, inclusive. Dates are in UTC.',
  UPDATED_AT_RANGE:
    'Resources updated between the selected dates, inclusive. Dates are in UTC.',
} as const;
