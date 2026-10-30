import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import layout from '../PageLayout.module.css';

import type { ProjectDetailsFormValues } from './ResourceProjectDetailsPage.types';
import { projectDetailsConfig } from './config';
import {
  Breadcrumb,
  FormFieldsRenderer,
  LoadingState,
  Stepper,
} from '@/components';
import { Button, Card } from '@/design-system';
import { usePatchProjectDetailsMutation } from '@/hooks/queries/usePatchProjectDetailsMutation';
import { useResourceQuery } from '@/hooks/queries/useResourceQuery';
import { useResourceBuffer } from '@/hooks/useResourceBuffer';
import { getBreadcrumbs } from '@/utils/getBreadcrumbs';
import { isModuleCompleted } from '@/utils/isModuleCompleted';

/** Form values before the resource is loaded. */
const defaultValues: ProjectDetailsFormValues = {
  budget: '',
  projectCategory: '',
  options: [],
  projectName: '',
};

/**
 * Project details step of the resource wizard.
 *
 * A completed resource is edited locally and saved to the buffer. An editable
 * resource is saved to the server. If the general information step is not complete yet,
 * the user is sent back to it.
 */
export function ResourceProjectDetailsPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const { updateProjectDetails, getBuffer } = useResourceBuffer();

  const form = useForm<ProjectDetailsFormValues>({
    defaultValues,
  });

  const { reset, handleSubmit } = form;

  const { data: resource, status: fetchStatus } = useResourceQuery(resourceId);
  const patchProjectDetailsMutation =
    usePatchProjectDetailsMutation(resourceId);

  // Fills the form from the server data, or from the buffered draft if there is one.
  useEffect(() => {
    if (!resource || !resourceId) {
      return;
    }

    const draft = getBuffer(resourceId);

    reset({
      budget: draft?.projectDetails?.budget ?? resource.projectDetails?.budget,
      projectCategory:
        draft?.projectDetails?.projectCategory ??
        resource.projectDetails?.projectCategory,
      options:
        draft?.projectDetails?.options ??
        resource.projectDetails?.options ??
        [],
      projectName:
        draft?.projectDetails?.projectName ??
        resource.projectDetails?.projectName,
    });
  }, [resource, resourceId, getBuffer, reset]);

  // TODO REFACTOR IT 30102026-1
  const { name, status, owner, email, description, priority } = resource ?? {
    name: '',
    status: '',
    owner: '',
    email: '',
    description: '',
    priority: '',
  };

  const generalInfo = {
    name,
    owner,
    email,
    description,
    priority,
  };

  // The project details step is available only after the general information step.
  useEffect(() => {
    if (resource && !isModuleCompleted(generalInfo)) {
      navigate(`/resources/${resourceId}/details`);
    }
  }, [navigate, resource, resourceId]);

  if (!resourceId) {
    return null;
  }

  if (fetchStatus === 'pending') {
    return <LoadingState />;
  }

  // A resource without general information cannot be edited here, so it is treated as a load failure.
  if (fetchStatus === 'error' || !resource || !generalInfo) {
    return (
      <div
        role="alert"
        className={layout.errorBanner}
      >
        Failed to load resource
      </div>
    );
  }

  const handleCompletedResource = (data: ProjectDetailsFormValues) => {
    updateProjectDetails(resourceId, data);
    navigate(`/resources/${resourceId}`);
  };

  const handleEditableResource = (data: ProjectDetailsFormValues) => {
    patchProjectDetailsMutation.mutate(data, {
      onSuccess: () => {
        navigate(`/resources/${resourceId}/details`);
      },
    });
  };

  const onSubmit = (data: ProjectDetailsFormValues) => {
    if (resource.status === 'completed') {
      handleCompletedResource(data);
      return;
    }

    handleEditableResource(data);
  };

  const isSaving = patchProjectDetailsMutation.isPending;

  return (
    <div className={layout.page}>
      <p className={layout.subtitle}>Resource Management</p>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          name,
          section: 'project-details',
        })}
      />

      <header className={layout.header}>
        <div>
          <h1 className={layout.title}>{name}</h1>
          <p className={layout.subtitle}>Status: {status}</p>
        </div>
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
            <FormFieldsRenderer config={projectDetailsConfig} />

            <Button
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Saving…' : 'Submit'}
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}

export default ResourceProjectDetailsPage;
