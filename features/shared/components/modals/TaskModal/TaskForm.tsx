"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "../../controls/CustomSelect";
import DatePicker from "../../controls/DatePicker";
import { Priority } from "@/types/kanban";
import MultiSelectList from "../ProjectModal/MultiSelectListTeam";
import { ActionButtons } from "../../ActionButtons";
import { useTaskContext } from "@/context/TaskContext";
import { teamMembers } from "@/constant/arrays";
import { Activity, Flag, FolderOpen } from "lucide-react";
import { SubtaskManager } from "./SubtaskManager";
import { SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchProjects from "@/features/projects/services/fetchProjects";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

const statusOptions = [
  { label: "TODO", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export function TaskForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    toggleMember,
    closeModal,
    isEdit,
    loading,
  } = useTaskContext();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const submit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(workspaceId),
  });
  const projectSelectOptions =
    data?.map((p) => ({ label: p.name, value: p.id })) ?? [];

  return (
    <form onSubmit={submit} className="p-6 space-y-5 overflow-y-auto">
      {/* Title */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Task Title *</Label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Description</Label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-900 resize-none"
          rows={4}
          placeholder="Add description"
        />
      </div>

      {/* Priority + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium mb-2 block">
            <Flag className="w-4 h-4 inline mr-1" /> Priority
          </Label>
          <CustomSelect
            value={formData.priority}
            onChange={(value) => handleChange("priority", value as Priority)}
            options={priorityOptions}
          />
        </div>
        <DatePicker
          label="Due Date"
          value={formData.dueDate ? new Date(formData.dueDate) : undefined}
          onChange={(date) =>
            handleChange("dueDate", date ? formatDate(date) : "")
          }
        />
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium mb-2 block">
            <Activity className="w-4 h-4 inline mr-1" /> Status
          </Label>
          <CustomSelect
            isEdit={isEdit}
            value={formData.status}
            onChange={(value) => handleChange("status", value)}
            options={statusOptions}
          />
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">
            <FolderOpen className="w-4 h-4 inline mr-1" />
            Project
          </Label>
          <CustomSelect
            isEdit={isEdit}
            value={formData.project_id}
            onChange={(value) => handleChange("project_id", value)}
            options={projectSelectOptions}
          />
        </div>
      </div>

      {/* Subtasks */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Subtasks</Label>
        <SubtaskManager
          subtasks={formData.subtasks || []}
          onSubtasksChange={(newSubtasks) =>
            handleChange("subtasks", newSubtasks)
          }
        />
      </div>

      {/* Team Members */}
      <MultiSelectList
        label="Team Members"
        items={teamMembers}
        selected={formData.assignees}
        toggle={toggleMember}
      />

      {/* Buttons */}
      <ActionButtons
        onCancel={closeModal}
        Loading={loading}
        primaryText={isEdit ? "Update Task" : "Create Task"}
      />
    </form>
  );
}
