import SettingsComponent from "@/features/settings/components/SettingsComponent";
import { SettingsSkeleton } from "@/features/shared/components/loading/SettingsSkeleton";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { QueryClient } from "@tanstack/react-query";

const skillsProp = [
  "UI Design",
  "React",
  "Figma",
  "TypeScript",
  "Product Strategy",
  "User Research",
];

const accountData = {
  fullName: "John Doe",
  email: "john.doe@company.com",
  jobTitle: "Product Designer",
  bio: "Product designer and developer focused on creating intuitive user experiences.",
  location: "San Francisco, CA",
};
const NotificationData = {
  emailNotifications: true,
  pushNotifications: true,
  taskUpdates: true,
  weeklyDigest: false,
};
const avatar = "";
export default async function Page() {
  // const data = await fetchAccount();
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });
  const isPending = false;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and settings"
      />
      <SettingsComponent
        // data={data}
        isPending={isPending}
        avatar={avatar}
        skillsProp={skillsProp}
        accountData={accountData}
        NotificationData={NotificationData}
      />
    </div>
  );
}
