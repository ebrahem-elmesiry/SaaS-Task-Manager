"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Project } from "@/types/profile";
import useActiveProjects from "../hooks/useActiveProjects";
import ActiveProjectList from "./ActiveProjectList/ActiveProjectList";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type Props = {
  projects: Project[];
  userId: string | undefined;
};

export default function ActiveProjects({ projects, userId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: allProjects,
    isLoading,
    error,
    refetch,
  } = useActiveProjects(userId, isOpen);
  const displayProjects = allProjects ?? projects;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Active Projects
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-500">
              View all
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg! dark:bg-slate-800 max-h-105 overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>Active Projects</DialogTitle>
            </DialogHeader>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col text-center py-4 space-y-3">
                <span className="text-sm text-red-600 dark:text-red-400">
                  Failed to load projects
                </span>
                <Button
                  variant={"link"}
                  size="xl"
                  onClick={() => refetch()}
                  className="no-underline! cursor-pointer"
                >
                  <RefreshCw />
                  Retry
                </Button>
              </div>
            ) : (
              <ActiveProjectList projects={displayProjects ?? []} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <ActiveProjectList projects={projects} />
    </div>
  );
}
