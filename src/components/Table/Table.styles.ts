import styled, { keyframes } from 'styled-components'

export const Scroll = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 28px;
`

export const StyledTable = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
`

export const Row = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`

export const HeaderCell = styled.th`
  padding: 21px ${({ theme }) => theme.spacing.sm};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: left;
  white-space: nowrap;
`

export const Cell = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  font-size: 15px;
  text-align: left;
  white-space: nowrap;
`

export const ActionsCell = styled.td`
  text-align: right;
`

export const SortBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ArrowsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const SortButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  line-height: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const EmptyStateCell = styled.td`
  padding: 0;
  border: none;
`

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 48px 24px;
  text-align: center;
`

export const EmptyStateIcon = styled.div`
  color: var(--color-text-tertiary, #a0a0a0);
  margin-bottom: 8px;
`

export const EmptyStateTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary, #1a1a1a);
  margin: 0;
`

export const EmptyStateDescription = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary, #6b6b6b);
  margin: 0;
  max-width: 320px;
`

export const EmptyStateAction = styled.div`
  margin-top: 8px;
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

export const SkeletonBlock = styled.div<{ $width?: string }>`
  height: 14px;
  width: ${({ $width }) => $width ?? '80%'};
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--color-skeleton-base, #e8e8e8) 0px,
    var(--color-skeleton-shine, #f4f4f4) 40px,
    var(--color-skeleton-base, #e8e8e8) 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`
