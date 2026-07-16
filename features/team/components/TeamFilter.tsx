"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchTeamWorkspaceData from "../services/fetchTeamWorkspaceData";

interface Props {
  workspaceId: string;
}

export default function TeamFilter({ workspaceId }: Props) {
  const pathName = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const getFilter = searchParams.get("filter") ?? undefined;

  const addFilterFn = (val?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!val) {
      params.delete("filter");
    } else {
      params.set("filter", val);
    }
    push(`${pathName}?${params.toString()}`);
  };
  const { data } = useQuery({
    queryKey: ["team", workspaceId],
    queryFn: () => fetchTeamWorkspaceData(workspaceId),
  });

  const onlineMembers = data?.filter((m) => m.status === "online").length;
  const offlineMembers = data?.filter((m) => m.status === "offline").length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addFilterFn()}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            !getFilter
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          All Members ({data?.length})
        </button>
        <button
          onClick={() => addFilterFn("online")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            getFilter === "online"
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          Online ({onlineMembers})
        </button>
        <button
          onClick={() => addFilterFn("offline")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            getFilter === "offline"
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          Offline ({offlineMembers})
        </button>
      </div>
    </div>
  );
}
