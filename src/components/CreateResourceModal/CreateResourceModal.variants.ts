import type { ResourceNameStatus } from './CreateResourceModal.types'

interface StatusContent {
  emoji: string
  text: string
  submitLabel: string
}

export const INVALID_CHARS_REGEX = /[^A-Za-z0-9 -]/g

export const resourceNameStatusContent: Record<ResourceNameStatus, StatusContent> = {
  empty: {
    emoji: '😶',
    text: 'Waiting for a title',
    submitLabel: 'Add Resource',
  },
  ready: {
    emoji: '😎',
    text: 'Ready to create',
    submitLabel: '🚀 Create Resource',
  },
}

export function getResourceNameStatus(resourceName = ''): ResourceNameStatus {
  return resourceName.trim() ? 'ready' : 'empty'
}
