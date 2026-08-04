"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { currentUserType } from "@/types/main";
import { getQueryClient } from "@/lib/get-query-client";

let cachedClient: ReturnType<typeof createClient> | undefined;
function getClient() {
  if (!cachedClient) cachedClient = createClient();
  return cachedClient;
}

export function useCurrentUserQuery(): {
  user: currentUserType | null;
  isPending: boolean;
} {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const supabase = getClient();
  const queryClient = getQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        queryClient.removeQueries({ queryKey: ["currentWorkspaceUser"] });
        queryClient.removeQueries({ queryKey: ["workspaceMember"] });
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: ["currentWorkspaceUser"] });
        queryClient.invalidateQueries({ queryKey: ["workspaceMember"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient, supabase]);

  const { data: userData, isPending } = useQuery({
    queryKey: ["currentWorkspaceUser", workspaceId],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_current_workspace_user", {
        p_workspace_id: workspaceId ?? null,
      });

      if (error) throw error;

      return data?.[0] ?? null;
    },
  });

  if (!userData) return { user: null, isPending };

  return {
    user: {
      id: userData.id,
      name: userData.name ?? "Unknown",
      avatar: userData.avatar ?? undefined,
      job_title: userData.job_title ?? undefined,
      role: userData.role,
      workspace: workspaceId,
    },
    isPending,
  };
}

export function useCurrentUser(): currentUserType | null {
  return useCurrentUserQuery().user;
}
