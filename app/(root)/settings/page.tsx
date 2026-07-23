import SettingsComponent from "@/features/settings/components/SettingsComponent";
import { PageHeader } from "@/features/shared/components/PageHeader";
import fetchSettings from "@/features/settings/services/fetchSettings";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <PageHeader
          title="Settings"
          description="Manage your account preferences and settings"
        />
        <SettingsComponent />
      </div>
    </HydrationBoundary>
  );
}
