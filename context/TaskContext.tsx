"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { Assignee, Status, Subtask } from "@/types/kanban";

import { useTaskActions } from "@/features/kanban/hooks/useTaskActions";
import { useTaskForm } from "@/features/kanban/hooks/useTaskForm";
import { TaskForm } from "@/validation/task.schema";
import { useParams } from "next/navigation";

type selectedTask = { taskId: string; status: Status } | null;

interface TaskContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;

  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;

  openEditModal: () => void;
  closeModal: () => void;
  openModal: (status: Status) => void;
  openDeleteDialog: (taskId: string, status: Status) => void;

  handleSubmit: (formData: TaskForm) => void;

  handleChange: (key: keyof TaskForm, value: string | Subtask[]) => void;

  toggleMember: (member: Assignee) => void;

  handleEditInit: (task: TaskForm) => void;

  deleteTask: (data: {
    id: string;
    status: Status;
    title: string | undefined;
    project_id: string;
  }) => Promise<void>;

  formData: TaskForm;
  taskToDelete: selectedTask;

  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ projectId: string }>();
  const { projectId } = params;
  const emptyTask: TaskForm = {
    id: "",
    title: "",
    project_id: projectId || "",
    description: "",
    assignees: [],
    subtasks: [],
    dueDate: "",
    priority: undefined,
    status: undefined,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<selectedTask>(null);

  const openEditModal = () => {
    setIsEdit(true);
    setIsOpen(true);
  };

  const { formData, setFormData, handleChange, toggleMember, validate } =
    useTaskForm(emptyTask);

  const closeModal = () => {
    setFormData(emptyTask);
    setIsEdit(false);
    setIsOpen(false);
  };

  const openDeleteDialog = (taskId: string, status: Status) => {
    setIsDeleteDialogOpen(true);
    setTaskToDelete({ taskId, status });
  };

  const { loading, addTask, updateTask, deleteTask } = useTaskActions();

  const openModal = (status: Status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));

    setIsOpen(true);
  };

  const handleSubmit = (formData: TaskForm) => {
    const valid = validate(formData);
    if (!valid) return;

    if (isEdit) {
      updateTask(formData);
    } else {
      addTask(formData);
    }
    closeModal();
  };

  const handleEditInit = (task: TaskForm) => {
    setFormData(task);
    openEditModal();
  };

  return (
    <TaskContext.Provider
      value={{
        isOpen,
        setIsOpen,

        isEdit,
        setIsEdit,

        isDeleteDialogOpen,
        setIsDeleteDialogOpen,

        openEditModal,
        closeModal,
        openModal,

        handleSubmit,
        handleChange,

        toggleMember,
        handleEditInit,
        openDeleteDialog,

        deleteTask,

        formData,
        taskToDelete,

        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};
