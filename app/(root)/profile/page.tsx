import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileStats from "@/features/profile/components/ProfileStats";
import RecentTasks from "@/features/profile/components/RecentTasks";
import ActiveProjects from "@/features/profile/components/ActiveProjects";
import ProfileSkills from "@/features/profile/components/ProfileSkills";
import AboutProfile from "@/features/profile/components/AboutProfile";
import { RecentTask, UserStat } from "@/types/profile";
import { ProfileSkeleton } from "@/features/shared/components/loading/ProfileSkeleton";

const userStats: UserStat[] = [
  { label: "Tasks Completed", value: 142, icon: CheckCircle2 },
  { label: "In Progress", value: 23, icon: Clock },
  { label: "Active Projects", value: 5, icon: TrendingUp },
];

const recentTasks: RecentTask[] = [
  {
    id: 1,
    title: "Update user authentication flow",
    project: "Website Redesign",
    status: "completed",
    completedDate: "Apr 17, 2026",
  },
  {
    id: 2,
    title: "Design new landing page",
    project: "Website Redesign",
    status: "in-progress",
    dueDate: "Apr 22, 2026",
  },
  {
    id: 3,
    title: "Mobile responsive fixes",
    project: "Mobile App",
    status: "in-progress",
    dueDate: "Apr 18, 2026",
  },
  {
    id: 4,
    title: "Database schema optimization",
    project: "API Integration",
    status: "completed",
    completedDate: "Apr 15, 2026",
  },
];

const projects = [
  { id: 1, name: "Website Redesign", progress: 75, tasks: 18 },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 45,
    tasks: 14,
  },
  { id: 3, name: "API Integration", progress: 90, tasks: 14 },
  { id: 5, name: "API Integration", progress: 90, tasks: 14 },
  { id: 6, name: "API Integration", progress: 90, tasks: 14 },
  { id: 7, name: "API Integration", progress: 90, tasks: 14 },
];

const skills = [
  "UI Design",
  "React",
  "Figma",
  "TypeScript",
  "Product Strategy",
  "User Research",
];

export default function Page() {
  const isPending = false;

  if (isPending) return <ProfileSkeleton />;
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-32 bg-linear-to-r from-indigo-600 to-purple-600" />
        {/* Profile And Task Information */}
        <div className="px-6 pb-6">
          <ProfileHeader
            name="John Doe"
            job="Product Designer"
            email="john.doe@company.com"
            avatar="JD"
          />

          <ProfileStats stats={userStats} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About And Recent Task */}
        <div className="lg:col-span-2 space-y-6">
          <AboutProfile
            joinedDate="Joined January 2024"
            location="San Francisco, CA"
            bio="Product designer and developer with 5+ years of experience creating intuitive user experiences. Passionate about building products that solve real problems and delight users."
          />

          <RecentTasks tasks={recentTasks} />
        </div>
        <div className="space-y-6">
          <ActiveProjects projects={projects} />
          <ProfileSkills skills={skills} />
        </div>
      </div>
    </div>
  );
}
