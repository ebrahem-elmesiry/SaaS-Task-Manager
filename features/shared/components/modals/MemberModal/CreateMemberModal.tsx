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
import { useMemberContext } from "@/context/TeamContext";
import { Role } from "@/types/main";
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
    loading,
    isEdit,
  } = useMemberContext();

  const roleOptions = [
    { label: "Member", value: "member" },
    { label: "Manager", value: "manager" },
    { label: "Admin", value: "admin" },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSubmit(formData);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
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
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            type="text"
            placeholder="Enter full name"
          />

          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="name@company.com"
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
            Loading={loading}
            primaryText={isEdit ? "Update Member" : "Create Member"}
            onCancel={reset}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
