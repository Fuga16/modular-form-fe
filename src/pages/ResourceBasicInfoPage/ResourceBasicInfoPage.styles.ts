import styled from 'styled-components'

export const ErrorBanner = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};

  border: 1px solid ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.radii.md};

  color: ${({ theme }) => theme.colors.warning};
  background: ${({ theme }) => theme.colors.surface};
`

export const SubmitError = styled.p`
  color: ${({ theme }) => theme.colors.warning};

  font-size: 0.875rem;
  font-weight: 500;
`
