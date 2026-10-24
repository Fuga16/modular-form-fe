import type { FieldConfig } from '@/components/FormFieldsRenderer/FormFieldsRenderer.types'
import type { TableColumn } from '@/components/Table/Table.types'

import { formatIsoDate } from '@/utils/formatIsoDate'

import type { ResourceTable } from './ResourcesListPage.types'
import { FIELD_TOOLTIPS } from '@/constants/tooltips'

const INVALID_RESOURCE_NAME_CHARS = /[^A-Za-z0-9 -]/g

const STATUS_OPTIONS = [
  { label: 'Select status', value: '' },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
]

const isoDateConverter = (value: unknown) =>
  formatIsoDate(typeof value === 'string' ? value : String(value))

export const filtersConfig: FieldConfig[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'input',
    tooltip: FIELD_TOOLTIPS.projectName,
    required: false,
    sanitize: (value: string) => value.replace(INVALID_RESOURCE_NAME_CHARS, ''),
  },
  {
    label: 'Status',
    name: 'status',
    type: 'select',
    required: false,
    options: STATUS_OPTIONS,
  },
]

export const tableConfig: TableColumn<ResourceTable>[] = [
  {
    title: 'Technical Name',
    fieldName: 'resourceName',
  },
  {
    title: 'Technical description',
    fieldName: 'description',
  },
  {
    title: 'Technical email',
    fieldName: 'email',
  },
  {
    title: 'Technical owner',
    fieldName: 'owner',
  },
  {
    title: 'Technical priority',
    fieldName: 'priority',
  },
  {
    title: 'Technical status',
    fieldName: 'status',
  },
  {
    title: 'Start date',
    fieldName: 'createdAt',
    converter: isoDateConverter,
    sortable: true,
  },
  {
    title: 'Last Activity',
    fieldName: 'updatedAt',
    converter: isoDateConverter,
  },
]
