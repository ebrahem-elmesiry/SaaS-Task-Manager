"use client";

import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

export default function ActivityError({ message }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-red-500">
      <AlertCircle className="h-6 w-6" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
