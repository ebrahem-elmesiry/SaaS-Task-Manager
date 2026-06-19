import { useDroppable } from "@dnd-kit/react";
import { Plus } from "lucide-react";
import { Status, Task } from "@/types/kanban";
import { columnTitles, getColorClasses } from "@/lib/utils";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onTaskClick: (taskId: string, status: Status) => void;
  openModal: (ID: string) => void;
  status: Status;
}

export default function Column({
  tasks,
  onTaskClick,
  openModal,
  status,
}: Props) {
  const { ref } = useDroppable({ id: status });
  return (
    <div ref={ref} className="shrink-0 w-80">
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getColorClasses(status)}`}
            >
              {columnTitles[status]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => openModal(status)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
        <div className="space-y-3 min-h-125">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              id={task.id}
              index={index}
              status={status}
              task={task}
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
