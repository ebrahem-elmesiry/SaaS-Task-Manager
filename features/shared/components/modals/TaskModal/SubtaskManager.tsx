import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Subtask } from "@/types/kanban";
import { useSubtasksManager } from "@/features/TaskDetailPanel/hooks/subtask/useSubtasksManager";

interface SubtaskManagerProps {
  subtasks: Subtask[];
  onSubtasksChange: (newSubtasks: Subtask[]) => void;
}

export function SubtaskManager({
  subtasks,
  onSubtasksChange,
}: SubtaskManagerProps) {
  const {
    newSubtaskTitle,
    setNewSubtaskTitle,
    handleAddSubtask,
    handleRemoveSubtask,
  } = useSubtasksManager({ subtasks, onSubtasksChange });

  return (
    <div className="">
      <div className="flex gap-2">
        <Input
          placeholder="Add subtask..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSubtask(e);
            }
          }}
        />
        <Button size={"xl"} variant={"purple"} onClick={handleAddSubtask}>
          Add
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="grid grid-cols-[1fr_auto] items-center px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900"
          >
            <p className="text-sm truncate">{subtask.title}</p>
            <Button
              variant="ghost"
              onClick={() => handleRemoveSubtask(subtask.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
