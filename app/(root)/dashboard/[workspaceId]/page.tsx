import { Suspense } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { DashboardSkeleton } from "@/features/shared/components/loading/DashboardSkeleton";
import Dashboard from "@/features/Dashboard/components/Dashboard";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ range: string }>;
}) {
  const range = (await searchParams).range ?? "7d";
  const { workspaceId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening today."
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard range={range} workspace_id={workspaceId} />
      </Suspense>
    </div>
  );
}
