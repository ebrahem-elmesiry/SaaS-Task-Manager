import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { formatActivity } from "@/features/TaskDetailPanel/handlers/formatActivity";
import { ActivityType } from "@/types/kanban";

async function getActivityFromDB(taskId: string) {
  const supabase = createClient();
  if (!taskId) return [];
  const { data, error } = await supabase
    .from("activity_log")
    .select(
      `*,
        tasks(id,title,status,project_id),
        profiles(id,full_name,avatar_url)
        `,
    )
    .eq("taskId", taskId);
  if (error) {
    console.log("error comments", error);
    throw new Error(error.message);
  }
  const formatData = formatActivity(data);
  const queryClient = getQueryClient();
  queryClient.setQueryData<ActivityType[]>(["activity", taskId], formatData);
  return formatData || [];
}

export function useActivity() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const {
    data: activity,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["activity", taskId],
    queryFn: () => {
      if (taskId) return getActivityFromDB(taskId);
    },
    enabled: !!taskId,
    staleTime: 60 * 1000,
  });

  return { activity, isPending, error, refetch };
}
