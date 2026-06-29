"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import { getStatusColor } from "@/lib/utils";
import ProjectActionsMenu from "../../shared/components/menus/ProjectMenu";
import AlertDeleteDialog from "../../shared/components/Alerts/AlertDeleteDialog";
import { useMainContext } from "@/context/MainContext";
import { Assignee } from "@/types/kanban";
import { ProjectGridSkeleton } from "@/features/shared/components/loading/ProjectGridSkeleton";
import fetchProjects from "../services/fetchProjects";
import { useQuery } from "@tanstack/react-query";
import EmptyProjects from "./EmptyProjects";
import ErrorProjects from "./ErrorProjects";
import Avatar from "@/features/shared/components/Avatar";

export default function ProjectCard() {
  const { deleteProject, Loading, handleEditInit } = useProjectContext();
  const { currentUser } = useMainContext();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const [projectId, setProjectId] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (error) return <ErrorProjects refetch={refetch} />;

  if (isPending) return <ProjectGridSkeleton />;
  if (!data || data?.length === 0) return <EmptyProjects />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group"
        >
          {/* Name, Description */}
          <div className="flex items-start justify-between mb-4">
            <Link className="w-full min-w-0" href={`/kanban/${project.id}`}>
              <div>
                <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
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
                {project.team.slice(0, 4).map((member: Assignee) => (
                  <Avatar
                    key={member.id}
                    avatar_url={member.avatar_url}
                    user_name={member.full_name}
                  />
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
          await deleteProject(projectId);
          setIsDeleteDialogOpen(false);
        }}
        title="Delete this project?"
        description="This action cannot be undone. This will permanently delete the project and all related tasks from our servers."
        buttonText="Yes, delete project"
      />
    </div>
  );
}
