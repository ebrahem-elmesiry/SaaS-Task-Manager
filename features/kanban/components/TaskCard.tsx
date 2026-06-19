import { getPriorityColor } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import { Status, Task, TaskPreviewType } from "@/types/kanban";
import { CheckCircle2, Clock, MessageSquare, Paperclip } from "lucide-react";
import TaskActionsMenu from "@/features/shared/components/menus/TaskMenu";
import { useMainContext } from "@/context/MainContext";

interface TaskCardProps {
  id: string;
  index: number;
  task: Task;
  status: Status;
  onTaskClick: (taskId: string, status: Status) => void;
  isOverlay?: boolean;
}

export default function TaskCard({
  id,
  task,
  index,
  status,
  onTaskClick,
  isOverlay = false,
}: TaskCardProps) {
  const { currentUser } = useMainContext();
  const taskPreview: TaskPreviewType = {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    subtasks: task.subtasks,
    assignees: task.assignees,
    status: status as Status,
  };

  const totalTasks = task.subtasks.length;
  const completedTasks = task.subtasks.filter((t) => t.completed).length;
  const { ref, isDragging } = useSortable({
    id,
    index,
    group: status,
    data: { columnId: status },
  });

  const attachments =
    task.comments?.filter((c) => /data-type="mention"/.test(c.text)).length ||
    0;

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      onClick={() => onTaskClick(task.id, status)}
      className={`bg-white dark:bg-slate-800 rounded-lg p-4 
        border border-slate-200 dark:border-slate-700 cursor-pointer 
        hover:shadow-md transition-all 
        ${isDragging && !isOverlay ? "opacity-50" : "opacity-100"}
        `}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}
        >
          {task.priority[0].toLocaleUpperCase() + task.priority.slice(1)}
        </span>
        {currentUser.role !== "member" && (
          <TaskActionsMenu taskPreview={taskPreview} />
        )}
      </div>

      <h4 className="font-medium text-slate-900 dark:text-white mb-3 text-sm leading-snug">
        {task.title}
      </h4>

      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>
            {completedTasks}/{totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{task.comments?.length || task.commentsCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <Paperclip className="w-3.5 h-3.5" />
          <span>{attachments}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignees.map((assignee) => (
            <div
              key={assignee.id}
              className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-white"
              title={assignee.name}
            >
              {assignee.avatar}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {task.dueDate}
        </div>
      </div>
    </div>
  );
}
