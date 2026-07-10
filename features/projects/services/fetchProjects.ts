"use server";

import { createClient } from "@/lib/supabase/server";
import { getProjectStatus } from "@/lib/utils";
import { Assignee, Task } from "@/types/kanban";

export default async function fetchProjects(workspaceId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
        *,
        project_assignments(
            profiles(
              id,full_name,avatar_url
            )
          ),
        tasks(*)
      `,
    )
    .eq("workspace_id", workspaceId);

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
      startDate: d.startDate,
      endDate: d.due_date,
      team:
        d.project_assignments.map((t: { profiles: Assignee }) => ({
          ...t.profiles,
          avatar_url: t.profiles.avatar_url ?? undefined,
        })) ?? [],
      tasks: {
        total: allTasks,
        completed: completedTasks,
      },
    };
  });

  return formatData;
}
