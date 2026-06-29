import { useState } from "react";
import { FormState } from "@/types/project";
import { projectSchema } from "@/validation/project.schema";
import { toast } from "sonner";
import { Assignee } from "@/types/kanban";

export const useProjectForm = (initialState: FormState) => {
  const [formData, setFormData] = useState<FormState>(initialState);

  const handleChange = (
    key: keyof FormState,
    value: string | (Date | undefined),
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]:
        key === "startDate" || key === "endDate"
          ? (value as Date | undefined)
          : value,
    }));
  };

  const toggleMember = (member: Assignee) => {
    const isSelected = formData.team.some((m) => m.id === member.id);
    const newTeam = isSelected
      ? formData.team.filter((m) => m.id !== member.id)
      : [...formData.team, member];
    setFormData((prev) => ({ ...prev, team: newTeam }));
  };

  const validate = (formData: FormState) => {
    const result = projectSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
      // return {
      //   success: false,
      //   message: result.error.issues[0].message,
      // };
    }
    // return {
    //   success: true,
    // };
    return true;
  };
  // const validate = () => {
  //   const result = projectSchema.safeParse(formData);
  //   if (!result.success) {
  //     toast.error(result.error.issues[0].message);
  //     return false;
  //   }
  //   return true;
  // };

  return {
    formData,
    setFormData,
    handleChange,
    toggleMember,
    validate,
  };
};
