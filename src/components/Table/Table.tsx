import { useSearchParams } from 'react-router-dom'
import { Button } from '@/design-system'
import { getNestedValue } from '@/utils/getNestedValue'
import { getNextSortOrder } from '@/utils/getNextSortOrder'
import TopArrow from '@/assets/triangle-top.svg'
import TopArrowActive from '@/assets/triangle-top-active.svg'
import DownArrow from '@/assets/triangle-down.svg'
import DownArrowActive from '@/assets/triangle-down-active.svg'
import {
  ActionsCell,
  ArrowsBlock,
  Cell,
  EmptyStateAction,
  EmptyStateCell,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateWrapper,
  HeaderCell,
  Row,
  Scroll,
  SortBlock,
  SortButton,
  StyledTable,
} from './Table.styles'
import type { TableProps } from './Table.types'

type SortOrder = 'asc' | 'desc' | null

export function Table<T>({
  data,
  config,
  getRowId,
  onRowClick,
  onDeleteRow,
  emptyState,
}: TableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortOrder = searchParams.get('sortOrder') as SortOrder

  const handleSort = (clicked: 'asc' | 'desc') => {
    const nextSortOrder = getNextSortOrder(sortOrder, clicked)
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (nextSortOrder) {
      params.set('sortOrder', nextSortOrder)
    } else {
      params.delete('sortOrder')
    }
    setSearchParams(params)
  }

  const colSpan = config.length + (onDeleteRow ? 1 : 0)
  const isEmpty = data.length === 0

  return (
    <Scroll>
      <StyledTable>
        <thead>
          <tr>
            {config.map((column) => (
              <HeaderCell
                key={column.fieldName}
                scope="col"
                aria-sort={
                  column.sortable
                    ? sortOrder === 'asc'
                      ? 'ascending'
                      : sortOrder === 'desc'
                        ? 'descending'
                        : 'none'
                    : undefined
                }
              >
                <SortBlock>
                  {column.title}
                  {column.sortable && (
                    <ArrowsBlock>
                      <SortButton
                        type="button"
                        aria-label={`Sort ${column.title} ascending`}
                        aria-pressed={sortOrder === 'asc'}
                        onClick={() => handleSort('asc')}
                      >
                        <img
                          src={sortOrder === 'asc' ? TopArrowActive : TopArrow}
                          alt=""
                          aria-hidden="true"
                        />
                      </SortButton>
                      <SortButton
                        type="button"
                        aria-label={`Sort ${column.title} descending`}
                        aria-pressed={sortOrder === 'desc'}
                        onClick={() => handleSort('desc')}
                      >
                        <img
                          src={sortOrder === 'desc' ? DownArrowActive : DownArrow}
                          alt=""
                          aria-hidden="true"
                        />
                      </SortButton>
                    </ArrowsBlock>
                  )}
                </SortBlock>
              </HeaderCell>
            ))}
            {onDeleteRow && <HeaderCell scope="col" aria-hidden="true" />}
          </tr>
        </thead>
        <tbody>
          {isEmpty && emptyState ? (
            <tr>
              <EmptyStateCell colSpan={colSpan}>
                <EmptyStateWrapper>
                  {emptyState.icon && <EmptyStateIcon>{emptyState.icon}</EmptyStateIcon>}
                  <EmptyStateTitle>{emptyState.title}</EmptyStateTitle>
                  {emptyState.description && (
                    <EmptyStateDescription>
                      {emptyState.description}
                    </EmptyStateDescription>
                  )}
                  {emptyState.action && (
                    <EmptyStateAction>{emptyState.action}</EmptyStateAction>
                  )}
                </EmptyStateWrapper>
              </EmptyStateCell>
            </tr>
          ) : (
            data.map((item) => {
              const rowId = getRowId(item)
              return (
                <Row
                  key={rowId}
                  $clickable={Boolean(onRowClick)}
                  onClick={() => onRowClick?.(item)}
                >
                  {config.map((column) => {
                    const value = getNestedValue(
                      column.fieldName,
                      item as Record<string, unknown>,
                    )
                    const displayValue: React.ReactNode = column.converter
                      ? column.converter(value)
                      : String(value && value !== '' ? value : '-')

                    return <Cell key={column.fieldName}>{displayValue}</Cell>
                  })}
                  {onDeleteRow && (
                    <ActionsCell>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteRow(item)
                        }}
                      >
                        Delete
                      </Button>
                    </ActionsCell>
                  )}
                </Row>
              )
            })
          )}
        </tbody>
      </StyledTable>
    </Scroll>
  )
}
