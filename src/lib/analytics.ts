import { createClient } from "@/src/lib/supabase/client";

export type DashboardSummary = {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  focusMinutes: number;
  upcomingEvents: Array<{
    title: string;
    start: string | null;
    end: string | null;
  }>;
  recentTasks: Array<{
    title: string;
    due_date: string | null;
    status: string | null;
    priority: string | null;
  }>;
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const supabase = createClient();

  const [tasksRes, focusRes, eventsRes] = await Promise.all([
    supabase
      .from("tasks")
      .select("title, due_date, status, priority")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("focus_sessions")
      .select("minutes")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("calendar_events")
      .select("title, start_at, end_at")
      .order("start_at", { ascending: true })
      .limit(5),
  ]);

  const tasks = tasksRes.data ?? [];
  const focusSessions = focusRes.data ?? [];
  const events = eventsRes.data ?? [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const focusMinutes = focusSessions.reduce((sum, session) => sum + Number(session.minutes ?? 0), 0);

  return {
    totalTasks,
    completedTasks,
    completionRate,
    focusMinutes,
    upcomingEvents: events.map((event) => ({
      title: event.title ?? "Untitled event",
      start: event.start_at,
      end: event.end_at,
    })),
    recentTasks: tasks.map((task) => ({
      title: task.title ?? "Untitled task",
      due_date: task.due_date ?? null,
      status: task.status ?? null,
      priority: task.priority ?? "medium",
    })),
  };
}
