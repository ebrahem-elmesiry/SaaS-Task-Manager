"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "../../controls/CustomSelect";
import DatePicker from "../../controls/DatePicker";
import { Priority } from "@/types/kanban";
import MultiSelectList from "../ProjectModal/MultiSelectListTeam";
import { ActionButtons } from "../../ActionButtons";
import { useTaskContext } from "@/context/TaskContext";
import { Activity, Flag, FolderOpen, Loader2 } from "lucide-react";
import { SubtaskManager } from "./SubtaskManager";
import { SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import getProjectsAndMembers from "./hooks/getProjectsAndMembers";
import { Button } from "@/components/ui/button";

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
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects-and-members", workspaceId],
    queryFn: () => getProjectsAndMembers(workspaceId),
    enabled: !!workspaceId,
  });

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
          {isLoading ? (
            <div className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span className="text-sm text-slate-400">
                Loading projects...
              </span>
            </div>
          ) : error ? (
            <div className="w-full px-4 py-2 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-between">
              <span className="text-sm text-red-600 dark:text-red-400">
                Failed to load projects
              </span>
              <Button
                type="button"
                onClick={() => refetch()}
                variant={"link"}
                className="text-sm p-0"
              >
                Retry
              </Button>
            </div>
          ) : (
            <CustomSelect
              isEdit={isEdit}
              value={formData.project_id}
              onChange={(value) => handleChange("project_id", value)}
              options={data?.projects ?? []}
            />
          )}
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
      {isLoading ? (
        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            <span className="text-sm font-medium text-slate-400">
              Loading team members...
            </span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="border border-rd-200 dark:border-red-700 rounded-lg px-3 py-1 flex items-center justify-between">
          <span className="text-sm text-red-600 dark:text-red-400">
            Failed to load team members
          </span>
          <Button
            type="button"
            onClick={() => refetch()}
            variant={"link"}
            className="text-sm p-0"
          >
            Retry
          </Button>
        </div>
      ) : (
        <MultiSelectList
          label="Team Members"
          items={data?.workspace_members ?? []}
          selected={formData.assignees}
          toggle={toggleMember}
        />
      )}

      {/* Buttons */}
      <ActionButtons
        onCancel={closeModal}
        Loading={loading}
        primaryText={isEdit ? "Update Task" : "Create Task"}
      />
    </form>
  );
}
