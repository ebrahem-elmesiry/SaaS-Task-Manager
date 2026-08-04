"use server";

import { createClient } from "@/lib/supabase/server";
import { Member } from "@/types/team";

export default async function getTeamData(
  workspaceId: string,
): Promise<Member[]> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return [];

  const { data, error } = await supabase.rpc("get_team_data", {
    p_workspace_id: workspaceId,
  });

  if (error) {
    console.error("Team fetch error:", error);
    throw new Error(error.message);
  }

  return (data as Member[]) ?? [];
}
