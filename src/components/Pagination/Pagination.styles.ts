import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Status = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
`;
