import { Role } from "@/types/main";
import { MemberForm } from "@/types/team";
import { memberFormSchema } from "@/validation/team.schema";
import { useState } from "react";

export const useMemberForm = (initialState: MemberForm) => {
  const [formData, setFormData] = useState<MemberForm>(initialState);

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
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }
    return {
      success: true,
    };
  };

  return {
    formData,
    setFormData,
    handleChange,
    setRole,
    validate,
  };
};
