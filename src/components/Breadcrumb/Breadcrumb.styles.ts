import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const Nav = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  margin: 0;
  padding: 0;

  list-style: none;
`

export const Item = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: '/';

    margin-left: ${({ theme }) => theme.spacing.sm};

    color: ${({ theme }) => theme.colors.inkMuted};
  }
`

export const Link = styled(RouterLink)`
  display: inline-flex;
  align-items: center;

  min-height: 36px;

  padding: 0 ${({ theme }) => theme.spacing.md};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};

  background: ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.ink};

  font-size: 14px;
  font-weight: 600;

  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryStrong};
  }

  &[aria-current='page'] {
    font-weight: 700;

    color: ${({ theme }) => theme.colors.primaryStrong};

    background: ${({ theme }) => theme.colors.accentSoft};

    border-color: ${({ theme }) => theme.colors.accent};

    pointer-events: none;
  }
`
