"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import { getStatusColor } from "@/lib/utils";
import { toast } from "sonner";
import ProjectActionsMenu from "../../shared/components/menus/ProjectMenu";
import AlertDeleteDialog from "../../shared/components/Alerts/AlertDeleteDialog";
import { useMainContext } from "@/context/MainContext";

export default function ProjectCard() {
  const { deleteProject, projects, Loading, handleEditInit } =
    useProjectContext();
  const { currentUser } = useMainContext();

  const [projectId, setProjectId] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteFn = async (projectId: string) => {
    const result = await deleteProject(projectId);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group"
        >
          {/* Name, Description */}
          <div className="flex items-start justify-between mb-4">
            <Link className="w-full" href={`/kanban?projectId=${project.id}`}>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                  {project.description}
                </p>
              </div>
            </Link>

            {/* Project Menu */}
            {currentUser.role !== "member" && (
              <ProjectActionsMenu
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                editData={project}
                onEdit={handleEditInit}
                setProjectId={setProjectId}
              />
            )}
          </div>

          <div className="space-y-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-400">
                  Progress
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {project.progress}%
                </span>
              </div>

              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Team Information */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.team.slice(0, 4).map((member) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-white font-medium"
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                ))}

                {project.team.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400 font-medium">
                    +{project.team.length - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Users className="w-3.5 h-3.5" />
                {project.team.length}
              </div>
            </div>

            {/* Status */}
            <div className="flex-between pt-3 border-t border-slate-100 dark:border-slate-700">
              <span
                className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{project.endDate}</span>
                <span className="text-slate-500 dark:text-slate-400">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {project.tasks.completed}/{project.tasks.total} tasks
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AlertDeleteDialog
        Loading={Loading}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onClick={async (e) => {
          e.preventDefault();
          await deleteFn(projectId);
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}
