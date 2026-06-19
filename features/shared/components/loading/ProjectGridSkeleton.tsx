export function ProjectGridSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="space-y-4">
              <div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12" />
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full border-2 border-white dark:border-slate-800"
                    />
                  ))}
                </div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
              </div>

              <div className="flex-between border-t pt-3">
                <div className="h-4 p-2.5 bg-slate-200 dark:bg-slate-700 rounded-full w-10" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-30" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
