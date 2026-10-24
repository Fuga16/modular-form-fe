import styled from 'styled-components'

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  background: ${({ theme }) => theme.colors.accentSoft};
`

export const StatusEmoji = styled.span`
  font-size: 22px;
`

export const StatusText = styled.span`
  color: ${({ theme }) => theme.colors.ink};
  font-size: 14px;
  font-weight: 500;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`
