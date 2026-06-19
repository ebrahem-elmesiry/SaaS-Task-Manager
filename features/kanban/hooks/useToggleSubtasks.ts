import { useTaskContext } from "@/context/TaskContext";
import { Status } from "@/types/kanban";

type Props = {
  status: Status;
  taskId: string;
};

export function useToggleSubtasks({ status, taskId }: Props) {
  const { setTasks } = useTaskContext();

  const toggleSelect = (id: string) => {
    setTasks((prev) => {
      const column = prev[status];

      return {
        ...prev,
        [status]: column.map((task) => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === id
                ? { ...subtask, completed: !subtask.completed }
                : subtask,
            ),
          };
        }),
      };
    });
  };

  return {
    toggleSelect,
  };
}
