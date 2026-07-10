import { AlertCircle } from "lucide-react";

export default function DashboardError() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-red-500">
      <AlertCircle className="h-8 w-8" />
      <p className="text-sm font-medium">Failed to load dashboard data.</p>
    </div>
  );
}
