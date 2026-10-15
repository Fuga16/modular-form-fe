import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

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
  const { onSuccess, ...mutationOptions } = options;

  return useMutation({
    ...mutationOptions,

    onSuccess(data, variables, onMutateResult, mutationContext) {
      return onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
  });
}
