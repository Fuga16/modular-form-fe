import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import {
  FormLayout,
  PageHeader,
  PageLayout,
  PageTitle,
  SectionCard,
} from '../PageLayout.styles';

import { ErrorBanner, SubmitError } from './ResourceBasicInfoPage.styles';
import type { BasicInfoFormValues } from './ResourceBasicInfoPage.types';
import { basicInfoFieldsConfig } from './config';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { FormFieldsRenderer } from '@/components/FormFieldsRenderer/FormFieldsRenderer';
import { LoadingState } from '@/components/LoadingState';
import { Stepper } from '@/components/Stepper';
import { Button } from '@/design-system';
import { usePatchBasicInfoMutation } from '@/hooks/queries/usePatchBasicInfoMutation';
import { useResourceQuery } from '@/hooks/queries/useResourceQuery';
import { useResourceBuffer } from '@/hooks/useResourceBuffer';
import { getBreadcrumbs } from '@/utils/getBreadcrumbs';

export function ResourceBasicInfoPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const { updateBasicInfo, getBuffer } = useResourceBuffer();

  const form = useForm<BasicInfoFormValues>({
    mode: 'onChange',
  });

  const { reset, handleSubmit, formState } = form;

  const { data: resource, status: fetchStatus } = useResourceQuery(resourceId);
  const patchBasicInfoMutation = usePatchBasicInfoMutation(resourceId);

  useEffect(() => {
    if (!resource || !resourceId) {
      return;
    }

    const draft = getBuffer(resourceId);

    reset({
      description:
        draft?.basicInfo?.description ?? resource.basicInfo.description,
      email: draft?.basicInfo?.email ?? resource.basicInfo.email,
      owner: draft?.basicInfo?.owner ?? resource.basicInfo.owner,
      priority: draft?.basicInfo?.priority ?? resource.basicInfo.priority,
    });
  }, [resource, resourceId, getBuffer, reset]);

  if (!resourceId) {
    return null;
  }

  if (fetchStatus === 'pending') {
    return <LoadingState message="Loading resource..." />;
  }

  if (fetchStatus === 'error' || !resource) {
    return (
      <PageLayout>
        <ErrorBanner role="alert">
          Could not load this resource. Please try again.
        </ErrorBanner>

        <Button onClick={() => navigate('/resources')}>
          Back to resources
        </Button>
      </PageLayout>
    );
  }

  const handleCompletedResource = (data: BasicInfoFormValues) => {
    updateBasicInfo(resourceId, data);
    navigate(`/resources/${resourceId}`);
  };

  const handleEditableResource = (data: BasicInfoFormValues) => {
    patchBasicInfoMutation.mutate(
      {
        resourceName: resource.basicInfo.resourceName,
        ...data,
      },
      {
        onSuccess: () => {
          navigate(`/resources/${resourceId}/project-details`);
        },
      },
    );
  };

  const onSubmit = (data: BasicInfoFormValues) => {
    if (resource.status === 'completed') {
      handleCompletedResource(data);
      return;
    }

    handleEditableResource(data);
  };

  const isSaving = formState.isSubmitting || patchBasicInfoMutation.isPending;

  return (
    <PageLayout>
      <PageTitle>Resource Management</PageTitle>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          resourceName: resource.basicInfo.resourceName,
          section: 'basic-info',
        })}
      />

      <PageHeader>
        <PageTitle>{resource.name}</PageTitle>
      </PageHeader>

      <Stepper data={resource} />

      <SectionCard>
        <FormProvider {...form}>
          <FormLayout
            onSubmit={(event) => {
              void handleSubmit(onSubmit)(event);
            }}
          >
            <FormFieldsRenderer config={basicInfoFieldsConfig} />

            {patchBasicInfoMutation.isError && (
              <SubmitError role="alert">
                Could not save changes. Please try again.
              </SubmitError>
            )}

            <Button
              type="submit"
              disabled={isSaving}
            >
              {patchBasicInfoMutation.isPending ? 'Saving…' : 'Submit'}
            </Button>
          </FormLayout>
        </FormProvider>
      </SectionCard>
    </PageLayout>
  );
}

export default ResourceBasicInfoPage;
