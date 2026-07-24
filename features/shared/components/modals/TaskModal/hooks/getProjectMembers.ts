import { createClient } from "@/lib/supabase/client";

export default async function getProjectMembers(projectId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_project_members", {
    target_project_id: projectId,
  });

  if (error) {
    console.log("error", error);
    throw error;
  }

  return data;
}
