"use client";

import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import InputField from "../../controls/InputField";

import { ActionButtons } from "../../ActionButtons";
import DatePicker from "../../controls/DatePicker";
import MultiSelectList from "./MultiSelectListTeam";
import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/context/ProjectContext";
import { FormState } from "@/types/project";

export function CreateProjectModal() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isEdit,
    toggleMember,
    Loading,
    closeModal,
    isOpen,
    setIsOpen,
  } = useProjectContext();

  const teamMembers = [
    {
      id: "60187dee-182d-454e-a5b9-d02f6562b436",
      full_name: "mohamed ahmed",
      avatar_url: "MA",
    },
    {
      id: "bc02c0f6-4224-4ac2-98f7-d211cfac6cdd",
      full_name: "ahmed mohamed",
      avatar_url: "AM",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button variant={"purple"} size={"xl"}>
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          closeModal();
        }}
        className="sm:max-w-lg p-0 h-[90%] bg-white dark:bg-slate-800 overflow-hidden [&>button]:hidden"
      >
        {/* Header */}
        <DialogHeader className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Create New Project
            </DialogTitle>

            <button
              onClick={(e) => {
                setIsOpen(false);
                e.stopPropagation();
              }}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
          className="p-6 space-y-5 overflow-y-auto"
        >
          {/* Project Name */}
          <InputField
            type="text"
            label="Project Name *"
            name="name"
            value={formData?.name}
            onChange={(e) =>
              handleChange(e.target.name as keyof FormState, e.target.value)
            }
            labelClass="text-black dark:text-white!"
            placeholder="Enter project name"
          />

          {/* Description */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Description
            </Label>

            <textarea
              value={formData?.description}
              onChange={(e) =>
                handleChange(e.target.name as keyof FormState, e.target.value)
              }
              rows={4}
              name="description"
              className="w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-900 resize-none"
              placeholder="Describe project"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <DatePicker
              label="Start Date"
              value={formData?.startDate ? formData?.startDate : undefined}
              onChange={(date) => handleChange("startDate", date)}
            />
            {/* End Date */}
            <DatePicker
              label="End Date"
              value={
                formData?.endDate ? new Date(formData?.endDate) : undefined
              }
              onChange={(date) => handleChange("endDate", date)}
            />
          </div>

          {/* Team */}
          <MultiSelectList
            label="Team Members"
            items={teamMembers}
            selected={formData?.team || []}
            toggle={toggleMember}
          />

          {/* Buttons */}
          <ActionButtons
            onCancel={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            Loading={Loading}
            primaryText={isEdit ? "Update Project" : "Create Project"}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
