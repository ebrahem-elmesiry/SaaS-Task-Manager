"use server";

import { createClient } from "@/lib/supabase/server";
import { ColumnsType, Status } from "@/types/kanban";

export default async function getTasksData(
  projectId: string,
): Promise<ColumnsType | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_tasks_data", {
    p_project_id: projectId,
  });

  if (error) {
    console.error("Tasks fetch error:", error);
    return null;
  }

  const grouped: ColumnsType = {
    todo: [],
    "in-progress": [],
    review: [],
    done: [],
  };

  for (const task of data ?? []) {
    const status = task.status as Status;
    if (grouped[status]) {
      grouped[status].push(task);
    }
  }

  return grouped;
}
