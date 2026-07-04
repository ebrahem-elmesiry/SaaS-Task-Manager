export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-7 w-7 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-6" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
