import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/design-system'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { FormFieldsRenderer } from '@/components/FormFieldsRenderer/FormFieldsRenderer'
import { LoadingState } from '@/components/LoadingState'
import Stepper from '@/components/Stepper/Stepper'

import { usePatchProjectDetailsMutation } from '@/hooks/queries/usePatchProjectDetailsMutation'
import { useResourceQuery } from '@/hooks/queries/useResourceQuery'
import { useResourceBuffer } from '@/hooks/useResourceBuffer'

import { getBreadcrumbs } from '@/utils/getBreadcrumbs'
import { isModuleCompleted } from '@/utils/isModuleCompleted'

import { projectDetailsConfig } from './config'
import type { ProjectDetailsFormValues } from './ResourceProjectDetailsPage.types'

import {
  FormLayout,
  PageHeader,
  PageLayout,
  PageSubtitle,
  PageTitle,
  SectionCard,
} from '../PageLayout.styles'

const defaultValues: ProjectDetailsFormValues = {
  budget: '',
  category: '',
  options: [],
  projectName: '',
}

export function ResourceProjectDetailsPage() {
  const { resourceId } = useParams()
  const navigate = useNavigate()

  const { updateProjectDetails, getBuffer } = useResourceBuffer()

  const form = useForm<ProjectDetailsFormValues>({
    defaultValues,
  })

  const { reset, handleSubmit } = form

  const { data: resource, status } = useResourceQuery(resourceId)
  const patchProjectDetailsMutation = usePatchProjectDetailsMutation(resourceId)

  useEffect(() => {
    if (!resource || !resourceId) {
      return
    }

    const draft = getBuffer(resourceId)

    reset({
      budget: draft?.projectDetails?.budget ?? resource.projectDetails.budget,
      category: draft?.projectDetails?.category ?? resource.projectDetails.category,
      options: draft?.projectDetails?.options ?? resource.projectDetails.options ?? [],
      projectName:
        draft?.projectDetails?.projectName ?? resource.projectDetails.projectName,
    })
  }, [resource, resourceId, getBuffer, reset])

  useEffect(() => {
    if (resource && !isModuleCompleted(resource.basicInfo)) {
      navigate(`/resources/${resourceId}/details`)
    }
  }, [navigate, resource, resourceId])

  if (status === 'pending') {
    return <LoadingState />
  }

  if (status === 'error' || !resource) {
    return <div>Failed to load resource</div>
  }

  const handleCompletedResource = (data: ProjectDetailsFormValues) => {
    updateProjectDetails(resourceId!, data)
    navigate(`/resources/${resourceId}`)
  }

  const handleEditableResource = (data: ProjectDetailsFormValues) => {
    patchProjectDetailsMutation.mutate(data, {
      onSuccess: () => {
        navigate(`/resources/${resourceId}/details`)
      },
    })
  }

  const onSubmit = (data: ProjectDetailsFormValues) => {
    if (!resourceId) {
      return
    }

    if (resource.status === 'completed') {
      handleCompletedResource(data)
      return
    }

    handleEditableResource(data)
  }

  const isSaving = patchProjectDetailsMutation.isPending

  return (
    <PageLayout>
      <PageTitle>Resource Management</PageTitle>

      <Breadcrumb
        items={getBreadcrumbs({
          resourceId,
          resourceName: resource.basicInfo.resourceName,
          section: 'project-details',
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

      <SectionCard>
        <FormProvider {...form}>
          <FormLayout
            onSubmit={(event) => {
              void handleSubmit(onSubmit)(event)
            }}
          >
            <FormFieldsRenderer config={projectDetailsConfig} />

            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Submit'}
            </Button>
          </FormLayout>
        </FormProvider>
      </SectionCard>
    </PageLayout>
  )
}

export default ResourceProjectDetailsPage
