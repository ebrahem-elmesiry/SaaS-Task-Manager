import { TaskProvider } from "@/context/TaskContext";
import { PageHeader } from "@/features/shared/components/PageHeader";
import Columns from "@/features/kanban/components/Columns";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import fetchTasks from "@/features/kanban/services/fetchTasks";
import { getQueryClient } from "@/lib/get-query-client";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(undefined, projectId),
  });

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
