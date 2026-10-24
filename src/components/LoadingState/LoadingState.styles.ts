import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  min-height: 320px;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 72px;
  height: 72px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;

  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};

  border-radius: 50%;

  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 1rem;
  text-align: center;
`;
