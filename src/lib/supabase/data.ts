import { createClient } from "@/src/lib/supabase/client";

export type UserProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
};

export type UserTask = {
  id?: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
  priority?: string | null;
  status?: string | null;
  done?: boolean;
  created_at?: string;
};

export async function getCurrentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function getProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (error) return null;
  return data;
}

export async function saveProfile(fullName: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        full_name: fullName,
        email: user.email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )
    .select()
    .single();

  return { data, error };
}

export async function getTasks() {
  const user = await getCurrentUser();
  if (!user) return [] as UserTask[];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, description, due_date, priority, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [] as UserTask[];

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    priority: task.priority,
    status: task.status,
    done: task.status === "done",
    created_at: task.created_at,
  }));
}

export async function createTask(task: {
  title: string;
  description?: string | null;
  due_date?: string | null;
  priority?: string;
}) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: user.id,
      title: task.title,
      description: task.description ?? "",
      due_date: task.due_date ?? null,
      priority: task.priority ?? "medium",
      status: "pending",
    })
    .select()
    .single();

  return { data, error };
}

export async function toggleTask(taskId: string, currentDone: boolean) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: currentDone ? "pending" : "done" })
    .eq("id", taskId)
    .eq("user_id", user.id)
    .select()
    .single();

  return { data, error };
}
