import { KeyboardEvent, MouseEvent, useState } from "react";
import { Subtask } from "@/types/kanban";
import { toast } from "sonner";

type Props = {
  subtasks: Subtask[];
  onSubtasksChange: (newSubtasks: Subtask[]) => void;
};

export function useSubtasksManager({ subtasks, onSubtasksChange }: Props) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const handleAddSubtask = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    if (!newSubtaskTitle.trim()) {
      toast.info("Please fill in this field.");
      return;
    }

    const newSubtask: Subtask = {
      id: crypto.randomUUID(),
      title: newSubtaskTitle,
      completed: false,
    };

    onSubtasksChange([...subtasks, newSubtask]);
    setNewSubtaskTitle("");
  };

  const handleRemoveSubtask = (id: string) => {
    onSubtasksChange(subtasks.filter((task) => task.id !== id));
  };

  return {
    newSubtaskTitle,
    setNewSubtaskTitle,
    handleAddSubtask,
    handleRemoveSubtask,
  };
}
