"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export function DashboardError() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-red-500">
      <AlertCircle className="h-8 w-8" />
      <p className="text-sm font-medium">
        Something went wrong while loading this section.
      </p>
      <Button
        variant={"outline"}
        onClick={() => window.location.reload()}
        className="text-white"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh page
      </Button>
    </div>
  );
}
