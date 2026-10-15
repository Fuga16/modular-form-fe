import { useQuery } from "@tanstack/react-query";
import { listResources } from "../../api/resources";

export function useResourcesListQuery(query: any): any {
  return useQuery({
    queryKey: ["resources", query],
    queryFn: ({ signal }) => listResources(query, signal),
  });
}
