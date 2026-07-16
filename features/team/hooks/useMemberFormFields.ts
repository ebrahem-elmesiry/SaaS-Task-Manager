import { Role } from "@/types/main";
import { MemberForm } from "@/types/team";
import { memberFormSchema } from "@/validation/team.schema";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const useMemberFormFields = (
  setFormData: Dispatch<SetStateAction<MemberForm>>,
) => {
  const handleChange = (key: keyof MemberForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setRole = (value: Role) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const validate = (members: MemberForm) => {
    const result = memberFormSchema.safeParse(members);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
    }
    return true;
  };

  return {
    setFormData,
    handleChange,
    setRole,
    validate,
  };
};
