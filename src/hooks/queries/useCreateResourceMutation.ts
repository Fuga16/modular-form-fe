import { useQueryClient } from "@tanstack/react-query";
import { createResource } from "../../api/resources";
import { useApiMutation } from "../useApiMutation";

export function useCreateResourceMutation() {
  const queryClient = useQueryClient();

  return useApiMutation({
    mutationFn: (name: string) => createResource(name.trim()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
  });
}
