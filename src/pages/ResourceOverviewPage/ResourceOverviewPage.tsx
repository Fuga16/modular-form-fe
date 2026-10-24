import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/design-system'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { LoadingState } from '@/components/LoadingState'
import { Summary } from '@/components/Summary'

import { useResourceQuery } from '@/hooks/queries/useResourceQuery'
import { useUpdateResourceMutation } from '@/hooks/queries/useUpdateResourceMutation'
import { useResourceBuffer } from '@/hooks/useResourceBuffer'
import { getBreadcrumbs } from '@/utils/getBreadcrumbs'

import { ActionsRow, ErrorBanner, UnsavedBanner } from './ResourceOverviewPage.styles'

import {
  PageActions,
  PageHeader,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from '../PageLayout.styles'

export function ResourceOverviewPage() {
  const { resourceId } = useParams()
  const navigate = useNavigate()

  const { getBuffer, clearBuffer } = useResourceBuffer()

  const { data: resource, status: fetchStatus } = useResourceQuery(resourceId)
  const updateResourceMutation = useUpdateResourceMutation(resourceId)

  if (!resourceId) {
    return null
  }

  if (fetchStatus === 'pending') {
    return <LoadingState message="Loading resource..." />
  }

  if (fetchStatus === 'error' || !resource) {
    return (
      <PageLayout>
        <ErrorBanner role="alert">
          Could not load this resource. Please try again.
        </ErrorBanner>

        <ActionsRow>
          <Button onClick={() => navigate('/resources')}>Back to resources</Button>
        </ActionsRow>
      </PageLayout>
    )
  }

  const draft = getBuffer(resourceId)
  const hasUnsavedChanges = resource.status === 'completed' && Boolean(draft)

  const isSaving = updateResourceMutation.isPending

  const handleSaveChanges = () => {
    if (!draft) {
      return
    }

    updateResourceMutation.mutate(
      {
        name: resource.name,
        basicInfo: {
          ...resource.basicInfo,
          ...draft.basicInfo,
        },
        projectDetails: {
          ...resource.projectDetails,
          ...draft.projectDetails,
        },
      },
      {
        onSuccess: () => {
          clearBuffer(resourceId)
        },
      },
    )
  }

  return (
    <PageLayout>
      <PageTitle>Resource Management</PageTitle>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          resourceName: resource.basicInfo.resourceName,
          section: 'overview',
        })}
      />

      <PageHeader>
        <div>
          <PageTitle>{resource.name}</PageTitle>
          <PageSubtitle>Status: {resource.status}</PageSubtitle>
        </div>

        <PageActions>
          <Button onClick={() => navigate(`/resources/${resourceId}/details`)}>
            View details
          </Button>

          {hasUnsavedChanges && (
            <Button onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save Changes'}
            </Button>
          )}
        </PageActions>
      </PageHeader>

      {hasUnsavedChanges && (
        <UnsavedBanner role="status">You have unsaved changes.</UnsavedBanner>
      )}

      <Summary resource={resource} />
    </PageLayout>
  )
}

export default ResourceOverviewPage
