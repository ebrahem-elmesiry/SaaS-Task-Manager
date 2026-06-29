"use server";

import { createClient } from "@/lib/supabase/server";
import { getProjectStatus } from "@/lib/utils";
import { Assignee, Task } from "@/types/kanban";

export default async function fetchProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select(`
        *,
        project_assignments(
            profiles(
              id,full_name,avatar_url
            )
          ),
        tasks(*)
      `);

  if (error) {
    console.log("project fetch error => ", error);
    throw new Error(error.message);
  }

  const formatData = data.map((d) => {
    const completedTasks = d.tasks.filter(
      (t: Task) => t.status === "done",
    ).length;

    const allTasks = d.tasks.length;
    const progress = allTasks === 0 ? 0 : (completedTasks / allTasks) * 100;
    return {
      id: d.id,
      name: d.name,
      description: d.description,
      progress,
      status: getProjectStatus(progress, d.due_date),
      startDate: d.created_at,
      endDate: d.due_date,
      team:
        d.project_assignments.map((t: { profiles: Assignee }) => t.profiles) ??
        [],
      tasks: {
        total: allTasks,
        completed: completedTasks,
      },
    };
  });

  return formatData;
}
