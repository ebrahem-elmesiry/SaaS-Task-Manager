import { memberStatus } from "@/types/team";
import { MemberProvider } from "@/context/TeamContext";
import TeamFilter from "@/features/team/components/TeamFilter";
import { PageHeader } from "@/features/shared/components/PageHeader";
import fetchTeamWorkspaceData from "@/features/team/services/fetchTeamWorkspaceData";
import TeamComponent from "@/features/team/components/TeamComponent";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface TeamPageProps {
  searchParams: Promise<{ filter: memberStatus }>;
  params: Promise<{ workspaceId: memberStatus }>;
}

export default async function Page({ searchParams, params }: TeamPageProps) {
  const { filter } = await searchParams;
  const queryClient = getQueryClient();
  const { workspaceId } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["team", workspaceId],
    queryFn: () => fetchTeamWorkspaceData(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MemberProvider>
        <div className="space-y-6">
          {/* Team Page Title */}
          <PageHeader
            title="Team"
            description="Manage your team members and their roles"
            action={"team"}
          />

          {/* Filter Members (online, offline) */}
          <TeamFilter workspaceId={workspaceId} />

          {/* Member Card */}
          <TeamComponent workspaceId={workspaceId} filter={filter} />
        </div>
      </MemberProvider>
    </HydrationBoundary>
  );
}
