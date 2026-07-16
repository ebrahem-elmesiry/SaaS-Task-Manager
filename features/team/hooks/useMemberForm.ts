import { useMemberContext } from "@/context/TeamContext";
import { useMemberActions } from "./useMemberActions";
import { useMemberFormFields } from "./useMemberFormFields";
import { Role } from "@/types/main";

export function useMemberForm() {
  const { formData, setFormData, isEdit, setIsEdit, isOpen, setIsOpen } =
    useMemberContext();

  const { sendInvite, updateMember, addUpdatePending } = useMemberActions();
  const { handleChange, setRole, validate } = useMemberFormFields(setFormData);

  const reset = () => {
    setFormData({ id: "", email: "", role: undefined });
    setIsEdit(false);
    setIsOpen(false);
  };

  const handleSubmit = async (email: string, role: Role, member_id: string) => {
    const valid = validate(formData);
    if (!valid) return;

    if (isEdit) {
      await updateMember({ role, member_id });
    } else {
      await sendInvite({ email, role });
    }
    reset();
  };

  return {
    formData,
    isOpen,
    setIsOpen,
    handleChange,
    setRole,
    handleSubmit,
    reset,
    addUpdatePending,
    isEdit,
  };
}
