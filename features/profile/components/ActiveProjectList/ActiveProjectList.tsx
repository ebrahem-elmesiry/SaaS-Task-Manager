import { Project } from "@/types/profile";

type Props = {
  projects: Project[];
};

export default function ActiveProjectList({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
        No active projects
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div key={project.id}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {project.name}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {project.progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {project.total_tasks} tasks assigned
          </div>
        </div>
      ))}
    </div>
  );
}
