import { TaskProvider } from "@/context/TaskContext";
import { PageHeader } from "@/features/shared/components/PageHeader";
import Columns from "@/features/kanban/components/Columns";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getTasksData from "@/features/kanban/services/getTasksData";
import { getQueryClient } from "@/lib/get-query-client";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string; workspaceId: string }>;
}) {
  const { projectId, workspaceId } = await params;
  const queryClient = getQueryClient();
  const supabase = await createClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["tasks", projectId],
      queryFn: () => getTasksData(projectId),
    });

    await queryClient.prefetchQuery({
      queryKey: ["currentWorkspaceUser", workspaceId],
      queryFn: async () => {
        const { data, error } = await supabase.rpc("get_current_workspace_user", {
          p_workspace_id: workspaceId ?? null,
        });
        if (error) throw error;
        return data?.[0] ?? null;
      },
    });
  } catch (e) {
    console.error("Prefetch failed:", e);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskProvider>
        <div className="space-y-6">
          <PageHeader
            title="Board"
            description="Manage tasks across different stages"
            action="task"
          />
          <Columns projectId={projectId} />
        </div>
      </TaskProvider>
    </HydrationBoundary>
  );
}
