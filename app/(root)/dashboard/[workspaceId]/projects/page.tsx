import { ProjectProvider } from "@/context/ProjectContext";
import ProjectCard from "@/features/projects/components/ProjectCard";
import fetchProjects from "@/features/projects/services/fetchProjects";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const queryClient = getQueryClient();
  const { workspaceId } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectProvider>
        <div className="space-y-6 ">
          <PageHeader
            title="Projects"
            description="Manage and track all your projects"
            action="project"
          />

          <ProjectCard workspaceId={workspaceId} />
        </div>
      </ProjectProvider>
    </HydrationBoundary>
  );
}
