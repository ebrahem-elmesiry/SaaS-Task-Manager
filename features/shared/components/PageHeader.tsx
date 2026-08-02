"use client";

import dynamic from "next/dynamic";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

const CreateProjectModal = dynamic(() =>
  import("./modals/ProjectModal/CreateProjectModal").then(
    (m) => m.CreateProjectModal,
  ),
);
const CreateTaskModal = dynamic(() =>
  import("./modals/TaskModal/CreateTaskModal").then((m) => m.default),
);
const CreateMemberModal = dynamic(() =>
  import("./modals/MemberModal/CreateMemberModal").then(
    (m) => m.CreateMemberModal,
  ),
);
const CreateWorkspaceModal = dynamic(() =>
  import("./modals/WorkspaceModal/CreateWorkspaceModal").then(
    (m) => m.CreateWorkspaceModal,
  ),
);

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: "project" | "task" | "team" | "workspace";
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const currentUser = useCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h1>

        {description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {description}
          </p>
        )}
      </div>
      {role !== "member" &&
        (action === "project" ? (
          <CreateProjectModal />
        ) : action === "task" ? (
          <CreateTaskModal />
        ) : action === "team" ? (
          <CreateMemberModal />
        ) : action === "workspace" ? (
          <CreateWorkspaceModal />
        ) : null)}
    </div>
  );
}
