import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { useResourcesListQuery } from "./hooks/queries/useResourcesListQuery";
import { queryClient } from "./lib/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useDeleteResourceMutation } from "./hooks/queries/useDeleteResourceMutation";
import { useCreateResourceMutation } from "./hooks/queries/useCreateResourceMutation";
import { useUpdateResourceMutation } from "./hooks/queries/useUpdateResourceMutation";

const Page = () => {
  const methods = useForm();
  const { data: itemsData } = useResourcesListQuery<any>("");
  const deleteResourceMutation = useDeleteResourceMutation();
  const createResourceMutation = useCreateResourceMutation<any>("");
  const updateResourceMutation = useUpdateResourceMutation<any>("");

  const onCreateHandler = (data: any) => {
    createResourceMutation.mutate(String(data.create_name));
  };

  const onDeleteHandler = (data: any) => {
    deleteResourceMutation.mutate(
      String(
        itemsData?.find((item: any) => item.name === data.delete_name)?.id,
      ),
    );
  };

  const onEditHandler = (data: any) => {
    updateResourceMutation.mutate(
      String(itemsData?.find((item: any) => item.name === data.edit_name)?.id),
      { name: `${data.edit_name}1` },
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onCreateHandler)}>
        <label htmlFor="resource-name">Resource Name</label>
        <input
          {...methods.register("create_name")}
          id="resource_name"
          type="text"
          placeholder="Resource Name"
        />
        <button type="submit">Create Resource</button>
      </form>
      <form onSubmit={methods.handleSubmit(onDeleteHandler)}>
        <label htmlFor="resource-name-delete">Resource Name</label>
        <input
          {...methods.register("delete_name")}
          id="resource-name-delete"
          type="text"
          placeholder="Resource Name for delete"
        />
        <button type="submit">Delete</button>
      </form>
      <form onSubmit={methods.handleSubmit(onEditHandler)}>
        <label htmlFor="resource-name-edit">Edit Resource Name</label>
        <input
          {...methods.register("edit_name")}
          id="resource-name-edit"
          type="text"
          placeholder="Resource Name for edit"
        />
        <button type="submit">Edit</button>
      </form>
    </FormProvider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}

export default App;
