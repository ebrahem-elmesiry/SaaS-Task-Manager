import { useState } from "react";

import { Assignee, Subtask } from "@/types/kanban";
import { TaskForm, taskFormSchema } from "@/validation/task.schema";
import { toast } from "sonner";

export const useTaskForm = (initialState: TaskForm) => {
  const [formData, setFormData] = useState<TaskForm>(initialState);

  const handleChange = (key: keyof TaskForm, value: string | Subtask[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleMember = (member: Assignee) => {
    const isSelected = formData.assignees.some((m) => m.id === member.id);

    const newTeam = isSelected
      ? formData.assignees.filter((m) => m.id !== member.id)
      : [...formData.assignees, member];

    setFormData((prev) => ({
      ...prev,
      assignees: newTeam,
    }));
  };

  const validate = (formData: TaskForm) => {
    const result = taskFormSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData,

    handleChange,

    toggleMember,

    validate,
  };
};
