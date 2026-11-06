import { useEffect, useMemo } from 'react';

import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import layout from '../PageLayout.module.css';

import type { ProjectDetailsFormValues } from './ResourceProjectDetailsPage.types';
import { projectDetailsConfig } from './config';
import type { ProjectDetails } from '@/api/types';
import { ResourceStatus } from '@/api/types';
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
import { getChangedFields } from '@/utils/getChangedFields';
import { isModuleCompleted } from '@/utils/isModuleCompleted';
import { updateResourceBuffer } from '@/utils/updateResourceBuffer';

/**
 * Converts any project details source into form values.
 * Used for form defaults, for the draft merge, and for the diff against the server,
 * so all three always agree on field types and empty values.
 */
function toProjectDetailsValues(
  source: Partial<ProjectDetails> | undefined,
): ProjectDetailsFormValues {
  return {
    budget: source?.budget ?? '',
    projectCategory: source?.projectCategory ?? '',
    options: source?.options ?? [],
    projectName: source?.projectName ?? '',
  };
}

/**
 * Project details step of the resource wizard.
 *
 * A completed resource is edited through the buffer and saved later from the
 * overview page. An editable resource is saved to the server immediately.
 * The step is available only after the general information step is complete.
 */
export function ResourceProjectDetailsPage() {
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const { setResourceChanges, getBuffer } = useResourceBuffer();

  const form = useForm<ProjectDetailsFormValues>({
    defaultValues: toProjectDetailsValues(undefined),
  });

  const { reset, handleSubmit } = form;

  const { data: resource, status: fetchStatus } = useResourceQuery(resourceId);
  const patchProjectDetailsMutation =
    usePatchProjectDetailsMutation(resourceId);

  // Server values merged with the buffered draft, if there is one.
  const initialValues = useMemo(() => {
    if (!resource || !resourceId) {
      return null;
    }

    const draft = getBuffer(resourceId)?.projectDetails;
    const server = toProjectDetailsValues(resource.projectDetails);

    return {
      budget: draft?.budget ?? server.budget,
      projectCategory: draft?.projectCategory ?? server.projectCategory,
      options: draft?.options ?? server.options,
      projectName: draft?.projectName ?? server.projectName,
    };
  }, [resource, resourceId, getBuffer]);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

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
        className={layout.errorBanner}
      >
        Failed to load resource
      </div>
    );
  }

  // The project details step is available only after the general information step.
  if (
    !isModuleCompleted({
      name: resource.name,
      owner: resource.owner,
      email: resource.email,
      description: resource.description,
      priority: resource.priority,
    })
  ) {
    return (
      <Navigate
        to={`/resources/${resourceId}/project-details`}
        replace
      />
    );
  }

  const handleCompletedResource = (data: ProjectDetailsFormValues) => {
    const original = toProjectDetailsValues(resource.projectDetails);
    const changes = getChangedFields(original, data);

    const nextBuffer = updateResourceBuffer({
      section: 'projectDetails',
      currentBuffer: getBuffer(resourceId),
      changes,
    });

    setResourceChanges(resourceId, nextBuffer);
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
    if (resource.status === ResourceStatus.COMPLETED) {
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
          name: resource.name,
          section: 'project-details',
        })}
      />

      <header className={layout.header}>
        <div>
          <h1 className={layout.title}>{resource.name}</h1>
          <p className={layout.subtitle}>Status: {resource.status}</p>
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
