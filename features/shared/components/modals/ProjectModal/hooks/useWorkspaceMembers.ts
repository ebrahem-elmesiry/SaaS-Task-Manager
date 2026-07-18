import { createClient } from "@/lib/supabase/client";
import { singular } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function useWorkspaceMembers(workspaceId: string | undefined) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["project-team", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_members")
        .select(`profiles(id,full_name,avatar_url)`)
        .eq("workspace_id", workspaceId);
      if (error) throw error;
      return data.map((p) => singular(p.profiles));
    },
    enabled: !!workspaceId,
  });
}
