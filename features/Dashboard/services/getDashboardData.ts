import { createClient } from "@/lib/supabase/server";
import { DashboardData } from "@/types/dashbaord";

const DAYS_MAP: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "3m": 90,
};

export default async function getDashboardData(
  workspaceId: string,
  filterDays: string = "7d",
): Promise<DashboardData | null> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.rpc("get_dashboard_data", {
    p_workspace_id: workspaceId,
    p_filter_days: DAYS_MAP[filterDays] ?? 7,
  });

  if (error) {
    console.error("Dashboard data fetch error:", error);
    return null;
  }

  return data as DashboardData;
}
