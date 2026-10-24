export interface TableColumn<T> {
  fieldName: keyof T & string
  title: string
  sortable?: boolean
  converter?: (value: unknown) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  config: TableColumn<T>[]
  getRowId: (item: T) => string | number
  onRowClick?: (item: T) => void
  onDeleteRow?: (item: T) => void
  emptyState?: {
    title: string
    description?: string
    icon?: React.ReactNode
    action?: React.ReactNode
  }
}
