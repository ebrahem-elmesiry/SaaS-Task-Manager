import { Member } from "@/types/team";
import { MemberProvider } from "@/context/TeamContext";
import TeamCard from "@/features/team/components/TeamCard";
import TeamFilter from "@/features/team/components/TeamFilter";
import { PageHeader } from "@/features/shared/components/PageHeader";

const teamMembers: Member[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "admin",
    avatar: "SC",
    status: "online",
    tasksCompleted: 142,
    activeProjects: 5,
    joinedDate: "Jan 2024",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "manager",
    avatar: "MJ",
    status: "online",
    tasksCompleted: 98,
    activeProjects: 4,
    joinedDate: "Feb 2024",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "member",
    avatar: "ED",
    status: "offline",
    tasksCompleted: 76,
    activeProjects: 3,
    joinedDate: "Mar 2024",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@company.com",
    role: "member",
    avatar: "JW",
    status: "online",
    tasksCompleted: 54,
    activeProjects: 2,
    joinedDate: "Mar 2024",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    role: "manager",
    avatar: "LA",
    status: "offline",
    tasksCompleted: 112,
    activeProjects: 6,
    joinedDate: "Jan 2024",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "member",
    avatar: "DB",
    status: "online",
    tasksCompleted: 67,
    activeProjects: 3,
    joinedDate: "Apr 2024",
  },
];

interface TeamPageProps {
  searchParams: Promise<{ filter: string }>;
}

export default async function Page({ searchParams }: TeamPageProps) {
  const onlineMembers = teamMembers.filter((m) => m.status === "online").length;
  const offlineMembers = teamMembers.filter(
    (m) => m.status === "offline",
  ).length;
  const TeamCount = {
    allMember: teamMembers.length,
    onlineMember: onlineMembers,
    offlineMember: offlineMembers,
  };
  const { filter } = await searchParams;
  const isPending = false;
  return (
    <MemberProvider initialMembers={teamMembers}>
      <div className="space-y-6">
        {/* Team Page Title */}
        <PageHeader
          title="Team"
          description="Manage your team members and their roles"
          action={"team"}
        />

        {/* Filter Members (online, offline) */}
        <TeamFilter isPending={isPending} TeamCount={TeamCount} />

        {/* Member Card */}
        <TeamCard />
      </div>
    </MemberProvider>
  );
}
