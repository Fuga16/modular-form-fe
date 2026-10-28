import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useForm, useWatch } from 'react-hook-form';

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
import styles from './CreateResourceModal.module.css';
import type {
  CreateResourceFormValues,
  CreateResourceModalProps,
} from './CreateResourceModal.types';
import {
  INVALID_CHARS_REGEX,
  getNameStatus,
  nameStatusContent,
} from './CreateResourceModal.variants';
import { Button, Input, Modal } from '@/design-system';
import { useCreateResourceMutation } from '@/hooks/queries/useCreateResourceMutation';

/**
 * Modal with a form for creating a resource.
 *
 * The status row above the field reflects what the user has typed and what the
 * submit button will do. On success the user is taken to the new resource and the
 * modal closes. Server errors are shown under the field and focus returns to it.
 */
export function CreateResourceModal({
  isOpen,
  onClose,
}: CreateResourceModalProps) {
  const navigate = useNavigate();

  const createResourceMutation = useCreateResourceMutation();
  const isPending = createResourceMutation.isPending;

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

  const name = useWatch({
    control,
    name: 'name',
  });

  const status = nameStatusContent[getNameStatus(name)];

  // Latest `isOpen` for callbacks that outlive the render they were created in.
  const isOpenRef = useRef(isOpen);

  // Set in `onError`; consumed once the field is enabled again.
  // A field disabled by `isPending` cannot take focus, so the focus call waits.
  const shouldRefocusRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isPending && shouldRefocusRef.current) {
      shouldRefocusRef.current = false;
      setFocus('name');
    }
  }, [isPending, setFocus]);

  useEffect(() => {
    if (isOpen) {
      setFocus('name');
    }
  }, [isOpen, setFocus]);

  const handleClose = () => {
    shouldRefocusRef.current = false;
    reset();
    onClose();
  };

  const onSubmit = ({ name }: CreateResourceFormValues) => {
    createResourceMutation.mutate(name, {
      onSuccess: ({ resourceId }) => {
        navigate(`/resources/${resourceId}`);
        handleClose();
      },
      onError: () => {
        if (!isOpenRef.current) return;

        setError('name', {
          type: 'server',
          message: CREATE_RESOURCE_ERROR,
        });
        shouldRefocusRef.current = true;
      },
    });
  };

  return (
    <Modal
      title={MODAL_TITLE}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className={styles.statusRow}>
        <span className={styles.statusEmoji}>{status.emoji}</span>
        <span className={styles.statusText}>{status.text}</span>
      </div>

      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <Input
          label={RESOURCE_NAME_LABEL}
          placeholder={RESOURCE_NAME_PLACEHOLDER}
          tooltip={RESOURCE_NAME_TOOLTIP}
          error={errors.name?.message}
          disabled={isPending}
          {...register('name', {
            validate: (value) =>
              value.trim() !== '' || RESOURCE_NAME_REQUIRED_ERROR,
            setValueAs: (value: string) => value.trim(),
            onChange: (event) => {
              event.target.value = event.target.value.replace(
                INVALID_CHARS_REGEX,
                '',
              );
            },
          })}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isPending}
          >
            {CANCEL_LABEL}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
          >
            {isPending ? CREATING_LABEL : status.submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
