import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { notifications } from "@/types/notification";
import { useCurrentUserQuery } from "@/features/shared/hooks/useCurrentUser";

const supabase = createClient();

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  const { user: currentUser, isPending } = useCurrentUserQuery();

  if (!currentUser && !isPending) throw new Error("User not found");
  const user = currentUser!;
  return useMutation({
    mutationFn: async ({
      notificationId,
      notificationIds,
      user_id,
    }: {
      user_id: string;
      notificationId?: string;
      notificationIds?: string[];
    }) => {
      let query = supabase
        .from("notifications")
        .update({ read: true })
        .eq("receiver_id", user_id);

      if (notificationId) {
        query = query.eq("id", notificationId);
      }
      if (notificationIds && (notificationIds || []).length > 0) {
        query = query.in("id", notificationIds);
      }
      const { error } = await query;
      if (error) throw error;
    },
    onMutate: async ({ notificationId }) => {
      await queryClient.cancelQueries({
        queryKey: ["notification", user.id],
      });
      const previous = queryClient.getQueryData([
        "notification",
        user.id,
      ]);
      queryClient.setQueryData(
        ["notification", user.id],
        (old: notifications[]) =>
          notificationId
            ? old?.map((n) =>
                n.id === notificationId ? { ...n, read: true } : n,
              )
            : old?.map((n) => ({ ...n, read: true })),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["notification", user.id],
          context.previous,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["notification-unread", user.id],
      });
    },
  });
}
