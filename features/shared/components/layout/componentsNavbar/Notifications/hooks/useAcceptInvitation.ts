import { useCurrentUserQuery } from "@/features/shared/hooks/useCurrentUser";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { messages } from "@/messages";
import { actionType, notifications } from "@/types/notification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useAcceptInvitation() {
  const supabase = createClient();
  const queryClient = getQueryClient();
  const { user, isPending } = useCurrentUserQuery();
  if (!user && !isPending) {
    throw new Error("user not found");
  }

  const { isPending: acceptPending, mutateAsync: acceptInvite } = useMutation({
    mutationFn: async ({
      invitation_id,
    }: {
      invitation_id?: string;
      notificationId: string;
    }) => {
      const { error: updateInvitationError } = await supabase
        .from("workspace_invitations")
        .update({ status: "accepted" })
        .eq("id", invitation_id);
      if (updateInvitationError) throw updateInvitationError;
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["team", user?.workspace],
      });
      await queryClient.cancelQueries({
        queryKey: ["notification", user?.id],
      });
      await queryClient.cancelQueries({
        queryKey: ["workspaces"],
      });
    },

    onSuccess: (data, _variables) => {
      queryClient.setQueryData<notifications[]>(
        ["notification", user?.id],
        (old) => {
          return old?.map((n) =>
            n.id === _variables.notificationId
              ? { ...n, action: "accepted" as actionType }
              : n,
          );
        },
      );
      toast.success(messages.notification.acceptInvitation.success);
    },

    onError: (err, _variables, context) => {
      queryClient.setQueryData(["team", user?.workspace], context);
      toast.error(
        (err as Error).message || messages.notification.acceptInvitation.error,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["team", user?.workspace],
      });
      queryClient.invalidateQueries({
        queryKey: ["notification", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  const { isPending: rejectPending, mutateAsync: rejectInvite } = useMutation({
    mutationFn: async ({
      invitation_id,
    }: {
      invitation_id?: string;
      notificationId: string;
    }) => {
      const { error: updateInvitationError } = await supabase
        .from("workspace_invitations")
        .update({ status: "rejected" })
        .eq("id", invitation_id);
      if (updateInvitationError) throw updateInvitationError;
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["notification", user?.id],
      });
    },

    onSuccess: (data, _variables) => {
      queryClient.setQueryData<notifications[]>(
        ["notification", user?.id],
        (old) => {
          return old?.map((n) =>
            n.id === _variables.notificationId
              ? { ...n, action: "rejected" as actionType }
              : n,
          );
        },
      );
      toast.success(messages.notification.declineInvitation.success);
    },

    onError: (err, _variables, context) => {
      queryClient.setQueryData(["notification", user?.id], context);
      toast.error(
        (err as Error).message || messages.notification.declineInvitation.error,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification", user?.id],
      });
    },
  });

  return { acceptInvite, acceptPending, rejectPending, rejectInvite };
}
