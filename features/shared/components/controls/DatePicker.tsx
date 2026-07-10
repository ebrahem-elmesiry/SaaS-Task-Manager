"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

type DatePickerProps = {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
};

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  return (
    <div>
      <Label className="text-sm font-medium mb-2 block">
        <CalendarIcon className="w-4 h-4 inline mr-1" />
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="dark" size={"lg"} className="w-full justify-start ">
            {value ? (
              format(value, "PPP")
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            className="bg-white dark:bg-slate-900 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
            mode="single"
            selected={value}
            onSelect={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
