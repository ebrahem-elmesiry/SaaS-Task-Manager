import { Inbox, Plus } from "lucide-react";

interface EmptyDashboardProps {
  onCreateProject: () => void;
}

export function EmptyDashboard({ onCreateProject }: EmptyDashboardProps) {
  return (
    <div className="flex items-center justify-center min-h-150">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Inbox className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
          No projects yet
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Get started by creating your first project and inviting your team
          members to collaborate.
        </p>
        <button
          onClick={onCreateProject}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create your first project
        </button>
      </div>
    </div>
  );
}
