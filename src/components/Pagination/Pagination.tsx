import { useSearchParams } from 'react-router-dom'
import { Button } from '@/design-system'
import { updateSearchParams } from '@/utils/updateSearchParams'
import { PageInput } from './PageInput'
import { PageSizeSelect } from './PageSizeSelect'
import { Container, Status } from './Pagination.styles'
import type { PaginationProps } from './Pagination.types'

/** Pagination controls synced with URL search params. */
export function Pagination({ page, totalPages, pageSize }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const updatePage = (nextPage: number) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: String(nextPage),
      }),
    )
  }

  const updatePageSize = (nextPageSize: number) => {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: '1',
        pageSize: String(nextPageSize),
      }),
    )
  }

  return (
    <Container aria-label="Pagination">
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => updatePage(page - 1)}
      >
        Prev
      </Button>

      <PageInput page={page} totalPages={totalPages} onChange={updatePage} />

      <Status aria-live="polite">
        {page} / {totalPages}
      </Status>

      <PageSizeSelect value={pageSize} onChange={updatePageSize} />

      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => updatePage(page + 1)}
      >
        Next
      </Button>
    </Container>
  )
}
