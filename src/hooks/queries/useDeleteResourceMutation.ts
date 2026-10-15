import { useQueryClient } from "@tanstack/react-query";
import { deleteResource } from "../../api/resources";
import { useApiMutation } from "../useApiMutation";

export function useDeleteResourceMutation() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: deleteResource,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
  });
}
