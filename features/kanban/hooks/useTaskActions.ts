import { useAddTask } from "./useAddTask";
import { useUpdateTask } from "./useUpdateTask";
import { useDeleteTask } from "./useDeleteTask";
import { useParams } from "next/navigation";

export const useTaskActions = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addTaskPending, addTask } = useAddTask({ workspaceId });
  const { updateTaskPending, handleUpdateTask: updateTask } = useUpdateTask({
    workspaceId,
  });
  const { deleteTaskPending, deleteTask } = useDeleteTask({ workspaceId });

  return {
    loading: addTaskPending || updateTaskPending || deleteTaskPending,
    addTask,
    updateTask,
    deleteTask,
  };
};
