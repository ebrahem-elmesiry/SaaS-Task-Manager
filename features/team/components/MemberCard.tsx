"use client";

import { Mail } from "lucide-react";
import { getRoleColor } from "@/lib/utils";
import TeamActionsMenu from "@/features/shared/components/menus/TeamActionsMenu";
import Avatar from "@/features/shared/components/Avatar";
import { Member } from "@/types/team";
import { Crown, Shield, User } from "lucide-react";
import { Role } from "@/types/main";
import type { LucideIcon } from "lucide-react";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";

interface Props {
  member: Member;
}

export default function MemberCard({ member }: Props) {
  const roleIcons: Record<Role, LucideIcon> = {
    admin: Crown,
    manager: Shield,
    member: User,
  };
  const currentUser = useCurrentUser();
  const [first, last] = member.full_name.split(" ");
  const fullName =
    first[0].toLocaleUpperCase() +
    first.slice(1) +
    " " +
    last[0].toLocaleUpperCase() +
    last.slice(1);
  const RoleIcon = roleIcons[member.role as Role] ?? User;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            <Avatar
              isTeamPage={true}
              avatar_url={member.avatar}
              user_name={member.full_name}
            />
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
              member.status === "online" ? "bg-green-500" : "bg-slate-400"
            }`}
          />
        </div>
        {currentUser?.role !== "member" && <TeamActionsMenu member={member} />}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
          {fullName}
        </h3>
        <div className="grid grid-cols-[auto_1fr] items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-2">
          <Mail className="w-3.5 h-3.5" />
          <span className="truncate">{member.email}</span>
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
}
