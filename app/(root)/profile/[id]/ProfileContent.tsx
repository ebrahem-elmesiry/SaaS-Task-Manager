"use client";

import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileStats from "@/features/profile/components/ProfileStats";
import RecentTasks from "@/features/profile/components/RecentTasks";
import ActiveProjects from "@/features/profile/components/ActiveProjects";
import ProfileSkills from "@/features/profile/components/ProfileSkills";
import AboutProfile from "@/features/profile/components/AboutProfile";
import { ProfileSkeleton } from "@/features/shared/components/loading/ProfileSkeleton";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import ProfileError from "./ProfileError";

export default function ProfileContent({ userId }: { userId: string }) {
  const supabase = createClient();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_profile_data", {
        p_user_id: userId,
      });
      if (error) throw error;
      return data;
    },
  });

  if (error) {
    return (
      <ProfileError
        refetch={refetch}
        description="We couldn't load this profile. Please check your connection and try again."
      />
    );
  }
  if (isPending) return <ProfileSkeleton />;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-32 bg-linear-to-r from-indigo-600 to-purple-600" />
        <div className="px-6 pb-6">
          <ProfileHeader
            name={data?.full_name}
            job={data?.job_title}
            email={data?.email}
            avatar={data?.avatar_url}
          />

          <ProfileStats stats={data.stats} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AboutProfile
            joinedDate={data?.created_at}
            location={data?.location}
            bio={data?.about}
          />

          <RecentTasks userId={userId} tasks={data?.task_assignments} />
        </div>
        <div className="space-y-6">
          <ActiveProjects projects={data.project_assignments} userId={userId} />
          <ProfileSkills skills={data.skills} />
        </div>
      </div>
    </div>
  );
}
