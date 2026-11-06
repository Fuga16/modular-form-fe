export const LETTERS_AND_SPACES_REGEX = /[^A-Za-z ]/g;

export const ALLOWED_EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SANITIZE_EMAIL_FORMAT_REGEX = /[^A-Za-z0-9.!#$%&'*+/=?^_`{|}~@-]/g;

export const SANITIZE_LETTERS_NUMBERS_AND_SPACES_REGEX = /[^A-Za-z0-9 -]/g;

export const ALLOWED_LETTERS_NUMBERS_AND_SPACES_REGEX = /^[A-Za-z0-9 -]*$/;
