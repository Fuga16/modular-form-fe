import type { CreateResourceFormValues } from './CreateResourceModal.types'

export const DEFAULT_VALUES: CreateResourceFormValues = {
  resourceName: '',
}

export const MODAL_TITLE = 'Add Resource'

export const RESOURCE_NAME_LABEL = 'Resource Name'

export const RESOURCE_NAME_PLACEHOLDER = 'MacBook Pro'

export const RESOURCE_NAME_TOOLTIP =
  'Name of the resource; letters, digits and spaces only.'

export const RESOURCE_NAME_REQUIRED_ERROR = 'Resource name is required'

export const CREATE_RESOURCE_ERROR = 'Could not create resource. Please try again.'

export const CANCEL_LABEL = 'Cancel'

export const CREATING_LABEL = 'Creating…'
