import { messages } from "@/messages";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { projectCard } from "@/types/project";
import { getQueryClient } from "@/lib/get-query-client";

export const useDeleteProject = () => {
  const queryClient = getQueryClient();
  const supabase = createClient();

  async function deleteProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteProject,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previousData = queryClient.getQueryData(["projects"]);
      queryClient.setQueryData(["projects"], (old: projectCard[]) =>
        old.filter((p) => p.id !== id),
      );
      return previousData;
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["projects"], context);
      toast.error(messages.project.delete.error || err.message);
    },

    onSuccess: () => {
      toast.success(messages.project.delete.success);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { deleteProjectPending: isPending, deleteProject: mutateAsync };
};
