import { PageHeader } from "@/features/shared/components/PageHeader";
import WorkspaceCard from "@/features/workspaces/components/WorkspaceCard";
import getWorkspacesData from "@/features/workspaces/services/getWorkspacesData";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["workspaces"],
      queryFn: getWorkspacesData,
    });
  } catch (e) {
    console.error("Prefetch failed:", e);
  }

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
