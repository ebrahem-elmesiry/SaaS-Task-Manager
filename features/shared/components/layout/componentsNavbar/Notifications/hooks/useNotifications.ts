import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { singular } from "@/lib/utils";
import type { notifications } from "@/types/notification";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

const supabase = createClient();

export function formatMessage(n: notifications, userId: string): string {
  switch (n.type) {
    case "invitation":
      const isSender = n.sender.id === userId;
      const action = n.action ?? "pending";
      if (isSender) {
        if (action === "pending")
          return `You invited ${n.receiver.name} to join ${n.workspace_name}`;
        if (action === "accepted")
          return `${n.receiver.name} accepted your invitation to ${n.workspace_name}`;
        if (action === "rejected")
          return `${n.receiver.name} rejected your invitation to ${n.workspace_name}`;
        return "Invitation notification";
      }
      if (action === "pending")
        return `${n.sender.name} invited you to join ${n.workspace_name}`;
      if (action === "accepted")
        return `You accepted the invitation to ${n.workspace_name}`;
      if (action === "rejected")
        return `You rejected the invitation to ${n.workspace_name}`;
      return "Invitation notification";

    case "reply":
      return `${n.sender.name} replied to you in ${n.workspace_name}`;

    case "removed":
      return `You were removed from ${n.workspace_name}`;

    case "role":
      return `Your role was changed in ${n.workspace_name}`;

    case "mention":
      return `${n.sender?.name} mentioned you in ${n.workspace_name}`;

    default:
      return "notification not found";
  }
}

export function useNotifications() {
  const currentUser = useCurrentUser();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["notification", currentUser?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select(
          `id,sender:profiles!notifications_sender_id_fkey(id,full_name),action,
            receiver:profiles!notifications_receiver_id_fkey(id,full_name),workspace_name:workspaces!notifications_workspace_id_fkey(name),task_id,comment_id,type,title,read,created_at
            ,invitation_id
          `,
        )
        .or(
          `sender_id.eq.${currentUser?.id},receiver_id.eq.${currentUser?.id}`,
        );
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const notifications = (data ?? []).map((n) => ({
    ...n,
    sender: {
      name: singular(n.sender).full_name,
      id: singular(n.sender).id,
    },
    receiver: {
      name: singular(n.receiver).full_name,
      id: singular(n.receiver).id,
    },
    workspace_name: singular(n.workspace_name).name,
    invitation_id: n.invitation_id,
  }));

  const unreadCount = notifications.filter(
    (n) => currentUser?.id === n.receiver.id && !n.read,
  ).length;

  return { notifications, isPending, error, unreadCount, refetch };
}
