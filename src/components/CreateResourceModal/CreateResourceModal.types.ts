export interface CreateResourceModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface CreateResourceFormValues {
  resourceName: string
}

export type ResourceNameStatus = 'empty' | 'ready'
