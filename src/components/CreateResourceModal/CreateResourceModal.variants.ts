import type { NameStatus } from './CreateResourceModal.types';

interface StatusContent {
  emoji: string;
  text: string;
  submitLabel: string;
}

export const INVALID_CHARS_REGEX = /[^A-Za-z0-9 ]/g;

export const nameStatusContent: Record<NameStatus, StatusContent> = {
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
};

export function getNameStatus(name = ''): NameStatus {
  return name.trim() ? 'ready' : 'empty';
}
