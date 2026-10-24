import styled from 'styled-components';

import {
  Field,
  Helper,
  Label,
  LabelRow,
  TooltipIcon,
} from '@/design-system/components/Select/Select.styles';

export { Field, Helper, Label, LabelRow, TooltipIcon };

const TRIGGER_HEIGHT = '48px';
const DROPDOWN_OFFSET = '6px';
const DROPDOWN_MAX_HEIGHT = '240px';

export const Wrapper = styled.div`
  position: relative;
`;

export const Trigger = styled.button<{ $hasError: boolean }>`
  width: 100%;
  min-height: ${TRIGGER_HEIGHT};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};

  border-radius: ${({ theme }) => theme.radii.md};

  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.warning : theme.colors.border)};

  background: ${({ theme }) => theme.colors.surface};

  cursor: pointer;
  text-align: left;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(31, 122, 140, 0.12);
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.surfaceAlt};
    opacity: 0.7;
  }
`;

export const Value = styled.span`
  flex: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.colors.ink};
`;

export const Arrow = styled.span<{ $open: boolean }>`
  margin-left: ${({ theme }) => theme.spacing.sm};

  color: ${({ theme }) => theme.colors.inkMuted};

  transition: transform 0.2s ease;

  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${DROPDOWN_OFFSET});
  left: 0;
  right: 0;

  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};

  max-height: ${DROPDOWN_MAX_HEIGHT};
  overflow-y: auto;

  padding: ${({ theme }) => theme.spacing.md};

  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radii.md};

  box-shadow: ${({ theme }) => theme.shadows.card};

  z-index: 10;

  animation: dropdownFade 0.15s ease;

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
