import { Users } from "lucide-react";

export default function EmptyTeam() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
        No team members found
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        There are no members matching your current filter.
      </p>
    </div>
  );
}
