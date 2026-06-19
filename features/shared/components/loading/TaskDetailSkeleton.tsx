"use client";

import { MessageSquare } from "lucide-react";

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}
  />
);

interface Props {
  commentsCount: number;
}

export function TaskDetailSkeleton({ commentsCount }: Props) {
  return (
    <div className="inset-y-0 w-full overflow-hidden flex flex-col z-50">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          {/* 1. Activity */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
              Activity Log
            </h4>

            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <SkeletonPulse className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <SkeletonPulse className="h-4 w-full" />
                    <SkeletonPulse className="h-4 w-30" />
                    <SkeletonPulse className="h-2 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Comments */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comments (0)
            </h4>

            <div className="space-y-3">
              {Array.from({ length: commentsCount }).map((_, i) => (
                <div key={i} className="flex gap-3 pt-4">
                  <SkeletonPulse className="w-8 h-8 rounded-full" />

                  <div className="flex-1 space-y-3">
                    <SkeletonPulse className="h-25 w-full rounded-lg" />

                    <div className="flex justify-between">
                      <SkeletonPulse className="h-2 w-25 rounded" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Input */}
              <div className="flex gap-3 pt-4">
                <SkeletonPulse className="w-8 h-8 rounded-full" />

                <div className="flex-1 space-y-3">
                  <SkeletonPulse className="h-20 w-full rounded-lg" />

                  <div className="flex justify-between">
                    <SkeletonPulse className="h-8 w-8 rounded" />
                    <SkeletonPulse className="h-9 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
