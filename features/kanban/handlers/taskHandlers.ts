import { createClient } from "@/lib/supabase/client";
import { TaskForm } from "@/validation/task.schema";
import { Assignee, Status, Subtask } from "@/types/kanban";

type SupabaseClient = ReturnType<typeof createClient>;

export async function insertTask(
  supabase: SupabaseClient,
  data: TaskForm,
  taskId: string,
) {
  const { data: taskData, error } = await supabase
    .from("tasks")
    .insert({
      id: taskId,
      title: data.title,
      description: data.description,
      priority: data.priority,
      due_date: data.dueDate,
      status: data.status,
      project_id: data.project_id,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return taskData;
}

export async function insertSubtasks(
  supabase: SupabaseClient,
  taskId: string,
  subtasks: { title: string }[],
) {
  if (subtasks.length === 0) return;
  const { error } = await supabase.from("subtasks").insert(
    subtasks.map((s) => ({
      task_id: taskId,
      title: s.title,
      completed: false,
    })),
  );
  if (error) throw new Error(error.message);
}

export async function insertAssignees(
  supabase: SupabaseClient,
  taskId: string,
  assignees: { id: string }[],
) {
  if (assignees.length === 0) return;
  const { error } = await supabase.from("task_assignments").insert(
    assignees.map((a) => ({
      task_id: taskId,
      user_id: a.id,
    })),
  );
  if (error) throw new Error(error.message);
}

export async function updateTaskBase(supabase: SupabaseClient, data: TaskForm) {
  const { error } = await supabase
    .from("tasks")
    .update({
      title: data.title,
      description: data.description,
      priority: data.priority,
      project_id: data.project_id,
      due_date: data.dueDate,
      status: data.status,
    })
    .eq("id", data.id);
  if (error) throw new Error(error.message);
}

export async function getCurrentAssignees(
  supabase: SupabaseClient,
  taskId: string,
): Promise<Assignee[]> {
  const { data, error } = await supabase
    .from("task_assignments")
    .select(`profiles(id,full_name,avatar_url)`)
    .eq("task_id", taskId);
  if (error) throw new Error(error.message);
  return data?.map((t) =>
    Array.isArray(t.profiles) ? t.profiles[0] : t.profiles,
  ) as Assignee[];
}

export async function syncAssignees(
  supabase: SupabaseClient,
  taskId: string,
  currentAssignees: Assignee[],
  newAssignees: Assignee[],
) {
  const toInsert = newAssignees.filter(
    (n) => !currentAssignees.some((c) => c.id === n.id),
  );
  const toDelete = currentAssignees
    .filter((c) => !newAssignees.some((n) => n.id === c.id))
    .map((t) => t.id);

  if (toInsert.length > 0) {
    const { error } = await supabase
      .from("task_assignments")
      .insert(toInsert.map((t) => ({ task_id: taskId, user_id: t.id })));
    if (error) throw new Error(error.message);
  }
  if (toDelete.length > 0) {
    const { error } = await supabase
      .from("task_assignments")
      .delete()
      .eq("task_id", taskId)
      .in("user_id", toDelete);
    if (error) throw new Error(error.message);
  }
}

export async function getCurrentSubtasks(
  supabase: SupabaseClient,
  taskId: string,
): Promise<Subtask[]> {
  const { data, error } = await supabase
    .from("subtasks")
    .select("id, title, completed")
    .eq("task_id", taskId);
  if (error) throw new Error(error.message);
  return data as Subtask[];
}

export async function syncSubtasks(
  supabase: SupabaseClient,
  taskId: string,
  currentSubtasks: Subtask[],
  formSubtasks: Subtask[],
) {
  const toInsert = formSubtasks.filter(
    (f) => !currentSubtasks.some((c) => c.id === f.id),
  );
  const toDelete = currentSubtasks
    .filter((c) => !formSubtasks.some((f) => f.id === c.id))
    .map((s) => s.id);

  if (toInsert.length > 0) {
    const { error } = await supabase.from("subtasks").insert(
      toInsert.map((s) => ({
        id: s.id,
        task_id: taskId,
        title: s.title,
        completed: s.completed,
      })),
    );
    if (error) throw new Error(error.message);
  }
  if (toDelete.length > 0) {
    const { error } = await supabase
      .from("subtasks")
      .delete()
      .in("id", toDelete);
    if (error) throw new Error(error.message);
  }
}

// update TaskStatus
interface updateTaskStatusProps {
  newStatus: Status;
  taskId: string;
}
export async function updateTaskStatusDB({
  newStatus,
  taskId,
}: updateTaskStatusProps) {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ status: newStatus })
    .eq("id", taskId);

  if (error) throw new Error(error.message);
}
