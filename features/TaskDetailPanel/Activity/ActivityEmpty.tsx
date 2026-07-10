export default function ActivityEmpty() {
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="flex items-center h-15 text-sm text-slate-400 dark:text-slate-500"
    >
      <span className="flex-1 text-center">No recent activity</span>
    </div>
  );
}
