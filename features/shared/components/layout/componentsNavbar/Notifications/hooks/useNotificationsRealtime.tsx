import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export function NotificationsRealtime({
  userId,
}: {
  userId: string | undefined;
}) {
  useEffect(() => {
    if (!userId) return;
    const queryClient = getQueryClient();
    const supabase = createClient();
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${userId}`,
        },
        async () => {
          await queryClient.cancelQueries({
            queryKey: ["notification", userId],
          });
          queryClient.invalidateQueries({
            queryKey: ["notification", userId],
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
  return null;
}
