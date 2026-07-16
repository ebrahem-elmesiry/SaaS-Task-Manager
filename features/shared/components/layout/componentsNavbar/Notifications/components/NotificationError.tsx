export default function NotificationError({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 text-center">
        <span className="text-sm text-red-500 dark:text-red-400">
          Failed to load notifications
        </span>
        <span className="mt-1 text-xs text-slate-400">{error.message}</span>
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={refetch}
          className="w-full py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition"
        >
          Try again
        </button>
      </div>
    </>
  );
}
