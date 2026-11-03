import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import layout from '../PageLayout.module.css';

import styles from './ResourceGeneralInfoPage.module.css';
import type { GeneralInfoFormValues } from './ResourceGeneralInfoPage.types';
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
import { getChangedFields } from '@/utils/getChangedFields';
import { updateResourceBuffer } from '@/utils/updateResourceBuffer';

/**
 * General information step of the resource wizard.
 *
 * A completed resource is edited locally and saved to the buffer, so changes are
 * applied later. An editable resource is saved to the server and the user moves to
 * the project details step.
 */
export function ResourceGeneralInfoPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const { setResourceChanges, getBuffer } = useResourceBuffer();

  const form = useForm<GeneralInfoFormValues>({
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
      description: draft?.description ?? resource.description,
      email: draft?.email ?? resource.email,
      owner: draft?.owner ?? resource.owner,
      priority: draft?.priority ?? resource.priority,
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

  const handleCompletedResource = (data: GeneralInfoFormValues) => {
    const currentBuffer = getBuffer(resourceId);

    const originalGeneralInfo = {
      owner: resource.owner ?? '',
      email: resource.email ?? '',
      description: resource.description ?? [],
      priority: resource.priority ?? '',
    };

    const changes = getChangedFields(originalGeneralInfo, data);

    const nextBuffer = updateResourceBuffer({
      section: 'generalInfo',
      currentBuffer,
      changes,
    });

    setResourceChanges(resourceId, nextBuffer);

    navigate(`/resources/${resourceId}`);
  };

  const handleEditableResource = (data: GeneralInfoFormValues) => {
    patchBasicInfoMutation.mutate(
      {
        name: resource.name,
        ...data,
      },
      {
        onSuccess: () => {
          navigate(`/resources/${resourceId}/project-details`);
        },
      },
    );
  };

  const onSubmit = (data: GeneralInfoFormValues) => {
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
          name: resource.name,
          section: 'general-info',
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

export default ResourceGeneralInfoPage;
