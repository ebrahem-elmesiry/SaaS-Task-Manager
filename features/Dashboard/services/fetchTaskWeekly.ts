import { createClient } from "@/lib/supabase/server";
import { weekTask } from "@/types/dashbaord";

export default async function fetchTaskWeekly(
  week1: { start: string; end: string },
  week2: { start: string; end: string },
  week3: { start: string; end: string },
  week4: { start: string; end: string },
  projectIds: string[],
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("id, created_at")
    .eq("status", "done")
    .in("project_id", projectIds)
    .gte("created_at", week1.start)
    .lte("created_at", week4.end);

  const progressData: [string, weekTask][] = [
    ["Week 1", { name: "Week 1", completed: 0 }],
    ["Week 2", { name: "Week 2", completed: 0 }],
    ["Week 3", { name: "Week 3", completed: 0 }],
    ["Week 4", { name: "Week 4", completed: 0 }],
  ];

  if (error) {
    console.error("filed to fetch taskWeekly", error);
    return null;
  }

  const newMap = new Map(progressData);
  function increase(week: string) {
    const getWeek = newMap.get(week);
    newMap.set(week, {
      name: week,
      completed: (getWeek?.completed || 0) + 1,
    });
  }

  for (const t of data) {
    const date = t.created_at;
    if (week1.start < date && date <= week1.end) {
      increase("Week 1");
    } else if (week2.start < date && date <= week2.end) {
      increase("Week 2");
    } else if (week3.start < date && date <= week3.end) {
      increase("Week 3");
    } else if (week4.start < date && date <= week4.end) {
      increase("Week 4");
    }
  }
  const formatDate = [...newMap.values()];
  return formatDate || [];
}
