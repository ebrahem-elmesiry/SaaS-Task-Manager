import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { messages } from "@/messages";

import { ColumnsType, Status, Task } from "@/types/kanban";
import { TaskForm } from "@/validation/task.schema";

export const useTaskActions = (initialTasks: ColumnsType) => {
  const [tasks, setTasks] = useState<ColumnsType>(initialTasks);
  const [loading, setLoading] = useState(false);

  async function addTask(data: TaskForm) {
    const previousTasks = tasks;
    const priority = data.priority;
    const status = data.status;

    if (!status && !priority)
      return { success: false, message: "Priority and Status are required" };
    if (!status) return { success: false, message: "Status is required" };
    if (!priority) return { success: false, message: "Priority is required" };

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      const newTask: Task = {
        ...data,
        // columnId: status,
        id: crypto.randomUUID(),
        subtasks: structuredClone(data.subtasks),
        priority,
        dueDate: formatDate(data.dueDate),
        commentsCount: 0,
        attachments: 0,
      };

      setTasks((prev) => ({
        ...prev,
        [status]: [newTask, ...prev[status]],
      }));

      return {
        success: true,
        message: messages.task.create.success,
      };
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
      return {
        success: false,
        message: messages.task.create.error,
      };
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(data: TaskForm) {
    const previousTasks = tasks;

    const priority = data.priority;
    const status = data.status;

    if (!status && !priority)
      return { success: false, message: "Priority and Status are required" };
    if (!status) return { success: false, message: "Status is required" };
    if (!priority) return { success: false, message: "Priority is required" };

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));

      const newTask: TaskForm = {
        ...data,
        priority,
        dueDate: formatDate(data.dueDate),
        subtasks: structuredClone(data.subtasks),
      };

      setTasks((prev) => ({
        ...prev,
        [status]: prev[status].map((task) =>
          task.id === data.id ? { ...task, ...newTask } : task,
        ),
      }));

      return {
        success: true,
        message: messages.task.update.success,
      };
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
      return {
        success: false,
        message: messages.task.update.error,
      };
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: string, status: Status) {
    const previousTasks = tasks;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      setTasks((prev) => ({
        ...prev,
        [status]: prev[status].filter((task) => task.id !== id),
      }));

      return {
        success: true,
        message: messages.task.delete.success,
      };
    } catch (error) {
      console.error(error);
      setTasks(previousTasks);
      return {
        success: false,
        message: messages.task.delete.error,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    tasks,
    setTasks,

    loading,

    addTask,
    updateTask,
    deleteTask,
  };
};
