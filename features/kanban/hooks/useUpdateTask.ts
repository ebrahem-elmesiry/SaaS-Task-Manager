import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { TaskForm } from "@/validation/task.schema";
import { ColumnsType, Status } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";
import { useMainContext } from "@/context/MainContext";
import {
  updateTaskBase,
  getCurrentAssignees,
  syncAssignees,
  getCurrentSubtasks,
  syncSubtasks,
} from "../handlers/taskHandlers";
import { updateTaskInCache } from "../handlers/taskCacheHandlers";
import { logTaskActivity } from "../handlers/taskActivityHandlers";
import { addActivityToCache } from "@/features/TaskDetailPanel/handlers/cacheHandlers";

export const useUpdateTask = () => {
  const { currentUser } = useMainContext();
  const { id: user_id, name: user_name, avatar: avatar_url } = currentUser;

  const queryClient = getQueryClient();
  const supabase = createClient();
  const activityUUID = crypto.randomUUID();
  async function handleUpdateTask(data: TaskForm) {
    await updateTaskBase(supabase, data);

    const currentSubtasks = await getCurrentSubtasks(supabase, data.id);
    await syncSubtasks(supabase, data.id, currentSubtasks, data.subtasks);

    const currentAssignees = await getCurrentAssignees(supabase, data.id);
    await syncAssignees(supabase, data.id, currentAssignees, data.assignees);

    await logTaskActivity(supabase, {
      activityUUID,
      workspace_id: "7ad0401e-2da4-4336-a5ad-29e071eeaace",
      user_id,
      entity_id: data.id,
      taskId: data.id,
      action: "TASK_UPDATED",
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn: handleUpdateTask,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", newData.project_id],
      });
      const previousData = queryClient.getQueryData<ColumnsType>([
        "tasks",
        newData.project_id,
      ]);
      updateTaskInCache(queryClient, newData.project_id, newData);
      addActivityToCache(queryClient, newData.id, {
        activityUUID,
        userId: user_id,
        userName: user_name,
        avatarUrl: avatar_url,
        action: "TASK_UPDATED",
        entityId: newData.id,
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
      toast.error(messages.task.update.error || (err as Error).message);
    },

    onSuccess: () => {
      toast.success(messages.task.update.success);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });

  return { updateTaskPending: isPending, handleUpdateTask: mutate };
};
