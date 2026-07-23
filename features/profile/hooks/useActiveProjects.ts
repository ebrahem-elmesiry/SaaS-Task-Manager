import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useActiveProjects(
  userId: string | undefined,
  enabled: boolean,
) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["active-projects", userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        "get_user_projects_with_progress",
        { target_user_id: userId },
      );
      if (error) throw error;
      return data;
    },
    enabled,
  });
}
