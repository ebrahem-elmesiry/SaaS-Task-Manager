export default function TeamLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>

          <div className="space-y-2 mb-4">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-1" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-12" />
            </div>
            <div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-1" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
