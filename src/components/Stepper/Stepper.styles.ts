import styled, { css } from 'styled-components';

import type { StepStatus } from './Stepper.types';
import { stepStatusColors } from './Stepper.variants';

export const List = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Item = styled.li<{ $status: StepStatus }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radii.lg};

  background: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Circle = styled.div<{ $status: StepStatus }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  border-radius: 50%;

  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${({ theme, $status }) => {
    const { background, color } = stepStatusColors[$status];

    return css`
      background: ${theme.colors[background]};
      color: ${theme.colors[color]};
    `;
  }}
`;

export const StatusLabel = styled.span<{ $status: StepStatus }>`
  margin-top: ${({ theme }) => theme.spacing.sm};

  font-size: 13px;
  font-weight: 600;

  color: ${({ theme, $status }) =>
    $status === 'completed'
      ? theme.colors.success
      : $status === 'active'
        ? theme.colors.primary
        : theme.colors.inkMuted};
`;

export const Title = styled.h3`
  margin: 0;

  font-size: 14px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.inkStrong};

  text-align: center;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;

  object-fit: contain;
  pointer-events: none;
`;
