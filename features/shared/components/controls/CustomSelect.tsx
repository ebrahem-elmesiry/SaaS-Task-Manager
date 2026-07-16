"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  isEdit?: boolean;
};

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
  isEdit,
}: CustomSelectProps) {
  return (
    <Select value={value ?? ""} onValueChange={onChange} disabled={isEdit}>
      <SelectTrigger
        className={`w-full px-4 py-4.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
