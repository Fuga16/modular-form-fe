import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import layout from '../PageLayout.module.css';

import styles from './ResourceBasicInfoPage.module.css';
import type { BasicInfoFormValues } from './ResourceBasicInfoPage.types';
import { basicInfoFieldsConfig } from './config';
import {
  Breadcrumb,
  FormFieldsRenderer,
  LoadingState,
  Stepper,
} from '@/components';
import { Button, Card } from '@/design-system';
import { usePatchBasicInfoMutation } from '@/hooks/queries/usePatchBasicInfoMutation';
import { useResourceQuery } from '@/hooks/queries/useResourceQuery';
import { useResourceBuffer } from '@/hooks/useResourceBuffer';
import { getBreadcrumbs } from '@/utils/getBreadcrumbs';

/**
 * Basic info step of the resource wizard.
 *
 * A completed resource is edited locally and saved to the buffer, so changes are
 * applied later. An editable resource is saved to the server and the user moves to
 * the project details step.
 */
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

  // Fills the form from the server data, or from the buffered draft if there is one.
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
      <div className={layout.page}>
        <div
          role="alert"
          className={styles.errorBanner}
        >
          Could not load this resource. Please try again.
        </div>

        <Button onClick={() => navigate('/resources')}>
          Back to resources
        </Button>
      </div>
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
    <div className={layout.page}>
      <p className={layout.subtitle}>Resource Management</p>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          resourceName: resource.basicInfo.resourceName,
          section: 'basic-info',
        })}
      />

      <header className={layout.header}>
        <h1 className={layout.title}>{resource.name}</h1>
      </header>

      <Stepper data={resource} />

      <Card
        variant="outline"
        className={layout.section}
      >
        <FormProvider {...form}>
          <form
            className={layout.form}
            onSubmit={(event) => {
              void handleSubmit(onSubmit)(event);
            }}
          >
            <FormFieldsRenderer config={basicInfoFieldsConfig} />

            {patchBasicInfoMutation.isError ? (
              <p
                role="alert"
                className={styles.submitError}
              >
                Could not save changes. Please try again.
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSaving}
            >
              {patchBasicInfoMutation.isPending ? 'Saving…' : 'Submit'}
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}

export default ResourceBasicInfoPage;
