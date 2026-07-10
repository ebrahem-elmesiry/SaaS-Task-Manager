"use client";

import { Status, Task } from "@/types/kanban";

import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

import TaskCard from "./TaskCard";
import Column from "./Column";
import {
  handleDragEndFn,
  handleDragOverFn,
  handleDragStartFn,
} from "../handlers/dragHandlers";
import { KanbanBoardSkeleton } from "../../shared/components/loading/KanbanBoardSkeleton";
import AlertDeleteDialog from "../../shared/components/Alerts/AlertDeleteDialog";
import { TaskSheet } from "@/features/shared/components/Sheets/TaskSheet";
import { useTaskSheet } from "../hooks/useTaskSheet";
import TaskError from "./TaskError";
import EmptyKanban from "./EmptyKanban";
import { useTaskContext } from "@/context/TaskContext";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { useParams } from "next/navigation";

export default function Columns({ projectId }: { projectId: string }) {
  const { openModal, loading, isDeleteDialogOpen, setIsDeleteDialogOpen } =
    useTaskContext();

  const currentUser = useCurrentUser();

  const {
    handleTaskClick,
    status,
    closeSheet,
    taskId,
    handleDelete,
    data,
    taskPending,
    error,
    refetch,
    activeCard,
    parentRef,
    initialTasks,
    updateTasksCache,
    setActiveCard,
  } = useTaskSheet(projectId);

  const { workspaceId } = useParams<{ workspaceId: string }>();
  if (error) return <TaskError onRetry={() => refetch()} />;

  if (taskPending) return <KanbanBoardSkeleton />;

  if (!data) return <EmptyKanban />;
  const isDataEmpty = Object.values(data).every((arr) => arr.length === 0);
  if (isDataEmpty) return <EmptyKanban />;

  const task = data[status]?.find((col) => col.id === taskId);
  return (
    <DragDropProvider
      onDragStart={(event) =>
        handleDragStartFn({
          event,
          tasks: data,
          setActiveCard,
          setInitialTasks: (t) => (initialTasks.current = t),
        })
      }
      onDragOver={(event) =>
        handleDragOverFn({
          event,
          setTasks: updateTasksCache,
        })
      }
      onDragEnd={(event) =>
        handleDragEndFn({
          tasks: data,
          event,
          activeCard,
          initialTasks,
          setTasks: updateTasksCache,
          setActiveCard,
          currentUser,
          workspaceId,
        })
      }
    >
      <div ref={parentRef} className="flex gap-4 overflow-x-auto pb-4">
        {(Object.entries(data) as [Status, Task[]][]).map(
          ([status, columnTasks]) => (
            <Column
              key={status}
              status={status}
              tasks={columnTasks}
              onTaskClick={handleTaskClick}
              openModal={() => openModal(status)}
            />
          ),
        )}
        {!!taskId && (
          <TaskSheet task={task} taskId={taskId} closeSheet={closeSheet} />
        )}

        <AlertDeleteDialog
          Loading={loading}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          onClick={(e) => handleDelete(e, setIsDeleteDialogOpen, projectId)}
          title="Delete this task?"
          description="This action cannot be undone. This will permanently delete this task and all related data from our servers."
          buttonText="Yes, delete task"
        />
      </div>
      <DragOverlay>
        {activeCard ? (
          <TaskCard
            id={activeCard.id}
            index={0}
            status={activeCard.columnId}
            task={activeCard}
            onTaskClick={handleTaskClick}
            isOverlay={true}
          />
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}
