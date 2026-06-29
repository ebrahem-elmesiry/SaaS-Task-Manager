import { MessageSquare } from "lucide-react";
import React from "react";
const SkeletonPulse = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}
  />
);
export default function CommentSectionLoader({
  commentsCount,
}: {
  commentsCount: number;
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Comments (0)
      </h4>

      <div className="space-y-0">
        {Array.from({ length: commentsCount }).map((_, i) => (
          <div key={i} className="flex gap-3 pt-4">
            <SkeletonPulse className="w-8 h-8 rounded-full" />

            <div className="flex-1 space-y-3">
              <SkeletonPulse className="h-20 w-full rounded-lg" />

              {/* <div className="flex justify-between">
                <SkeletonPulse className="h-2 w-25 rounded" />
              </div> */}
            </div>
          </div>
        ))}

        {/* Input */}
        <div className="flex gap-3 pt-4">
          <SkeletonPulse className="w-8 h-8 rounded-full" />

          <div className="flex-1 space-y-3">
            <SkeletonPulse className="h-25 w-full rounded-lg" />

            <div className="flex justify-between">
              <SkeletonPulse className="h-8 w-8 rounded" />
              <SkeletonPulse className="h-9 w-16 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
