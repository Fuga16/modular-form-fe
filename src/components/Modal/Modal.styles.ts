import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.lg};

  background: rgba(18, 33, 43, 0.45);
  backdrop-filter: blur(4px);

  z-index: 1000;
`;

export const Panel = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  max-height: 90vh;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};

  box-shadow: ${({ theme }) => theme.shadows.raised};

  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h2`
  margin: 0;

  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;

  color: ${({ theme }) => theme.colors.inkStrong};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  color: ${({ theme }) => theme.colors.ink};
`;
