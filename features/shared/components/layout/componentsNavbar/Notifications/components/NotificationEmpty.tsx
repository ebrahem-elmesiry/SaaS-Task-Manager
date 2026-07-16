export default function NotificationEmpty() {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">0 unread</p>
        </div>
        <div className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
          Mark all read
        </div>
      </div>

      <div className="flex items-center justify-center p-8 text-sm text-slate-500 dark:text-slate-400">
        No notifications yet
      </div>
    </>
  );
}
