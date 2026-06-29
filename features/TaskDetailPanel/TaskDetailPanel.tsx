import { TaskInfo } from "./TaskInfo";
import { TaskDescription } from "./TaskDescription";
import { SubtasksList } from "./SubtasksList";
import { CommentsSection } from "./CommentSection/CommentsSection";
import { Task } from "@/types/kanban";
import EmptyTaskDetails from "./EmptyTaskDetails";
import ActivityComponent from "@/features/TaskDetailPanel/Activity/ActivityComponent";

type TaskDetailPanelProps = {
  task: Task | undefined;
};

export function TaskDetailPanel({ task }: TaskDetailPanelProps) {
  if (!task) return <EmptyTaskDetails />;

  const commentsCount = task.commentsCount;

  return (
    <div className="inset-y-0 w-full overflow-hidden flex flex-col z-50">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 pt-0 space-y-6">
          <TaskInfo
            title={task.title}
            status={task.status}
            dueDate={task.dueDate}
            priority={task.priority}
            assignees={task.assignees}
          />
          <TaskDescription description={task.description} />
          <SubtasksList
            taskId={task.id}
            status={task.status}
            subtasks={task.subtasks}
            projectId={task.project_id}
          />
          <ActivityComponent />
          <CommentsSection
            commentsCount={commentsCount}
            taskId={task.id}
            status={task.status}
            assignees={task.assignees}
          />
        </div>
      </div>
    </div>
  );
}
