import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import layout from '../PageLayout.module.css';

import { buildDetailsCards } from './ResourceDetailsPage.cards';
import styles from './ResourceDetailsPage.module.css';
import {
  Breadcrumb,
  ConfirmModal,
  LoadingState,
  ResourceCard,
  Stepper,
} from '@/components';
import { useProvisionResourceMutation } from '@/hooks/queries/useProvisionResourceMutation';
import { useResourceQuery } from '@/hooks/queries/useResourceQuery';
import { getBreadcrumbs } from '@/utils/getBreadcrumbs';

/**
 * Details page of a resource: the status of each module, the provisioning action,
 * and a confirmation dialog before provisioning starts.
 */
export function ResourceDetailsPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const [isProvisionModalOpen, setProvisionModalOpen] = useState(false);

  const { data: resource, status: fetchStatus } = useResourceQuery(resourceId);
  const provisionMutation = useProvisionResourceMutation(resourceId);

  if (!resourceId) {
    return null;
  }

  if (fetchStatus === 'pending') {
    return <LoadingState />;
  }

  if (fetchStatus === 'error' || !resource) {
    return (
      <div
        role="alert"
        className={styles.errorBanner}
      >
        Failed to load resource
      </div>
    );
  }

  const handleOpenProvisionModal = () => {
    setProvisionModalOpen(true);
  };

  const handleCloseProvisionModal = () => {
    setProvisionModalOpen(false);
  };

  const handleConfirmProvision = () => {
    provisionMutation.mutate(undefined, {
      onSuccess: () => {
        handleCloseProvisionModal();
        navigate(`/resources/${resourceId}/details`);
      },
    });
  };

  const cards = buildDetailsCards({
    resource,
    resourceId,
    navigate,
    onProvision: handleOpenProvisionModal,
  });

  const { name, status } = resource;

  return (
    <div className={layout.page}>
      <p className={layout.subtitle}>Resource Management</p>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          name,
          section: 'details',
        })}
      />

      <header className={layout.header}>
        <div>
          <h1 className={layout.title}>{name}</h1>
          <p className={layout.subtitle}>Status: {status}</p>
        </div>
      </header>

      <Stepper data={resource} />

      <div className={layout.grid}>
        <div className={styles.cards}>
          {cards.map((card) => (
            <ResourceCard
              key={card.title}
              {...card}
            />
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={isProvisionModalOpen}
        onClose={handleCloseProvisionModal}
        onConfirm={handleConfirmProvision}
        title="Provision resource?"
        confirmLabel="Provision"
        isConfirming={provisionMutation.isPending}
      >
        Are you sure you want to provision <strong>{name}</strong>? This will
        start the provisioning process for this resource.
      </ConfirmModal>
    </div>
  );
}

export default ResourceDetailsPage;
