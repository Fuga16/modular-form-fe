import { Card } from '@/design-system'
import styled from 'styled-components'

export const StyledCard = styled(Card)<{
  $disabled?: boolean
}>`
  display: flex;
  flex-direction: column;

  height: 100%;

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  opacity: ${({ $disabled }) => ($disabled ? 0.65 : 1)};

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    ${({ $disabled, theme }) =>
      !$disabled &&
      `
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.raised};
      `}
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: ${({ theme }) => theme.radii.md};

  background: ${({ theme }) => theme.colors.surfaceAlt};

  font-size: 18px;

  flex-shrink: 0;
`

export const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};

  font-family: ${({ theme }) => theme.typography.heading};

  font-size: 18px;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.inkStrong};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  flex: 1;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.xs} 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceAlt};

  &:last-child {
    border-bottom: none;
  }
`

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};

  font-size: 13px;
`

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.inkStrong};

  font-size: 13px;
  font-weight: 600;

  text-align: right;
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: ${({ theme }) => theme.spacing.lg};
`

export const StatusBadge = styled.span<{ $completed: boolean }>`
  display: inline-flex;
  align-items: center;

  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};

  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 12px;
  font-weight: 600;

  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.success : theme.colors.warning};

  background: ${({ theme, $completed }) =>
    `color-mix(in srgb, ${
      $completed ? theme.colors.success : theme.colors.warning
    } 12%, ${theme.colors.surface})`};
`

export const ActionButton = styled.button`
  border: none;
  background: transparent;

  padding: 0;

  color: ${({ theme }) => theme.colors.primary};

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryStrong};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
`
