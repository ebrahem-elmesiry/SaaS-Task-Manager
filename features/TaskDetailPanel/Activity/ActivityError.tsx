import { RefreshCw } from "lucide-react";

type ActivityErrorProps = {
  onRetry: () => void;
};

export default function ActivityError({ onRetry }: ActivityErrorProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Activity Log
      </h4>
      <div className="flex flex-col items-center justify-center gap-3 py-6 text-sm">
        <p className="text-red-500 dark:text-red-400">
          Failed to load activity
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <RefreshCw className="size-3.5" />
          Retry
        </button>
      </div>
    </div>
  );
}
