import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { TaskForm } from "@/validation/task.schema";
import { ColumnsType, Status } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { useMainContext } from "@/context/MainContext";
import {
  insertTask,
  insertSubtasks,
  insertAssignees,
} from "../handlers/taskHandlers";
import { addTaskToCache } from "../handlers/taskCacheHandlers";
import { logTaskActivity } from "../handlers/taskActivityHandlers";
import { addActivityToCache } from "../../TaskDetailPanel/handlers/cacheHandlers";

export const useAddTask = () => {
  const { currentUser } = useMainContext();
  const { id: user_id, name: user_name, avatar: avatar_url } = currentUser;

  const queryClient = getQueryClient();
  const supabase = createClient();

  const activityUUID = crypto.randomUUID();
  const taskId = crypto.randomUUID();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: TaskForm) => {
      await insertTask(supabase, data, taskId);
      await insertSubtasks(supabase, taskId, data.subtasks);
      await insertAssignees(supabase, taskId, data.assignees);
      await logTaskActivity(supabase, {
        activityUUID,
        workspace_id: "7ad0401e-2da4-4336-a5ad-29e071eeaace",
        user_id,
        entity_id: taskId,
        taskId: taskId,
        action: "TASK_CREATED",
      });
    },

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", newData.project_id],
      });
      const previousData = queryClient.getQueryData<ColumnsType>([
        "tasks",
        newData.project_id,
      ]);
      addTaskToCache(queryClient, newData.project_id, taskId, newData);
      addActivityToCache(queryClient, taskId, {
        activityUUID,
        userId: user_id,
        userName: user_name,
        avatarUrl: avatar_url,
        action: "TASK_CREATED",
        entityId: taskId,
        task: {
          title: newData.title,
          status: newData.status as Status,
          project_id: newData.project_id,
        },
      });
      return previousData;
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["tasks", variables.project_id], context);
      toast.error(messages.task.create.error || (err as Error).message);
    },

    onSuccess: () => {
      toast.success(messages.task.create.success);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });

  return { addTaskPending: isPending, addTask: mutate };
};
