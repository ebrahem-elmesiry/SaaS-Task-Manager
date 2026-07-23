import { createClient } from "@/lib/supabase/client";
import { singular } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function useRecentTasks(
  userId: string | undefined,
  enabled: boolean,
) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["tasks-profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_assignments")
        .select(`tasks(id, title, due_date, status, projects(name))`)
        .eq("user_id", userId);
      if (error) throw error;
      return data.map((item) => {
        const task = singular(item.tasks);
        return {
          id: task.id,
          title: task.title,
          project: singular(task.projects)?.name ?? "",
          status: task.status,
          dueDate: task.due_date,
        };
      });
    },
    enabled,
  });
}
