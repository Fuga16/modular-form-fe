import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { CreateResourceModal } from '@/components/CreateResourceModal'
import { Pagination } from '@/components/Pagination/Pagination'
import { Table } from '@/components/Table'
import { Button } from '@/design-system'

import { filtersConfig, tableConfig } from './config'
import { toResourceTableRow, type ResourceTable } from './ResourcesListPage.types'

import { useResourcesListQuery } from '@/hooks/queries/useResourcesListQuery'
import { useDeleteResourceMutation } from '@/hooks/queries/useDeleteResourceMutation'

import { getFilterValues } from '@/utils/getDefaultFilterValues'
import { getQueryParams } from '@/utils/getQueryParams'
import { sanitizeSearchParams } from '@/utils/sanitizeSearchParams'
import { updateSearchParams } from '@/utils/updateSearchParams'

import {
  PageActions,
  PageHeader,
  PageLayout,
  PageTitle,
  SectionCard,
} from '@/pages/PageLayout.styles'
import { Breadcrumb } from '@/components/Breadcrumb'
import { FiltersBlock } from '@/components/FiltersBlock'
import { LoadingState } from '@/components/LoadingState'
import { ConfirmModal } from '@/components/ConfirmModal'

export const ResourcesListPage = () => {
  const navigate = useNavigate()

  const [isModalOpen, setModalOpen] = useState(false)

  const [rowToDelete, setRowToDelete] = useState<ReturnType<
    typeof toResourceTableRow
  > | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const filterValues = useMemo(
    () => getFilterValues(searchParams, filtersConfig),
    [searchParams],
  )

  const query = useMemo(() => getQueryParams(searchParams, filtersConfig), [searchParams])

  const methods = useForm({
    defaultValues: filterValues,
  })

  useEffect(() => {
    if (!searchParams.has('page') || !searchParams.has('pageSize')) {
      setSearchParams(
        updateSearchParams(searchParams, {
          page: '1',
          pageSize: '10',
        }),
        { replace: true },
      )
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    const sanitized = sanitizeSearchParams(searchParams, filtersConfig)

    if (sanitized.toString() !== searchParams.toString()) {
      setSearchParams(sanitized, {
        replace: true,
      })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    methods.reset(filterValues)
  }, [filterValues, methods])

  const { data, status } = useResourcesListQuery(query)
  const deleteResourceMutation = useDeleteResourceMutation()

  useEffect(() => {
    if (!data) return

    const requestedPage = Number(query.page)

    if (
      requestedPage > data.pagination.totalPages &&
      requestedPage !== data.pagination.page
    ) {
      setSearchParams(
        updateSearchParams(searchParams, {
          page: String(data.pagination.page),
        }),
        { replace: true },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- react only to fetched data/page changing, not every searchParams/setSearchParams identity
  }, [data, query.page])

  const rows = useMemo(() => (data ? data.items.map(toResourceTableRow) : []), [data])

  const handleRequestDelete = (row: ReturnType<typeof toResourceTableRow>) => {
    setRowToDelete(row)
  }

  const handleConfirmDelete = () => {
    if (!rowToDelete) return

    deleteResourceMutation.mutate(String(rowToDelete.resourceId), {
      onSuccess: () => {
        setRowToDelete(null)
      },
    })
  }

  if (status === 'pending') {
    return <LoadingState />
  }

  if (status === 'error' || !data) {
    return <div>Failed to load resources</div>
  }

  const { pagination } = data

  return (
    <PageLayout>
      <CreateResourceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ConfirmModal
        isOpen={Boolean(rowToDelete)}
        onClose={() => setRowToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete resource?"
        confirmLabel="Delete"
        isConfirming={deleteResourceMutation.isPending}
      >
        Are you sure you want to delete <strong>{rowToDelete?.resourceName}</strong>? This
        action cannot be undone.
      </ConfirmModal>
      <PageHeader>
        <PageTitle>Resource Management</PageTitle>

        <PageActions>
          <Button onClick={() => setModalOpen(true)}>Add Resource</Button>
        </PageActions>
      </PageHeader>
      <Breadcrumb
        items={[
          {
            label: 'Resources List',
            href: '/resources',
          },
        ]}
      />
      <SectionCard>
        <FormProvider {...methods}>
          <FiltersBlock config={filtersConfig} />
        </FormProvider>
      </SectionCard>
      <SectionCard>
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
        />
        <Table<ResourceTable>
          data={rows}
          config={tableConfig}
          getRowId={(row) => String(row.resourceId)}
          onRowClick={(row) => navigate(`/resources/${row.resourceId}`)}
          onDeleteRow={handleRequestDelete}
          emptyState={{
            title: 'No resources found',
            description: 'Try adjusting your filters.',
          }}
        />
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
        />
      </SectionCard>
    </PageLayout>
  )
}

export default ResourcesListPage
