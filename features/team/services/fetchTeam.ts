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

export default async function fetchTeam(workSpaceId?: string) {
  const supabase = await createClient();

  const { data: projectsData, error: projectError } = await supabase
    .from("projects")
    .select(`id`)
    .eq("workspace_id", workSpaceId);

  if (projectError) {
    console.error("filed to fetch projects", projectError);
    return null;
  }

  if (!projectsData?.length) return [];

  const { data, error } = await supabase
    .from("project_assignments")
    .select(`profiles(*)`)
    .in(
      "project_id",
      projectsData?.map((p) => p.id),
    );
  if (error) {
    console.error(error);
    return null;
  }

  const team = data?.map((item: { profiles: Profile[] }) =>
    singular(item.profiles),
  );
  return team || [];
}
