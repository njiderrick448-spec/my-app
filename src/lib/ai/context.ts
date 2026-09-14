import { createClient } from "@/src/lib/supabase/client";

export async function getAssistantContext() {
  const supabase = createClient();

  const [{ data: profile }, { data: tasks }, { data: goals }, { data: focusSessions }, { data: calendarEvents }] =
    await Promise.all([
      supabase.from("profiles").select("id, full_name, email").limit(1).maybeSingle(),
      supabase.from("tasks").select("title, status, due_date, priority").order("created_at", { ascending: false }).limit(10),
      supabase.from("goals").select("title, progress, target").order("created_at", { ascending: false }).limit(10),
      supabase.from("focus_sessions").select("minutes, completed").order("created_at", { ascending: false }).limit(10),
      supabase.from("calendar_events").select("title, description, start_at, end_at, all_day").order("start_at", { ascending: true }).limit(10),
    ]);

  return {
    profile,
    tasks: tasks ?? [],
    goals: goals ?? [],
    focusSessions: focusSessions ?? [],
    calendarEvents: calendarEvents ?? [],
  };
}
