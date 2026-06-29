import { FolderOpen } from "lucide-react";

export default function EmptyProjects() {
  return (
    <div className="flex items-center justify-center min-h-75">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <FolderOpen className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
          No projects yet
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Get started by creating your first project and inviting your team to
          collaborate.
        </p>
      </div>
    </div>
  );
}
