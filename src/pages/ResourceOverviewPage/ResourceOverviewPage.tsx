import { useNavigate, useParams } from 'react-router-dom';

import layout from '../PageLayout.module.css';

import styles from './ResourceOverviewPage.module.css';
import { Breadcrumb, LoadingState, Summary } from '@/components';
import { Button } from '@/design-system';
import { useResourceQuery } from '@/hooks/queries/useResourceQuery';
import { useUpdateResourceMutation } from '@/hooks/queries/useUpdateResourceMutation';
import { useResourceBuffer } from '@/hooks/useResourceBuffer';
import { getBreadcrumbs } from '@/utils/getBreadcrumbs';

/**
 * Overview of a resource: status, summary of all modules, and actions.
 *
 * When a completed resource has unsaved edits in the buffer, the page shows a
 * banner and a save action. The buffer is cleared only after the save succeeds.
 */
export function ResourceOverviewPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const { getBuffer, clearBuffer } = useResourceBuffer();

  const { data: resource, status: fetchStatus } = useResourceQuery(resourceId);
  const updateResourceMutation = useUpdateResourceMutation(resourceId);

  if (!resourceId) {
    return null;
  }

  if (fetchStatus === 'pending') {
    return <LoadingState message="Loading resource..." />;
  }

  if (fetchStatus === 'error' || !resource) {
    return (
      <div className={layout.page}>
        <div
          role="alert"
          className={styles.errorBanner}
        >
          Could not load this resource. Please try again.
        </div>

        <div className={styles.actionsRow}>
          <Button onClick={() => navigate('/resources')}>
            Back to resources
          </Button>
        </div>
      </div>
    );
  }

  const draft = getBuffer(resourceId);
  const hasUnsavedChanges = resource.status === 'completed' && Boolean(draft);
  const isSaving = updateResourceMutation.isPending;

  const handleSaveChanges = () => {
    if (!draft) {
      return;
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
          clearBuffer(resourceId);
        },
      },
    );
  };

  return (
    <div className={layout.page}>
      <p className={layout.subtitle}>Resource Management</p>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          resourceName: resource.basicInfo.resourceName,
          section: 'overview',
        })}
      />

      <header className={layout.header}>
        <div>
          <h1 className={layout.title}>{resource.name}</h1>
          <p className={layout.subtitle}>Status: {resource.status}</p>
        </div>

        <div className={layout.actions}>
          <Button onClick={() => navigate(`/resources/${resourceId}/details`)}>
            View details
          </Button>

          {hasUnsavedChanges ? (
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? 'Saving…' : 'Save Changes'}
            </Button>
          ) : null}
        </div>
      </header>

      {hasUnsavedChanges ? (
        <div
          role="status"
          className={styles.unsavedBanner}
        >
          You have unsaved changes.
        </div>
      ) : null}

      <Summary resource={resource} />
    </div>
  );
}

export default ResourceOverviewPage;
