"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputField from "../../controls/InputField";
import { CustomSelect } from "../../controls/CustomSelect";
import { Label } from "@/components/ui/label";
import { ActionButtons } from "../../ActionButtons";
import { useMemberForm } from "@/features/team/hooks/useMemberForm";
import { Role } from "@/types/main";

import { SubmitEvent } from "react";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { toast } from "sonner";

export function CreateMemberModal() {
  const {
    formData,
    isOpen,
    setIsOpen,
    handleChange,
    setRole,
    handleSubmit,
    reset,
    addUpdatePending,
    isEdit,
  } = useMemberForm();

  const currentUser = useCurrentUser();

  const roleOptions = [
    { label: "Member", value: "member" },
    { label: "Manager", value: "manager" },
    { label: "Admin", value: "admin" },
  ];

  if (!currentUser) return null;

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!formData.role) {
      toast.info("role is required");
      return;
    }
    handleSubmit(formData.email, formData.role, formData.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="xl" variant="purple">
          <Plus />
          Add Member
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={reset}
        className="sm:max-w-md bg-white dark:bg-slate-800 [&>button]:hidden"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Add Team Member</DialogTitle>

          <button
            onClick={reset}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-5 mt-4">
          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="name@company.com"
            disabled={isEdit}
          />

          <div>
            <Label className="text-sm font-medium mb-2 block">Role</Label>

            <CustomSelect
              value={formData.role}
              onChange={(val) => setRole(val as Role)}
              options={roleOptions}
            />
          </div>

          <ActionButtons
            Loading={addUpdatePending}
            primaryText={isEdit ? "Update Member" : "Create Member"}
            onCancel={reset}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
