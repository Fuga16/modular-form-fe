import { useId } from 'react';

import { Box, HiddenInput, Label, Wrapper } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox control with a custom visual box and associated text label.
 */
export function Checkbox({ label, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <Wrapper>
      <HiddenInput
        id={checkboxId}
        type="checkbox"
        {...props}
      />
      <Box aria-hidden="true" />
      <Label htmlFor={checkboxId}>{label}</Label>
    </Wrapper>
  );
}
