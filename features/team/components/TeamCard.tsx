"use client";

import { useMemberContext } from "@/context/TeamContext";
import { Mail } from "lucide-react";
import { getRoleColor, getRoleIcon } from "@/lib/utils";
import { toast } from "sonner";
import TeamActionsMenu from "@/features/shared/components/menus/TeamMenu";
import AlertDeleteDialog from "@/features/shared/components/Alerts/AlertDeleteDialog";

export default function TeamCard() {
  const {
    members,
    loading,
    deleteMember,
    selectedMemberId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = useMemberContext();

  const deleteFn = async (projectId: string) => {
    const result = await deleteMember(projectId);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => {
        const RoleIcon = getRoleIcon(member.role);
        return (
          <div
            key={member.id}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  {member.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                    member.status === "online" ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
              </div>
              {/* Team Menu */}
              <TeamActionsMenu member={member} />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-2">
                <Mail className="w-3.5 h-3.5" />
                {member.email}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs ${getRoleColor(member.role)}`}
                >
                  <RoleIcon className="w-3.5 h-3.5" />
                  {member.role}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs ${
                    member.status === "online"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Tasks Done
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {member.tasksCompleted}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Projects
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {member.activeProjects}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Joined {member.joinedDate}
            </div>
          </div>
        );
      })}
      <AlertDeleteDialog
        Loading={loading}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onClick={async (e) => {
          e.preventDefault();
          await deleteFn(selectedMemberId);
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}
