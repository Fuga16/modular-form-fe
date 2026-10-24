import { Select } from '@/design-system'
import { Container } from './PageSizeSelect.styles'
import { PAGE_SIZE_OPTIONS } from './PageSizeSelect.variants'
import type { PageSizeSelectProps } from './PageSizeSelect.types'

/** Select control for choosing the number of items per page. */
export function PageSizeSelect({ value, onChange }: PageSizeSelectProps) {
  return (
    <Container>
      <Select
        value={String(value)}
        aria-label="Items per page"
        options={PAGE_SIZE_OPTIONS.map((size) => ({
          value: String(size),
          label: String(size),
        }))}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Container>
  )
}
