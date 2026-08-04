"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getTeamData from "../services/getTeamData";

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
    queryFn: () => getTeamData(workspaceId),
  });

  // const onlineMembers = data?.filter((m) => m.status === "online").length;
  // const offlineMembers = data?.filter((m) => m.status === "offline").length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addFilterFn()}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            !getFilter
              ? "bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          All Members ({data?.length})
        </button>
        {/* <button
          onClick={() => addFilterFn("online")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            getFilter === "online"
              ? "bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          Online ({onlineMembers})
        </button>
        <button
          onClick={() => addFilterFn("offline")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            getFilter === "offline"
              ? "bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          Offline ({offlineMembers})
        </button> */}
      </div>
    </div>
  );
}
