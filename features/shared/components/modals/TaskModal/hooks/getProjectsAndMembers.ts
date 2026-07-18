import { createClient } from "@/lib/supabase/client";

export default async function getProjectsAndMembers(workspaceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_workspace_projects_and_members",
    {
      target_workspace_id: workspaceId,
    },
  );

  if (error) {
    throw error;
  }

  return {
    projects: data.projects,
    workspace_members: data.workspace_members,
  };
}
