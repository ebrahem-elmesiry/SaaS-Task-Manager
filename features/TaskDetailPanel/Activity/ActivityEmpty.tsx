export default function ActivityEmpty() {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white">
        Activity Log
      </h4>
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex items-center h-15 text-sm text-slate-400 dark:text-slate-500"
      >
        <span className="flex-1 text-center">No recent activity</span>
      </div>
    </div>
  );
}
