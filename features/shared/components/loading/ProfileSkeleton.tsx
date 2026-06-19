export function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-32 bg-slate-200 dark:bg-slate-700" />
        {/* User Information */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-800" />
            <div className="mb-2 flex-1">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-64" />
            </div>
          </div>
          {/* Tasks Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-1" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
            </div>
          </div>
          {/* Recent Tasks */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3 p-3">
                  <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Active Projects & Skills */}
        <div className="space-y-6">
          {/* Active Projects */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4" />
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex justify-between gap-2 mb-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                  </div>
                  <div className="h-2 mb-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          {/* Skills */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-4" />
            <div className="flex flex-wrap gap-2">
              <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-22" />
              <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-18" />
              <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-14" />
              <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-20" />
              <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
