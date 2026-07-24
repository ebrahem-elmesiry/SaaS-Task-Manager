import { FormState, projectCard } from "@/types/project";
import { formatDate } from "@/lib/utils";
import { messages } from "@/messages";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Assignee } from "@/types/kanban";
import { getQueryClient } from "@/lib/get-query-client";

export const useUpdateProject = () => {
  const queryClient = getQueryClient();
  const supabase = createClient();

  function getTeamChanges(currentMembers: Assignee[], newMembers: Assignee[]) {
    const getNewMembers = newMembers.filter(
      (n) => !currentMembers.some((t) => t.id === n.id),
    );
    const getDeletedMembers = currentMembers
      .filter((c) => !newMembers.some((n) => n.id === c.id))
      .map((t) => t.id);

    return { getNewMembers, getDeletedMembers };
  }

  // I know there are no transactions because I am focusing on frontend development now
  async function insertMembersToProjects(
    projectId: string,
    newTeam: Assignee[],
  ) {
    const team = newTeam.map((t) => ({
      project_id: projectId,
      user_id: t.id,
    }));
    const { error: teamError } = await supabase
      .from("project_assignments")
      .insert(team);
    if (teamError) throw new Error(teamError.message);
  }
  async function deleteMembersToProjects(
    projectId: string,
    deletedTeamIds: string[],
  ) {
    const { error: teamError } = await supabase
      .from("project_assignments")
      .delete()
      .eq("project_id", projectId)
      .in("user_id", deletedTeamIds);
    if (teamError) throw new Error(teamError.message);
  }

  async function getMembersFromDB(projectId: string) {
    const { data: projectTeam, error } = await supabase
      .from("project_assignments")
      .select(`profiles(id,full_name,avatar_url)`)
      .eq("project_id", projectId);

    if (error) throw new Error(error.message);
    const currentTeam = projectTeam?.map((t) =>
      Array.isArray(t.profiles) ? t.profiles[0] : t.profiles,
    ) as Assignee[];

    return currentTeam;
  }

  async function updateProject(data: FormState) {
    // Update project info in database
    const { error } = await supabase
      .from("projects")
      .update({
        name: data.name,
        description: data.description,
        due_date: data.endDate,
        startDate: data.startDate,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    // Get current team from database
    const currentTeam = await getMembersFromDB(data.id);

    // Find new members to add
    const newTeam = getTeamChanges(currentTeam, data.team);
    if (newTeam.getNewMembers.length > 0)
      await insertMembersToProjects(data.id, newTeam.getNewMembers);

    // Remove members that were taken out
    if (newTeam.getDeletedMembers.length > 0)
      await deleteMembersToProjects(data.id, newTeam.getDeletedMembers);
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: updateProject,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previousData = queryClient.getQueryData(["projects"]);

      const endDate = newData.endDate;
      const startDate = newData.startDate;

      if (!startDate) throw new Error("StartDate is required");
      if (!endDate) throw new Error("EndDate is required");

      queryClient.setQueryData(["projects"], (old: projectCard[]) =>
        old.map((p) =>
          p.id === newData.id
            ? {
                ...p,
                ...newData,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
              }
            : p,
        ),
      );
      return previousData;
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["projects"], context);
      toast.error(messages.project.update.error || err.message);
    },

    onSuccess: (data, variables) => {
      toast.success(messages.project.update.success);
      queryClient.invalidateQueries({
        queryKey: ["project_members", variables.id],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { updateProjectPending: isPending, updateProject: mutateAsync };
};
