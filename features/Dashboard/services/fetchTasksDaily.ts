import { createClient } from "@/lib/supabase/server";
import { statsData } from "@/types/dashbaord";

export default async function fetchTasksDaily(
  startOfWeek: string,
  endOfWeek: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "done")
    .gte("created_at", startOfWeek)
    .lte("created_at", endOfWeek);

  if (error) {
    console.log("error", error);
    return {
      success: false,
      data: [],
    };
  }

  const statsData: [string, statsData][] = [
    ["Mon", { name: "Mon", tasks: 0 }],
    ["Tue", { name: "Tue", tasks: 0 }],
    ["Wed", { name: "Wed", tasks: 0 }],
    ["Thu", { name: "Thu", tasks: 0 }],
    ["Fri", { name: "Fri", tasks: 0 }],
    ["Sat", { name: "Sat", tasks: 0 }],
    ["Sun", { name: "Sun", tasks: 0 }],
  ];
  const statsMap = new Map(statsData);
  for (const s of data) {
    const date = new Date(s.created_at);
    const dayName = date
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .slice(0, 3);
    const has = statsMap.has(dayName);
    if (has) {
      const get = statsMap.get(dayName);
      statsMap.set(dayName, { name: dayName, tasks: (get?.tasks || 0) + 1 });
    }
  }

  const lastData = [...statsMap.values()];
  return {
    success: true,
    data: lastData,
  };
}
