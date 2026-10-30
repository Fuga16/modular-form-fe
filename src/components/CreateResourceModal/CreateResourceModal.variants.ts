import type { NameStatus } from './CreateResourceModal.types';
import { EMAIL_FORMAT_REGEX } from '@/constants/validation';

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

export function getNameStatus(name = '', email = ''): NameStatus {
  return name.trim() && EMAIL_FORMAT_REGEX.test(email) ? 'ready' : 'empty';
}
