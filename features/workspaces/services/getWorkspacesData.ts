"use server";

import { createClient } from "@/lib/supabase/server";
import { WorkspaceCardData } from "@/types/workspace";

export default async function getWorkspacesData(): Promise<
  WorkspaceCardData[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_workspaces_data");

  if (error) {
    console.error("Workspaces fetch error:", error);
    throw new Error(error.message);
  }

  return (data as WorkspaceCardData[]) ?? [];
}
