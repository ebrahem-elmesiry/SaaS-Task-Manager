"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { currentUserType } from "@/types/main";
import { getQueryClient } from "@/lib/get-query-client";

export function useCurrentUser(): currentUserType | null {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const supabase = createClient();
  const queryClient = getQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        queryClient.removeQueries({ queryKey: ["currentUser"] });
        queryClient.removeQueries({ queryKey: ["workspaceMember"] });
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        queryClient.invalidateQueries({ queryKey: ["workspaceMember"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient, supabase]);

  const { data: baseUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, job_title")
        .eq("id", user.id)
        .single();
      return {
        id: user.id,
        name: profile?.full_name || "Unknown",
        avatar: profile?.avatar_url || undefined,
        job_title: profile?.job_title ?? undefined,
      };
    },
  });

  const { data: member } = useQuery({
    queryKey: ["workspaceMember", workspaceId],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !workspaceId) return null;
      const { data } = await supabase
        .from("workspace_members")
        .select("role")
        .eq("user_id", user.id)
        .eq("workspace_id", workspaceId)
        .single();
      return data;
    },
    enabled: !!workspaceId,
  });

  if (!baseUser) return null;

  return {
    id: baseUser.id,
    name: baseUser.name,
    avatar: baseUser.avatar,
    job_title: baseUser.job_title,
    role: member?.role,
    workspace: workspaceId,
  };
}
