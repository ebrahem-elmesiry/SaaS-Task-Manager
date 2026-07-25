import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { CheckSquare, File, Users } from "lucide-react";
import { SearchType } from "@/types/search";

function getSearchHref(item: SearchType): string {
  switch (item.type) {
    case "user":
      return `/profile/${item.id}`;
    case "project":
      return `/dashboard/${item.workspace_id}/projects/${item.id}/kanban`;
    case "task":
      return `/dashboard/${item.workspace_id}/projects/${item.project.id}/kanban`;
  }
}

export function useSearch(setOpen: (open: boolean) => void) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const router = useRouter();
  const supabase = createClient();

  const { data: results = [], isPending } = useQuery({
    queryKey: ["search", search, workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("global_search", {
        search_text: search,
        target_workspace_id: workspaceId ?? null,
      });
      if (error) throw error;
      return data.map((s: SearchType) => ({
        ...s,
        icon:
          s.type === "project" ? File : s.type === "task" ? CheckSquare : Users,
      }));
    },
    enabled: !!search && !!open,
    staleTime: 60 * 1000,
  });

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i === results.length - 1 ? 0 : i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      router.push(getSearchHref(results[selectedIndex]));
      setOpen(false);
      setSelectedIndex(-1);
    }
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setSelectedIndex(-1);
  }

  console.log("results", results);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  return {
    search,
    setSearch: handleSearchChange,
    results,
    isPending,
    selectedIndex,
    handleKeyDown,
  };
}
