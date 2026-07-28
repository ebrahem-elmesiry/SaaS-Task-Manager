import { PageHeader } from "@/features/shared/components/PageHeader";
import WorkspaceCard from "@/features/workspaces/components/WorkspaceCard";
import getWorkspacesData from "@/features/workspaces/services/getWorkspacesData";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspacesData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <PageHeader
          title="Workspaces"
          description="Manage and organize your workspaces"
          action="workspace"
        />

        <WorkspaceCard />
      </div>
    </HydrationBoundary>
  );
}
