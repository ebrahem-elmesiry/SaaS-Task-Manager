import React from "react";

export default function EmptyTaskDetails() {
  return (
    <div className="inset-y-0 w-full overflow-hidden flex flex-col z-50">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 pt-0 space-y-6">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Select a task to view details
          </div>
        </div>
      </div>
    </div>
  );
}
