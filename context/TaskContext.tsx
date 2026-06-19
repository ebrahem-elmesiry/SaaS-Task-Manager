"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import {
  Assignee,
  ColumnsType,
  selectedTaskType,
  Status,
  Subtask,
} from "@/types/kanban";

import { useTaskActions } from "@/features/kanban/hooks/useTaskActions";
import { useTaskForm } from "@/features/kanban/hooks/useTaskForm";
import { TaskForm } from "@/validation/task.schema";
import { returnFn } from "@/types/main";

interface TaskContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  selectedTask: selectedTaskType | null;
  setSelectedTask: Dispatch<SetStateAction<selectedTaskType | null>>;

  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;

  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;

  openEditModal: () => void;
  closeModal: () => void;
  openModal: (status: Status) => void;
  openDeleteDialog: (taskId: string, status: Status) => void;

  tasks: ColumnsType;
  setTasks: Dispatch<SetStateAction<ColumnsType>>;

  handleSubmit: (formData: TaskForm) => returnFn;

  handleChange: (key: keyof TaskForm, value: string | Subtask[]) => void;

  toggleMember: (member: Assignee) => void;

  handleEditInit: (task: TaskForm) => void;

  deleteTask: (id: string, status: Status) => returnFn;

  formData: TaskForm;

  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({
  children,
  initialTasks,
}: {
  children: ReactNode;
  initialTasks: ColumnsType;
}) => {
  const emptyTask: TaskForm = {
    id: "",
    title: "",
    description: "",
    assignees: [],
    subtasks: [],
    dueDate: "",
    priority: null,
    status: undefined,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<selectedTaskType | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openEditModal = () => {
    setIsEdit(true);
    setIsOpen(true);
  };

  const {
    formData,
    setFormData,
    handleChange,

    toggleMember,
    validate,
  } = useTaskForm(emptyTask);

  const closeModal = () => {
    setFormData(emptyTask);
    setIsEdit(false);
    setIsOpen(false);
  };

  const openDeleteDialog = (taskId: string, status: Status) => {
    setIsDeleteDialogOpen(true);
    setSelectedTask({ taskId, status });
  };

  const { tasks, setTasks, loading, addTask, updateTask, deleteTask } =
    useTaskActions(initialTasks);

  const openModal = (status: Status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));

    setIsOpen(true);
  };

  const handleSubmit = async (formData: TaskForm) => {
    const valid = validate(formData);
    if (!valid.success) {
      return {
        success: false,
        message: valid.message,
      };
    }

    const result = isEdit
      ? await updateTask(formData)
      : await addTask(formData);

    if (!result.success)
      return {
        success: false,
        message: result.message,
      };
    closeModal();
    return {
      success: true,
      message: result.message,
    };
  };

  const handleEditInit = (task: TaskForm) => {
    setFormData(task);
    // setFormData(mapTaskToForm(task));
    openEditModal();
  };

  return (
    <TaskContext.Provider
      value={{
        isOpen,
        setIsOpen,

        selectedTask,
        setSelectedTask,

        isEdit,
        setIsEdit,

        isDeleteDialogOpen,
        setIsDeleteDialogOpen,

        openEditModal,
        closeModal,
        openModal,

        tasks,
        setTasks,

        handleSubmit,
        handleChange,

        toggleMember,
        handleEditInit,
        openDeleteDialog,

        deleteTask,

        formData,

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
