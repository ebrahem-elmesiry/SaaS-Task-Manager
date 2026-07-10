import { WorkspaceCardData } from "@/types/workspace";
import { messages } from "@/messages";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";

export const useAddWorkspace = () => {
  const queryClient = getQueryClient();
  const supabase = createClient();

  async function addWorkspace({ name, slug }: { name: string; slug: string }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: workspaceData, error: workspaceError } = await supabase
      .from("workspaces")
      .insert({ name, slug, owner_id: user.id })
      .select()
      .single();

    if (workspaceError) throw new Error(workspaceError.message);

    const { error: memberError } = await supabase
      .from("workspace_members")
      .insert({ workspace_id: workspaceData.id, user_id: user.id });

    if (memberError) throw new Error(memberError.message);
  }

  const { isPending, mutate } = useMutation({
    mutationFn: addWorkspace,

    onMutate: async ({ name, slug }) => {
      await queryClient.cancelQueries({ queryKey: ["workspaces"] });
      const previousData = queryClient.getQueryData(["workspaces"]);

      const newWorkspace: WorkspaceCardData = {
        id: crypto.randomUUID(),
        name,
        slug,
        projectsCount: 0,
        tasksCount: 0,
        members: [],
      };

      queryClient.setQueryData(["workspaces"], (old: WorkspaceCardData[]) => [
        ...(old ?? []),
        newWorkspace,
      ]);

      return previousData;
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["workspaces"], context);
      toast.error(messages.workspace.create.error);
    },

    onSuccess: () => {
      toast.success(messages.workspace.create.success);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  return { addWorkspacePending: isPending, addWorkspace: mutate };
};
