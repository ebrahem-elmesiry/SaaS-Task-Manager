"use client";

import { Role } from "@/types/main";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  role: Role;
};

export function useCreateMember() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    role: "member",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setRole = (value: string) => {
    setForm((prev) => ({
      ...prev,
      role: value as Role,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    // onClose();
  };

  const reset = () => {
    setForm({
      name: "",
      email: "",
      role: "member",
    });
  };

  return {
    form,
    handleChange,
    setRole,
    handleSubmit,
    reset,
  };
}
