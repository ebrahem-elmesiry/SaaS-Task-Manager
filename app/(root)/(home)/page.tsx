import { TrendingUp, Users, CheckCircle2, Clock } from "lucide-react";

import { StatsCards } from "../../../features/Dashboard/components/StatsCards";
import { RecentActivity } from "../../../features/Dashboard/components/RecentActivity";
import { ChartsSection } from "@/features/Dashboard/components/ChartsSection";
import { Suspense } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { DashboardSkeleton } from "@/features/shared/components/loading/DashboardSkeleton";

const statsData = [
  { name: "Mon", tasks: 12 },
  { name: "Tue", tasks: 19 },
  { name: "Wed", tasks: 15 },
  { name: "Thu", tasks: 22 },
  { name: "Fri", tasks: 18 },
  { name: "Sat", tasks: 8 },
  { name: "Sun", tasks: 5 },
];

const progressData = [
  { name: "Week 1", completed: 45 },
  { name: "Week 2", completed: 52 },
  { name: "Week 3", completed: 61 },
  { name: "Week 4", completed: 58 },
];

const stats = [
  {
    icon: <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" />,
    badge: "+12%",
    badgeColor:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    value: "847",
    label: "Tasks Completed",
  },
  {
    icon: <Clock className="text-purple-600 dark:text-purple-400" />,
    badge: "23 active",
    badgeColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
    value: "142",
    label: "In Progress",
  },
  {
    icon: <Users className="text-blue-600 dark:text-blue-400" />,
    badge: "+3 new",
    badgeColor:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    value: "28",
    label: "Team Members",
  },
  {
    icon: <TrendingUp className="text-green-600 dark:text-green-400" />,
    badge: "+18%",
    badgeColor:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    value: "94%",
    label: "Success Rate",
  },
];

export default async function Page() {
  // Fetch Data Here
  return (
    <>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Overview</h2>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's what's happening today."
        />
        <Suspense fallback={<DashboardSkeleton />}>
          <StatsCards items={stats} />
          <ChartsSection statsData={statsData} progressData={progressData} />
          <RecentActivity />
        </Suspense>
      </div>
    </>
  );
}
