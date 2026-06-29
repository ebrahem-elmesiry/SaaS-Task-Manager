import { useAddTask } from "./useAddTask";
import { useUpdateTask } from "./useUpdateTask";
import { useDeleteTask } from "./useDeleteTask";

export const useTaskActions = () => {
  const { addTaskPending, addTask } = useAddTask();
  const { updateTaskPending, handleUpdateTask: updateTask } = useUpdateTask();
  const { deleteTaskPending, deleteTask } = useDeleteTask();

  return {
    loading: addTaskPending || updateTaskPending || deleteTaskPending,
    addTask,
    updateTask,
    deleteTask,
  };
};
