"use server";

import { createClient } from "@/lib/supabase/server";
import { WorkspaceCardData } from "@/types/workspace";
import { Assignee } from "@/types/kanban";

export default async function fetchWorkspaces(): Promise<WorkspaceCardData[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: membershipData, error: membershipError } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id);

  if (membershipError) {
    console.log("workspace membership fetch error => ", membershipError);
    throw new Error(membershipError.message);
  }

  const workspaceIds = membershipData.map((m) => m.workspace_id);
  if (workspaceIds.length === 0) return [];

  const { data, error } = await supabase
    .from("workspaces")
    .select(
      `
        *,
        projects(
          id,
          tasks(count)
        ),
        workspace_members(
          profiles(id, full_name, avatar_url)
        )
      `,
    )
    .in("id", workspaceIds);

  if (error) {
    console.log("workspaces fetch error => ", error);
    throw new Error(error.message);
  }

  const formatData: WorkspaceCardData[] = data.map((w) => {
    const allTasks =
      w.projects?.reduce(
        (sum: number, project: { id: string; tasks: { count: number }[] }) =>
          sum + project.tasks[0].count,
        0,
      ) ?? 0;
    const allMembers: Assignee[] =
      w.workspace_members?.flatMap((wm: { profiles: Assignee }) =>
        wm.profiles ? [wm.profiles] : [],
      ) ?? [];

    return {
      id: w.id,
      name: w.name,
      slug: w.slug,
      projectsCount: w.projects?.length ?? 0,
      tasksCount: allTasks,
      members: allMembers,
    };
  });

  return formatData;
}
