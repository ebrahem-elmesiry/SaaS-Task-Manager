import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { notifications } from "@/types/notification";
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
        (payload) => {
          queryClient.setQueryData(
            ["notifications"],
            (old: notifications[]) => {
              if (!old) return [payload.new];

              return [payload.new, ...old];
            },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
  return null;
}
