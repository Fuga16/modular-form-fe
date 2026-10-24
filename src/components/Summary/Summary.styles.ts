import styled from 'styled-components';

export const SummaryGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border-radius: ${({ theme }) => theme.radii.lg};

  box-shadow: ${({ theme }) => theme.shadows.card};

  overflow: hidden;
`;

export const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.lg};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

export const SummaryStatus = styled.span<{ $completed: boolean }>`
  display: inline-flex;

  margin-top: ${({ theme }) => theme.spacing.xs};

  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};

  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 12px;
  font-weight: 600;

  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.success : theme.colors.warning};

  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

export const SummaryBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;

  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceAlt};

  &:last-child {
    border-bottom: none;
  }
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const SummaryValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkStrong};
`;
