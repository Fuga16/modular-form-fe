import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import { showSuccessToast } from '@/utils/toast';

interface ApiMutationOptions<
  TData,
  TError,
  TVariables,
  TOnMutateResult,
> extends UseMutationOptions<TData, TError, TVariables, TOnMutateResult> {
  successMessage?: string;
}

export function useApiMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TOnMutateResult = unknown,
>(
  options: ApiMutationOptions<TData, TError, TVariables, TOnMutateResult>,
): UseMutationResult<TData, TError, TVariables, TOnMutateResult> {
  const { successMessage, onSuccess, ...mutationOptions } = options;

  return useMutation({
    ...mutationOptions,

    onSuccess(data, variables, onMutateResult, mutationContext) {
      if (successMessage) {
        showSuccessToast(successMessage);
      }

      return onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
  });
}
