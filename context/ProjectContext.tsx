"use client";
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { useProjectForm } from "@/features/projects/hooks/useProjectForm";
import { Assignee } from "@/types/kanban";
import { returnFn } from "@/types/main";
import { FormState, projectCard } from "@/types/project";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ProjectContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  isEdit: boolean;
  setIsEdit: (edit: boolean) => void;

  openEditModal: () => void;
  closeModal: () => void;

  projects: projectCard[];
  setProjects: Dispatch<SetStateAction<projectCard[]>>;

  handleSubmit: (formData: FormState) => returnFn;
  handleChange: (
    key: keyof FormState,
    value: string | (Date | undefined),
  ) => void;
  deleteProject: (id: string) => returnFn;

  toggleMember: (member: Assignee) => void;
  handleEditInit: (project: projectCard) => void;

  formData: FormState;

  Loading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({
  children,
  initialProjects,
}: {
  children: ReactNode;
  initialProjects: projectCard[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const openEditModal = () => {
    setIsEdit(true);
    setIsOpen(true);
  };

  const {
    addProject,
    updateProject,
    Loading,
    deleteProject,
    setProjects,
    projects,
  } = useProjectActions(initialProjects);

  const emptyProject: FormState = {
    id: "",
    name: "",
    description: "",
    team: [],
    startDate: undefined,
    endDate: undefined,
  };

  const { formData, setFormData, handleChange, toggleMember, validate } =
    useProjectForm(emptyProject);

  const closeModal = () => {
    setIsOpen(false);
    setFormData(emptyProject);
    setIsEdit(false);
  };

  const mapProjectToForm = (p: projectCard): FormState => ({
    ...p,
    startDate: p.startDate ? new Date(p.startDate) : undefined,
    endDate: p.endDate ? new Date(p.endDate) : undefined,
  });

  const handleSubmit = async (formData: FormState) => {
    const valid = validate(formData);
    if (!valid.success) {
      return {
        success: false,
        message: valid.message,
      };
    }

    const result = isEdit
      ? await updateProject(formData)
      : await addProject(formData);

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

  const handleEditInit = (project: projectCard) => {
    setFormData(mapProjectToForm(project));
    openEditModal();
  };

  return (
    <ProjectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isEdit,
        setIsEdit,
        openEditModal,
        closeModal,
        projects,
        setProjects,
        handleSubmit,
        handleChange,
        toggleMember,
        handleEditInit,
        deleteProject,
        formData,
        Loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectContext must be used within ProjectProvider");
  return context;
};
