import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { toast } from "sonner";
import { SettingsData } from "@/types/settings";

interface Props {
  skills: { id: string; name: string }[];
}

export default function useSkill({ skills }: Props) {
  const [value, setValue] = useState("");
  const currentUser = useCurrentUser();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ name, id }: { name: string; id: string }) => {
      const { data, error } = await supabase
        .from("skills")
        .insert({ id, name, user_id: currentUser?.id })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onMutate: async ({ name, id }) => {
      await queryClient.cancelQueries({ queryKey: ["settings"] });
      const previous = queryClient.getQueryData(["settings"]);
      queryClient.setQueryData(["settings"], (old: SettingsData) => ({
        ...old,
        skills: [
          ...((old?.skills ?? []) as { id: string; name: string }[]),
          { id, name },
        ],
      }));
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["settings"], context?.previous);
      toast.error("Failed to add skill");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", skillId);
      if (error) throw new Error(error.message);
    },
    onMutate: async (skillId) => {
      await queryClient.cancelQueries({ queryKey: ["settings"] });
      const previous = queryClient.getQueryData(["settings"]);
      queryClient.setQueryData(["settings"], (old: SettingsData) => ({
        ...old,
        skills: ((old?.skills ?? []) as { id: string; name: string }[]).filter(
          (s) => s.id !== skillId,
        ),
      }));
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["settings"], context?.previous);
      toast.error("Failed to remove skill");
    },
  });

  function addSkill(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      const id = crypto.randomUUID();
      addMutation.mutate({ name: value.trim(), id });
      setValue("");
    }
  }

  function deleteSkill(skillId: string) {
    deleteMutation.mutate(skillId);
  }

  return {
    skills,
    addSkill,
    deleteSkill,
    setValue,
    value,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
