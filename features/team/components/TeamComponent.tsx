"use client";

import { useMemberDelete } from "@/features/team/hooks/useMemberDelete";
import AlertDeleteDialog from "@/features/shared/components/Alerts/AlertDeleteDialog";
import { memberStatus } from "@/types/team";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchTeamWorkspaceData from "../services/fetchTeamWorkspaceData";
import MemberCard from "./MemberCard";
import EmptyTeam from "./EmptyTeam";
import TeamLoading from "./TeamLoading";
import TeamError from "./TeamError";

interface Props {
  filter: memberStatus;
  workspaceId: string;
}

export default function TeamComponent({ workspaceId, filter }: Props) {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["team", workspaceId],
    queryFn: () => fetchTeamWorkspaceData(workspaceId),
  });

  const team = useMemo(() => {
    if (filter === "offline") {
      return data?.filter((m) => m.status === "offline");
    } else if (filter === "online") {
      return data?.filter((m) => m.status === "online");
    } else {
      return data;
    }
  }, [data, filter]);

  const {
    selectedMemberId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteMember,
    deletePending,
  } = useMemberDelete();

  if (isPending) return <TeamLoading />;
  if (error) return <TeamError refetch={refetch} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {team && team.length > 0 ? (
        team.map((member) => <MemberCard key={member.id} member={member} />)
      ) : (
        <EmptyTeam />
      )}
      <AlertDeleteDialog
        title="Delete Member"
        description="Are you sure you want to delete this member? This action cannot be undone."
        buttonText="Delete"
        Loading={deletePending}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onClick={async (e) => {
          e.preventDefault();
          await deleteMember(selectedMemberId);
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}
