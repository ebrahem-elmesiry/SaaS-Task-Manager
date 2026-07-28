import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export function KanbanRealtime({
  userId,
  projectId,
}: {
  userId: string | undefined;
  projectId: string;
}) {
  useEffect(() => {
    if (!userId) return;
    const queryClient = getQueryClient();
    const supabase = createClient();
    const channelName = `tasks-${projectId}`;
    const handleChange = async () => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    };
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${projectId}`,
        },
        handleChange,
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${projectId}`,
        },
        handleChange,
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${projectId}`,
        },
        handleChange,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, projectId]);
  return null;
}
