import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

const supabase = createClient();

export function useUnreadCount() {
  const currentUser = useCurrentUser();

  return useQuery({
    queryKey: ["notification-unread", currentUser?.id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("receiver_id", currentUser?.id as string)
        .eq("read", false);
      if (error) throw new Error(error.message);
      return count ?? 0;
    },
    enabled: !!currentUser?.id,
  });
}
