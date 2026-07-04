import { Suspense } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { DashboardSkeleton } from "@/features/shared/components/loading/DashboardSkeleton";
import Dashboard from "@/features/Dashboard/components/Dashboard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ range: string }>;
}) {
  const { range } = await searchParams;

  return (
    <>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Overview</h2>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's what's happening today."
        />
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard range={range} />
        </Suspense>
      </div>
    </>
  );
}
