import { useMainContext } from "@/context/MainContext";
import { createClient } from "@/lib/supabase/client";
import { messages } from "@/messages";
import { Shield, Users, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useRole() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { currentUser } = useMainContext();
  const { push } = useRouter();

  useEffect(() => {
    if (currentUser?.role) {
      push("/");
    }
  }, [currentUser?.role, push]);

  async function submitRole() {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        role: selectedRole,
      })
      .eq("id", currentUser.id);
    if (error) {
      console.log(error);
      toast.error(messages.error.unknown);
      return;
    }
    push("/");
  }
  const roles = [
    {
      id: "admin",
      name: "Admin",
      description: "Full access to manage team, projects, and settings",
      icon: Shield,
      color: "indigo",
    },
    {
      id: "manager",
      name: "Manager",
      description: "Manage projects and team members",
      icon: Users,
      color: "purple",
    },
    {
      id: "member",
      name: "Member",
      description: "Collaborate on tasks and projects",
      icon: User,
      color: "blue",
    },
  ];
  return { selectedRole, setSelectedRole, roles, submitRole };
}
