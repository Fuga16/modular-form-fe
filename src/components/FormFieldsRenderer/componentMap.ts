import { InputAdapter } from './InputAdapter';
import { MultiSelectAdapter } from './MultiSelectAdapter';
import { SelectAdapter } from './SelectAdapter';

export const componentMap = {
  input: InputAdapter,
  textarea: InputAdapter,
  select: SelectAdapter,
  multiselect: MultiSelectAdapter,
} as const;
