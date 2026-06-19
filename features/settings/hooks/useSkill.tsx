import React, { useState } from "react";

interface Props {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function useSkill({ skills, setSkills }: Props) {
  const [value, setValue] = useState("");
  function addSkill(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      setSkills((prev) => [...prev, value.trim()]);
      setValue("");
    }
  }
  const deleteSkill = (skillId: string) =>
    setSkills((prev) => prev.filter((skill) => skill !== skillId));

  return { skills, addSkill, setValue, value, deleteSkill };
}
