"use client";

import { FolderKanban, ListTodo, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchWorkspaces from "../services/fetchWorkspaces";
import Avatar from "@/features/shared/components/Avatar";
import { ProjectGridSkeleton } from "@/features/shared/components/loading/ProjectGridSkeleton";
import EmptyWorkspaces from "./EmptyWorkspaces";
import ErrorWorkspaces from "./ErrorWorkspaces";
import Link from "next/link";

export default function WorkspaceCard() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["workspaces"],
    queryFn: fetchWorkspaces,
  });

  if (error) return <ErrorWorkspaces refetch={refetch} />;
  if (isPending) return <ProjectGridSkeleton />;
  if (!data || data.length === 0) return <EmptyWorkspaces />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((workspace) => (
        <Link
          href={`/dashboard/${workspace.id}`}
          key={workspace.id}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-full min-w-0">
              <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {workspace.name}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <FolderKanban className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {workspace.projectsCount}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Projects
                </p>
              </div>

              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <ListTodo className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {workspace.tasksCount}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tasks
                </p>
              </div>

              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <Users className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {workspace.members.length}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Members
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="flex -space-x-2">
                {workspace.members.slice(0, 4).map((member) => (
                  <Avatar
                    key={member.id}
                    avatar_url={member.avatar_url}
                    user_name={member.full_name}
                  />
                ))}
                {workspace.members.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400 font-medium">
                    +{workspace.members.length - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Users className="w-3.5 h-3.5" />
                {workspace.members.length}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
