import styled from 'styled-components';

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.inkMuted};

  font-size: 14px;
  line-height: 1.6;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
