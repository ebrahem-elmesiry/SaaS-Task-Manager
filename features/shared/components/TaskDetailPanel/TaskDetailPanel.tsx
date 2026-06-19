import { TaskInfo } from "./TaskInfo";
import { TaskDescription } from "./TaskDescription";
import { SubtasksList } from "./SubtasksList";
import { ActivityLog } from "./ActivityLog";
import { CommentsSection } from "./CommentSection/CommentsSection";
import { ColumnsType, selectedTaskType } from "@/types/kanban";
import { TaskDetailSkeleton } from "../loading/TaskDetailSkeleton";
import { activities } from "@/app/(root)/(home)/page";

type TaskDetailPanelProps = {
  selectedTask: selectedTaskType | null;
  isTaskDetailsPending: boolean;
  tasks: ColumnsType;
};

export function TaskDetailPanel({
  isTaskDetailsPending,
  selectedTask,
  tasks,
}: TaskDetailPanelProps) {
  if (!selectedTask?.status) return;
  const task = tasks[selectedTask.status].find(
    (col) => col.id === selectedTask.taskId,
  );

  if (!task) return;

  const commentsCount = task.commentsCount;

  return (
    <div className="inset-y-0 w-full overflow-hidden flex flex-col z-50">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 pt-0 space-y-6">
          <TaskInfo
            title={task.title}
            status={selectedTask.status}
            dueDate={task.dueDate}
            priority={task.priority}
            assignees={task.assignees}
          />
          <TaskDescription description={task.description} />
          <SubtasksList
            taskId={task.id}
            status={selectedTask.status}
            subtasks={task.subtasks}
          />
          {isTaskDetailsPending ? (
            <TaskDetailSkeleton commentsCount={commentsCount} />
          ) : (
            <>
              <ActivityLog activities={activities} />

              <CommentsSection
                taskId={task.id}
                status={selectedTask.status}
                assignees={task.assignees}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
