"use server";

import { createClient } from "@/lib/supabase/server";
import { projectCard } from "@/types/project";

export default async function getProjectsData(
  workspaceId: string,
): Promise<projectCard[]> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return [];

  const { data, error } = await supabase.rpc("get_projects_data", {
    p_workspace_id: workspaceId,
  });

  if (error) {
    console.error("Projects fetch error:", error);
    throw new Error(error.message);
  }

  return (data as projectCard[]) ?? [];
}
