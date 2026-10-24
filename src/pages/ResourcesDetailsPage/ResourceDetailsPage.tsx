import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  CardGrid,
  PageHeader,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from '../PageLayout.styles';

import { buildDetailsCards } from './ResourceDetailsPage.cards';
import { CardContainer } from './ResourceDetailsPage.styles';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { ConfirmModal } from '@/components/ConfirmModal';
import { LoadingState } from '@/components/LoadingState';
import { ResourceCard } from '@/components/ResourceCard';
import { Stepper } from '@/components/Stepper';
import { useProvisionResourceMutation } from '@/hooks/queries/useProvisionResourceMutation';
import { useResourceQuery } from '@/hooks/queries/useResourceQuery';
import { getBreadcrumbs } from '@/utils/getBreadcrumbs';

export function ResourceDetailsPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const [isProvisionModalOpen, setProvisionModalOpen] = useState(false);

  const { data: resource, status } = useResourceQuery(resourceId);
  const provisionMutation = useProvisionResourceMutation(resourceId);

  if (!resourceId) {
    return null;
  }

  if (status === 'pending') {
    return <LoadingState />;
  }

  if (status === 'error' || !resource) {
    return <div>Failed to load resource</div>;
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

  return (
    <PageLayout>
      <PageTitle>Resource Management</PageTitle>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          resourceName: resource.basicInfo.resourceName,
          section: 'details',
        })}
      />

      <PageHeader>
        <div>
          <PageTitle>{resource.name}</PageTitle>
          <PageSubtitle>Status: {resource.status}</PageSubtitle>
        </div>
      </PageHeader>

      <Stepper
        data={{
          basicInfo: resource.basicInfo,
          projectDetails: resource.projectDetails,
        }}
      />

      <CardGrid>
        <CardContainer>
          {cards.map((card) => (
            <ResourceCard
              key={card.title}
              {...card}
            />
          ))}
        </CardContainer>
      </CardGrid>

      <ConfirmModal
        isOpen={isProvisionModalOpen}
        onClose={handleCloseProvisionModal}
        onConfirm={handleConfirmProvision}
        title="Provision resource?"
        confirmLabel="Provision"
        isConfirming={provisionMutation.isPending}
      >
        Are you sure you want to provision{' '}
        <strong>{resource.basicInfo.resourceName}</strong>? This will start the
        provisioning process for this resource.
      </ConfirmModal>
    </PageLayout>
  );
}

export default ResourceDetailsPage;
