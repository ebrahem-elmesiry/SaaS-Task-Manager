import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          {description}
        </p>
      </div>
      {onRetry && (
        <Button variant="purple" size="xl" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
