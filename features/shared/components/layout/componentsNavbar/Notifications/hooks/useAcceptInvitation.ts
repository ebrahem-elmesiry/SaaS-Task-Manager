import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/client";
import { messages } from "@/messages";
import { actionType, notifications } from "@/types/notification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useAcceptInvitation() {
  const supabase = createClient();
  const queryClient = getQueryClient();
  const currentUser = useCurrentUser();
  if (!currentUser) {
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
        queryKey: ["team", currentUser?.workspace],
      });
      await queryClient.cancelQueries({
        queryKey: ["notification", currentUser.id],
      });
      await queryClient.cancelQueries({
        queryKey: ["workspaces"],
      });
    },

    onSuccess: (data, _variables) => {
      queryClient.setQueryData<notifications[]>(
        ["notification", currentUser.id],
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
      queryClient.setQueryData(["team", currentUser.workspace], context);
      toast.error(
        (err as Error).message || messages.notification.acceptInvitation.error,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["team", currentUser.workspace],
      });
      queryClient.invalidateQueries({
        queryKey: ["notification", currentUser.id],
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
        queryKey: ["notification", currentUser.id],
      });
    },

    onSuccess: (data, _variables) => {
      queryClient.setQueryData<notifications[]>(
        ["notification", currentUser.id],
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
      queryClient.setQueryData(["notification", currentUser.id], context);
      toast.error(
        (err as Error).message || messages.notification.declineInvitation.error,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification", currentUser.id],
      });
    },
  });

  return { acceptInvite, acceptPending, rejectPending, rejectInvite };
}
