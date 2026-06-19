"use client";

import { CreateProjectModal } from "./modals/ProjectModal/CreateProjectModal";
import CreateTaskModal from "./modals/TaskModal/CreateTaskModal";
import { useMainContext } from "@/context/MainContext";
import { CreateMemberModal } from "./modals/MemberModal/CreateMemberModal";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: "project" | "task" | "team";
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const { currentUser } = useMainContext();
  const role = currentUser.role;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h1>

        {description && (
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {description}
          </p>
        )}
      </div>
      {role === "admin" &&
        (action === "project" ? (
          <CreateProjectModal />
        ) : action === "task" ? (
          <CreateTaskModal />
        ) : action === "team" ? (
          <CreateMemberModal />
        ) : null)}
    </div>
  );
}
