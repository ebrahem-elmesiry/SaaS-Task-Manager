import { Member, MemberForm } from "@/types/team";
import { useState } from "react";
import { messages } from "@/messages";
import { formatDate } from "@/lib/utils";

export const useMemberActions = (initialMembers: Member[]) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [loading, setLoading] = useState(false);

  const addMember = async (data: MemberForm) => {
    const previous = members;

    if (!data.role) return { success: false, message: "Role is required" };

    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1000));

      const memberId = crypto.randomUUID();

      const newMember: Member = {
        ...data,
        id: memberId,
        role: data.role,

        avatar: data.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),

        status: "offline",
        tasksCompleted: 0,
        activeProjects: 0,
        joinedDate: formatDate(new Date()),
      };

      setMembers((prev) => [newMember, ...prev]);

      return {
        success: true,
        message: messages.team.create.success,
      };
    } catch (err) {
      console.log(err);
      setMembers(previous);
      return {
        success: false,
        message: messages.team.create.error,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateMember = async (data: MemberForm) => {
    const previous = members;

    if (!data.role) return { success: false, message: "Role is required" };

    const role = data.role;

    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1000));

      setMembers((prev) =>
        prev.map((m) => (m.id === data.id ? { ...m, ...data, role } : m)),
      );

      return {
        success: true,
        message: messages.team.update.success,
      };
    } catch (err) {
      setMembers(previous);
      console.log(err);
      return {
        success: false,
        message: messages.team.update.error,
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id: string) => {
    const previous = members;

    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1000));

      setMembers((prev) => prev.filter((m) => m.id !== id));

      return {
        success: true,
        message: messages.team.delete.success,
      };
    } catch (err) {
      setMembers(previous);
      console.log(err);
      return {
        success: true,
        message: messages.team.delete.error,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    members,
    setMembers,
    loading,
    addMember,
    updateMember,
    deleteMember,
  };
};
