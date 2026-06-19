export function KanbanBoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-125 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div className="shrink-0 w-80" key={i}>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            {/* Header (exact match) */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 my-1.5 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-5 w-6 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>

              {/* CreateTaskModal placeholder */}
              <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-125">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                >
                  {/* Title + menu */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>

                  {/* description */}
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />

                  {/* footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2].map((k) => (
                        <div
                          key={k}
                          className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"
                        />
                      ))}
                    </div>

                    <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
