"use client";

import { useTaskContext } from "@/context/TaskContext";
import { Status, Task } from "@/types/kanban";

import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

import { useRef, useState } from "react";
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

type activeCard = Task & {
  columnId: Status;
};

export default function Columns({ isPending }: { isPending: boolean }) {
  const {
    isTaskSheetOpen,
    setIsTaskSheetOpen,
    handleTaskClick,
    selectedTask,
    closeSheet,
    handleDelete,
    isTaskDetailsPending,
  } = useTaskSheet();

  const {
    tasks,
    setTasks,
    openModal,
    loading,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = useTaskContext();

  const parentRef = useRef(null);

  const [activeCard, setActiveCard] = useState<activeCard | undefined>(
    undefined,
  );

  const initialTasks = useRef<Record<Status, Task[]> | null>(null);

  if (isPending) return <KanbanBoardSkeleton />;
  return (
    <DragDropProvider
      onDragStart={(event) =>
        handleDragStartFn({
          event,
          tasks,
          setActiveCard,
          setInitialTasks: (t) => (initialTasks.current = t),
        })
      }
      onDragOver={(event) =>
        handleDragOverFn({
          event,
          setTasks,
        })
      }
      onDragEnd={(event) =>
        handleDragEndFn({
          event,
          activeCard,
          initialTasks,
          setTasks,
          setActiveCard,
        })
      }
    >
      <div ref={parentRef} className="flex gap-4 overflow-x-auto pb-4">
        {(Object.entries(tasks) as [Status, Task[]][]).map(
          ([status, columnTasks]) => (
            <Column
              tasks={columnTasks}
              key={status}
              status={status}
              onTaskClick={handleTaskClick}
              openModal={() => openModal(status)}
            />
          ),
        )}
        {isTaskSheetOpen && (
          <TaskSheet
            tasks={tasks}
            open={isTaskSheetOpen}
            onOpenChange={setIsTaskSheetOpen}
            selectedTask={selectedTask}
            closeSheet={closeSheet}
            isTaskDetailsPending={isTaskDetailsPending}
          />
        )}

        <AlertDeleteDialog
          Loading={loading}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          onClick={(e) => handleDelete(e, setIsDeleteDialogOpen)}
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
