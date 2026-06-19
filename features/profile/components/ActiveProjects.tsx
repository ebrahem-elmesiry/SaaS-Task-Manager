import { Project } from "@/types/profile";

type Props = {
  projects: Project[];
};

export default function ActiveProjects({ projects }: Props) {
  return (
    <div className="space-y-6">
      {/* Active Projects */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Active Projects
        </h2>

        <div
          style={{ scrollbarWidth: "none" }}
          className="space-y-3 max-h-55 overflow-y-auto"
        >
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
                {project.tasks} tasks assigned
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
