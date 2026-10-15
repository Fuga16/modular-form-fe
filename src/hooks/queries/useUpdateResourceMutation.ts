import { useQueryClient } from "@tanstack/react-query";
import { updateResource } from "../../api/resources";
import { useApiMutation } from "../useApiMutation";

export function useUpdateResourceMutation() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (resourceId, payload: any) =>
      updateResource(resourceId!, payload),
    onSuccess: (resourceId, updated) => {
      queryClient.setQueryData(["resource", resourceId], updated);
    },
  });
}
