import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { notifications } from "@/types/notification";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

const supabase = createClient();

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  if (!currentUser) throw new Error("User not found");
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
        queryKey: ["notification", currentUser.id],
      });
      const previous = queryClient.getQueryData([
        "notification",
        currentUser.id,
      ]);
      queryClient.setQueryData(
        ["notification", currentUser.id],
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
          ["notification", currentUser.id],
          context.previous,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification", currentUser.id],
      });
    },
  });
}
