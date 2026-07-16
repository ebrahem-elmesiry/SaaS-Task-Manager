export default function NotificationLoading() {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">&nbsp;</p>
        </div>
        <div className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
          Mark all read
        </div>
      </div>

      <div className="max-h-100 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 p-4 animate-pulse">
            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-3 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-3 w-30 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
