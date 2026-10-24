import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useForm, useWatch } from 'react-hook-form';

import { Modal } from '../../design-system/components/Modal';

import {
  CANCEL_LABEL,
  CREATE_RESOURCE_ERROR,
  CREATING_LABEL,
  DEFAULT_VALUES,
  MODAL_TITLE,
  RESOURCE_NAME_LABEL,
  RESOURCE_NAME_PLACEHOLDER,
  RESOURCE_NAME_REQUIRED_ERROR,
  RESOURCE_NAME_TOOLTIP,
} from './CreateResourceModal.constants';
import {
  Actions,
  StatusEmoji,
  StatusRow,
  StatusText,
} from './CreateResourceModal.styles';
import type {
  CreateResourceFormValues,
  CreateResourceModalProps,
} from './CreateResourceModal.types';
import {
  INVALID_CHARS_REGEX,
  getResourceNameStatus,
  resourceNameStatusContent,
} from './CreateResourceModal.variants';
import { Button, Input } from '@/design-system';
import { useCreateResourceMutation } from '@/hooks/queries/useCreateResourceMutation';

export function CreateResourceModal({
  isOpen,
  onClose,
}: CreateResourceModalProps) {
  const navigate = useNavigate();

  const createResourceMutation = useCreateResourceMutation();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { errors },
    control,
  } = useForm<CreateResourceFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const resourceName = useWatch({
    control,
    name: 'resourceName',
  });

  const status = resourceNameStatusContent[getResourceNameStatus(resourceName)];

  useEffect(() => {
    if (isOpen) {
      setFocus('resourceName');
    }
  }, [isOpen, setFocus]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = ({ resourceName }: CreateResourceFormValues) => {
    createResourceMutation.mutate(resourceName, {
      onSuccess: ({ resourceId }) => {
        navigate(`/resources/${resourceId}`);
        handleClose();
      },
      onError: () => {
        setError('resourceName', {
          type: 'server',
          message: CREATE_RESOURCE_ERROR,
        });
      },
    });
  };

  return (
    <Modal
      title={MODAL_TITLE}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <StatusRow>
        <StatusEmoji>{status.emoji}</StatusEmoji>
        <StatusText>{status.text}</StatusText>
      </StatusRow>

      <form
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
      >
        <Input
          label={RESOURCE_NAME_LABEL}
          placeholder={RESOURCE_NAME_PLACEHOLDER}
          tooltip={RESOURCE_NAME_TOOLTIP}
          error={errors.resourceName?.message}
          {...register('resourceName', {
            required: RESOURCE_NAME_REQUIRED_ERROR,
            setValueAs: (value: string) => value.trim(),
            onChange: (e) => {
              e.target.value = e.target.value.replace(INVALID_CHARS_REGEX, '');
            },
          })}
        />

        <Actions>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={createResourceMutation.isPending}
          >
            {CANCEL_LABEL}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={createResourceMutation.isPending}
          >
            {createResourceMutation.isPending
              ? CREATING_LABEL
              : status.submitLabel}
          </Button>
        </Actions>
      </form>
    </Modal>
  );
}
