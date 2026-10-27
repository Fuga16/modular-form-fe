import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import layout from '../PageLayout.module.css';

import type {
  ResourceTable,
  ResourcesFilters,
} from './ResourcesListPage.types';
import { toResourceTableRow } from './ResourcesListPage.types';
import { filtersConfig, tableConfig } from './config';
import {
  Breadcrumb,
  ConfirmModal,
  CreateResourceModal,
  FiltersBlock,
  LoadingState,
  Pagination,
  Table,
} from '@/components';
import { Button, Card } from '@/design-system';
import { useDeleteResourceMutation } from '@/hooks/queries/useDeleteResourceMutation';
import { useResourcesListQuery } from '@/hooks/queries/useResourcesListQuery';
import { getFilterValues } from '@/utils/getDefaultFilterValues';
import { getQueryParams } from '@/utils/getQueryParams';
import { sanitizeSearchParams } from '@/utils/sanitizeSearchParams';
import { updateSearchParams } from '@/utils/updateSearchParams';

/**
 * Resources list with filters, pagination, sorting, and create and delete actions.
 *
 * Filters, page, page size and sort order live in the URL, so the list survives
 * a reload and can be shared. Deleting asks for confirmation first.
 */
export const ResourcesListPage = () => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<ResourceTable | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const filterValues = useMemo(
    () => getFilterValues(searchParams, filtersConfig),
    [searchParams],
  );

  const query = useMemo(
    () => getQueryParams(searchParams, filtersConfig),
    [searchParams],
  );

  const methods = useForm<ResourcesFilters>({
    defaultValues: filterValues,
  });

  useEffect(() => {
    if (!searchParams.has('page') || !searchParams.has('pageSize')) {
      setSearchParams(
        updateSearchParams(searchParams, {
          page: '1',
          pageSize: '10',
        }),
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const sanitized = sanitizeSearchParams(searchParams, filtersConfig);

    if (sanitized.toString() !== searchParams.toString()) {
      setSearchParams(sanitized, {
        replace: true,
      });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    methods.reset(filterValues);
  }, [filterValues, methods]);

  const { data, status } = useResourcesListQuery(query);
  const deleteResourceMutation = useDeleteResourceMutation();

  useEffect(() => {
    if (!data) return;

    const requestedPage = Number(query.page);

    if (
      requestedPage > data.pagination?.totalPages &&
      requestedPage !== data.pagination?.page
    ) {
      setSearchParams(
        updateSearchParams(searchParams, {
          page: String(data.pagination?.page),
        }),
        { replace: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- react only to fetched data/page changing, not every searchParams/setSearchParams identity
  }, [data, query.page]);

  const rows = useMemo(
    () => (data ? data?.items?.map(toResourceTableRow) : []),
    [data],
  );

  const handleRequestDelete = (row: ResourceTable) => {
    setRowToDelete(row);
  };

  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    deleteResourceMutation.mutate(String(rowToDelete.resourceId), {
      onSuccess: () => {
        setRowToDelete(null);
      },
    });
  };

  if (status === 'pending') {
    return <LoadingState />;
  }

  if (status === 'error' || !data) {
    return (
      <div
        role="alert"
        className={layout.errorBanner}
      >
        Failed to load resources
      </div>
    );
  }

  const { pagination } = data;

  return (
    <div className={layout.page}>
      <CreateResourceModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <ConfirmModal
        isOpen={Boolean(rowToDelete)}
        onClose={() => setRowToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete resource?"
        confirmLabel="Delete"
        isConfirming={deleteResourceMutation.isPending}
      >
        Are you sure you want to delete{' '}
        <strong>{rowToDelete?.resourceName}</strong>? This action cannot be
        undone.
      </ConfirmModal>

      <header className={layout.header}>
        <h1 className={layout.title}>Resource Management</h1>

        <div className={layout.actions}>
          <Button onClick={() => setModalOpen(true)}>Add Resource</Button>
        </div>
      </header>

      <Breadcrumb
        items={[
          {
            label: 'Resources List',
            href: '/resources',
          },
        ]}
      />

      <Card
        variant="outline"
        className={layout.section}
      >
        <FormProvider {...methods}>
          <FiltersBlock<ResourcesFilters> config={filtersConfig} />
        </FormProvider>
      </Card>

      <Card
        variant="outline"
        className={layout.section}
      >
        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
          />
        )}
        {rows && rows.length && (
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
        )}
        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
          />
        )}
      </Card>
    </div>
  );
};

export default ResourcesListPage;
