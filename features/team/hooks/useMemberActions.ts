import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getQueryClient } from "@/lib/get-query-client";
import { toast } from "sonner";
import { messages } from "@/messages";
import { Member } from "@/types/team";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { Role } from "@/types/main";

export const useMemberActions = () => {
  const supabase = createClient();
  const queryClient = getQueryClient();
  const currentUser = useCurrentUser();

  const { isPending: invitePending, mutateAsync: sendInvite } = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      const { error } = await supabase.rpc(
        "create_notification_if_not_member",
        {
          target_role: role,
          target_email: email,
          target_status: "pending",
          target_sender_id: currentUser?.id,
          target_workspace_id: currentUser?.workspace,
        },
      );

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success(messages.notification.invitation.success);
    },

    onError: (err) => {
      toast.error(
        (err as Error).message || messages.notification.invitation.error,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification", currentUser?.id],
      });
    },
  });

  const { isPending: updatePending, mutateAsync: updateMember } = useMutation({
    mutationFn: async ({
      role,
      member_id,
    }: {
      role: Role;
      member_id: string;
    }) => {
      const { error } = await supabase
        .from("workspace_members")
        .update({
          role,
        })
        .eq("user_id", member_id);

      if (error) throw error;

      const { error: notificationErr } = await supabase
        .from("notifications")
        .insert({
          sender_id: currentUser?.id,
          receiver_id: member_id,
          workspace_id: currentUser?.workspace,
          type: "role",
          title: "Role change",
        });

      if (notificationErr) throw notificationErr;
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["team", currentUser?.workspace],
      });
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["team", currentUser?.workspace], context);
      toast.error(messages.team.update.error);
    },

    onSuccess: (data, _variables) => {
      queryClient.setQueryData(
        ["team", currentUser?.workspace],
        (old: Member[]) => {
          if (!old) return old;
          return old.map((m: Member) =>
            m.id === _variables.member_id ? { ...m, role: _variables.role } : m,
          );
        },
      );
      toast.success(messages.team.update.success);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["team", currentUser?.workspace],
      });
    },
  });

  return {
    addUpdatePending: updatePending,
    updateMember,
    sendInvite,
    invitePending,
  };
};
