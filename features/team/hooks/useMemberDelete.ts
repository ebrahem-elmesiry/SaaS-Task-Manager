import { useMemberContext } from "@/context/TeamContext";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getQueryClient } from "@/lib/get-query-client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { toast } from "sonner";
import { messages } from "@/messages";
import { Member } from "@/types/team";

export function useMemberDelete() {
  const { selectedMemberId, isDeleteDialogOpen, setIsDeleteDialogOpen } =
    useMemberContext();
  const supabase = createClient();
  const currentUser = useCurrentUser();
  const queryClient = getQueryClient();

  const { isPending: deletePending, mutateAsync: deleteMember } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("workspace_members")
        .delete()
        .eq("user_id", id);

      if (error) throw error;

      const { error: notificationErr } = await supabase
        .from("notifications")
        .insert({
          sender_id: currentUser?.id,
          receiver_id: id,
          workspace_id: currentUser?.workspace,
          type: "removed",
          title: "Removed from workspace",
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
      toast.error(messages.team.delete.error);
    },

    onSuccess: (data, memberId) => {
      queryClient.setQueryData(
        ["team", currentUser?.workspace],
        (old: Member[]) => {
          if (!old) return old;
          return old.filter((m: Member) => m.id !== memberId);
        },
      );
      toast.success(messages.team.delete.success);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["team", currentUser?.workspace],
      });
    },
  });

  return {
    selectedMemberId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteMember,
    deletePending,
  };
}
