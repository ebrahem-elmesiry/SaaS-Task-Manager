"use client";

import { X } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "../../controls/InputField";
import { ActionButtons } from "../../ActionButtons";
import { Button } from "@/components/ui/button";
import { useAddWorkspace } from "@/features/workspaces/hooks/useAddWorkspace";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function CreateWorkspaceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const { addWorkspacePending, addWorkspace } = useAddWorkspace();
  const slug = useMemo(() => toSlug(name), [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addWorkspace({ name: name.trim(), slug });
    setName("");
    setIsOpen(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setName("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="purple" size="xl">
          New Workspace
        </Button>
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          setName("");
          setIsOpen(false);
        }}
        className="sm:max-w-lg p-0 bg-white dark:bg-slate-800 overflow-hidden [&>button]:hidden"
      >
        <DialogHeader className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Create New Workspace
            </DialogTitle>

            <button
              onClick={(e) => {
                setIsOpen(false);
                setName("");
                e.stopPropagation();
              }}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <InputField
            type="text"
            label="Workspace Name *"
            name="workspaceName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            labelClass="text-black dark:text-white!"
            placeholder="Enter workspace name"
          />

          <ActionButtons
            onCancel={handleCancel}
            Loading={addWorkspacePending}
            primaryText="Create Workspace"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
