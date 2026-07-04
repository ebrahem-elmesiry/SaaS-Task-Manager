const SkeletonPulse = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}
  />
);
export default function ActivityLoader() {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Activity Log
      </h4>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 border-b pb-3 border-slate-100 dark:border-slate-700 last:border-0"
          >
            <SkeletonPulse className="w-7 h-7 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonPulse className="h-4 w-full" />
              <SkeletonPulse className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
