import styled from 'styled-components';

export const Container = styled.main`
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Card = styled.section`
  width: 100%;
  max-width: 520px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radii.lg};

  box-shadow: ${({ theme }) => theme.shadows.card};

  text-align: center;
`;

export const Subtitle = styled.span`
  font-family: ${({ theme }) => theme.typography.heading};

  font-size: 5rem;
  font-weight: 700;

  line-height: 1;

  color: ${({ theme }) => theme.colors.accent};
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const Description = styled.p`
  max-width: 360px;

  color: ${({ theme }) => theme.colors.inkMuted};

  font-size: 1.05rem;
`;

export const HomeButton = styled.button`
  border: none;

  cursor: pointer;

  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radii.pill};

  background: ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.surface};

  font-weight: 600;

  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryStrong};
  }
`;
