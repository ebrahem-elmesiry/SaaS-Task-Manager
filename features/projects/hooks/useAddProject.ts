import { projectCard, statusType, FormState } from "@/types/project";
import { formatDate } from "@/lib/utils";
import { messages } from "@/messages";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";
import { useParams } from "next/navigation";

export const useAddProject = () => {
  const queryClient = getQueryClient();
  const supabase = createClient();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  async function addProjects(data: FormState) {
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .insert({
        due_date: data.endDate,
        startDate: data.startDate,
        name: data.name,
        workspace_id: workspaceId,
        description: data.description,
      })
      .select()
      .single();
    if (projectError) throw new Error(projectError.message);
    const team = data.team.map((t) => ({
      project_id: projectData.id,
      user_id: t.id,
    }));
    const { error } = await supabase.from("project_assignments").insert(team);
    if (error) throw new Error(error.message);
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: addProjects,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["projects"],
      });
      const endDate = newData.endDate;
      const startDate = newData.startDate;

      if (!startDate) throw new Error("StartDate is required");
      if (!endDate) throw new Error("EndDate is required");

      const previousData = queryClient.getQueryData(["projects"]);
      const newProject: projectCard = {
        ...newData,
        id: crypto.randomUUID(),
        progress: 0,
        status: "Just Started" as statusType,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        tasks: { completed: 0, total: 0 },
      };
      queryClient.setQueryData(["projects"], (old: projectCard[]) => [
        ...old,
        newProject,
      ]);
      return previousData;
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["projects"], context);
      toast.error(messages.project.create.error || err.message);
    },

    onSuccess: () => {
      toast.success(messages.project.create.success);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { addProjectPending: isPending, addProject: mutateAsync };
};
