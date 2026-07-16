"use server";

import { createClient } from "@/lib/supabase/server";
import { formatDate, singular } from "@/lib/utils";
import { Member, memberStatus } from "@/types/team";

export default async function fetchTeamWorkspaceData(
  workSpaceId?: string,
): Promise<Member[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workspace_members")
    .select(
      `role,
      created_at,
      profiles(
        id,email,full_name,avatar_url,
        task_assignments(count),
        project_assignments(count)
      )
      `,
    )
    .eq("workspace_id", workSpaceId);

  if (error) {
    throw new Error(error.message);
  }
  const format = data.map((m) => ({
    ...singular(m.profiles),
    role: m.role,
    avatar: singular(m.profiles).avatar_url,
    status: "offline" as memberStatus,
    joinedDate: formatDate(m.created_at),
    tasksCompleted: singular(m.profiles).task_assignments[0].count,
    activeProjects: singular(m.profiles).project_assignments[0].count,
  }));

  return format;
}

/*
: {
  role: Role;
  created_at: string;
  profiles: {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | undefined;
    task_assignments: { count: number }[];
    project_assignments: { count: number }[];
  }[];
}
*/
