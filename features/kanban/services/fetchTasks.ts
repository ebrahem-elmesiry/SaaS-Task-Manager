"use server";

import { createClient } from "@/lib/supabase/server";
import { Assignee, ColumnsType, Status } from "@/types/kanban";

export default async function fetchTasks(projectId?: string) {
  const supabase = await createClient();

  let query = supabase.from("tasks").select(`
      *,
      subtasks(*),
      task_assignments(
        profiles(
          id,full_name,avatar_url
        )
      )
      ,
      comments(
        *,
        mentions(count)
      )
    `);

  if (projectId) query = query.eq("project_id", projectId);

  const { data, error } = await query;

  if (error) {
    console.log("project fetch error => ", error);
    return;
  }

  const grouped: ColumnsType = {
    todo: [],
    "in-progress": [],
    review: [],
    done: [],
  };
  if (data) {
    for (const item of data) {
      const status = item.status as Status;
      if (!grouped[status]) continue;
      grouped[status].push({
        id: item.id,
        title: item.title,
        description: item.description,
        priority: item.priority,
        project_id: item.project_id,
        dueDate: item.due_date,
        status: item.status,
        assignees:
          item.task_assignments.map(
            (t: { profiles: Assignee }) => t.profiles,
          ) ?? [],
        subtasks: item.subtasks || [],
        commentsCount: item.comments?.length || 0,
        attachments: 0,
      });
    }
  }

  return grouped;
}
