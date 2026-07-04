"use server";

import { createClient } from "@/lib/supabase/server";
import { singular } from "@/lib/utils";
import { Role } from "@/types/main";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  job_title: string | null;
  created_at: string;
  role: Role;
}

export default async function fetchTeam(workSpaceId?: string): Promise<{
  success: boolean;
  data: Profile[];
}> {
  const supabase = await createClient();

  const { data: projectsData, error: projectError } = await supabase
    .from("projects")
    .select(`id`)
    .eq("workspace_id", workSpaceId);

  if (projectError) {
    return {
      success: false,
      data: [],
    };
  }

  if (!projectsData?.length)
    return {
      success: false,
      data: [],
    };
  const { data, error } = await supabase
    .from("project_assignments")
    .select(`profiles(*)`)
    .in(
      "project_id",
      projectsData.map((p) => p.id),
    );

  if (error) {
    return {
      success: false,
      data: [],
    };
  }

  return {
    success: true,
    data: data.map((item) => singular(item.profiles)),
  };
}
