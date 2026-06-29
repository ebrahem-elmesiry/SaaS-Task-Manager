import { useAddProject } from "./useAddProject";
import { useUpdateProject } from "./useUpdateProject";
import { useDeleteProject } from "./useDeleteProject";

export const useProjectActions = () => {
  const { addProjectPending, addProject } = useAddProject();
  const { updateProjectPending, updateProject } = useUpdateProject();
  const { deleteProjectPending, deleteProject } = useDeleteProject();

  return {
    Loading:
      addProjectPending || updateProjectPending || deleteProjectPending,
    addProject,
    updateProject,
    deleteProject,
  };
};
