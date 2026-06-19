export function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Tabs Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex gap-4 p-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white dark:bg-slate-800">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full" />

            <div className="flex-1">
              <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2" />
              <div className="h-3 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>

          {/* Secondary Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
