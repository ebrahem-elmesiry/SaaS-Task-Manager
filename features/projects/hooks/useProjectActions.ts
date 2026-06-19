import { useState } from "react";
import { projectCard, statusType, FormState } from "@/types/project";
import { formatDate } from "@/lib/utils";
import { messages } from "@/messages";

export const useProjectActions = (initialProjects: projectCard[]) => {
  const [projects, setProjects] = useState<projectCard[]>(initialProjects);
  const [Loading, setLoading] = useState(false);

  const addProject = async (data: FormState) => {
    const previousProjects = projects;

    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1000));

      const newProject: projectCard = {
        ...data,
        id: crypto.randomUUID(),
        progress: 0,
        status: "Just Started" as statusType,
        startDate: formatDate(data.startDate || ""),
        endDate: formatDate(data.endDate || ""),
        tasks: { completed: 0, total: 0 },
      } as projectCard;

      setProjects((prev) => [newProject, ...prev]);

      return {
        success: true,
        message: messages.project.create.success,
      };
    } catch (error) {
      console.log(error);
      setProjects(previousProjects);
      return {
        success: true,
        message: messages.project.create.error,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (data: FormState) => {
    const previousProjects = projects;

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      setProjects((prev) =>
        prev.map((p) =>
          p.id === data.id
            ? {
                ...p,
                ...data,
                startDate: formatDate(data.startDate || ""),
                endDate: formatDate(data.endDate || ""),
              }
            : p,
        ),
      );

      return {
        success: true,
        message: messages.project.update.success,
      };
    } catch (error) {
      console.log(error);
      setProjects(previousProjects);
      return {
        success: true,
        message: messages.project.update.error,
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    const previousProjects = projects;

    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1000));

      setProjects((prev) => prev.filter((p) => p.id !== id));
      return {
        success: true,
        message: messages.project.delete.success,
      };
    } catch (error) {
      console.log(error);
      setProjects(previousProjects);
      return {
        success: true,
        message: messages.project.delete.error,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    setProjects,
    Loading,
    addProject,
    updateProject,
    deleteProject,
  };
};
