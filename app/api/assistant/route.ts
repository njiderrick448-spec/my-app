import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText, tool } from "ai";
import { z } from "zod";
import { createClient } from "@/src/lib/supabase/server";

const taskInput = z.object({
  title: z.string().min(1).max(160),
  description: z.string().max(2000).optional(),
  dueDate: z.string().nullable().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "OPENAI_API_KEY is not configured. Add it to your local .env.local to enable the real AI assistant.",
      },
      { status: 500 },
    );
  }

  const payload = await req.json();
  const {
    messages,
    profile,
    tasks = [],
    goals = [],
    focusSessions = [],
    calendarEvents = [],
  } = payload;

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData.user?.id;

  const tools = {
    listTasks: tool({
      description: "List the signed-in user's current tasks, newest first.",
      inputSchema: z.object({
        status: z.enum(["all", "pending", "done"]).default("all"),
      }),
      execute: async ({ status }) => {
        if (!userId) return { error: "The user is not signed in." };

        let query = supabase
          .from("tasks")
          .select("id, title, description, due_date, priority, status")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(20);

        if (status !== "all") query = query.eq("status", status);

        const { data, error } = await query;
        if (error) return { error: "Unable to read tasks right now." };
        return { tasks: data ?? [] };
      },
    }),
    createTask: tool({
      description: "Create a task for the signed-in user after they ask for one.",
      inputSchema: taskInput,
      execute: async ({ title, description, dueDate, priority }) => {
        if (!userId) return { error: "The user is not signed in." };

        const { data, error } = await supabase
          .from("tasks")
          .insert({
            user_id: userId,
            title,
            description: description ?? "",
            due_date: dueDate ?? null,
            priority,
            status: "pending",
          })
          .select("id, title, description, due_date, priority, status")
          .single();

        if (error) return { error: "Unable to create that task right now." };
        return { task: data };
      },
    }),
  };

  const taskSummary = tasks.length
    ? tasks
        .slice(0, 5)
        .map(
          (task: { title?: string; status?: string; due_date?: string | null; priority?: string | null }) =>
            `- ${task.title ?? "Task"} | status: ${task.status ?? "pending"} | priority: ${task.priority ?? "medium"} | due: ${task.due_date ?? "undated"}`,
        )
        .join("\n")
    : "- No tasks yet";

  const goalSummary = goals.length
    ? goals
        .slice(0, 5)
        .map(
          (goal: { title?: string; progress?: number; target?: string | null }) =>
            `- ${goal.title ?? "Goal"} | progress: ${goal.progress ?? 0}% | target: ${goal.target ?? "not set"}`,
        )
        .join("\n")
    : "- No goals yet";

  const focusSummary = focusSessions.length
    ? focusSessions
        .slice(0, 5)
        .map(
          (session: { minutes?: number; completed?: boolean }) =>
            `- ${session.minutes ?? 25} min focus session | completed: ${session.completed ? "yes" : "no"}`,
        )
        .join("\n")
    : "- No focus sessions yet";

  const calendarSummary = calendarEvents.length
    ? calendarEvents
        .slice(0, 5)
        .map(
          (event: { title?: string; start?: string | null; end?: string | null }) =>
            `- ${event.title ?? "Event"} | ${event.start ?? "unknown time"}${event.end ? ` to ${event.end}` : ""}`,
        )
        .join("\n")
    : "- No calendar events yet";

  const modelMessages = await convertToModelMessages(messages ?? [], { tools });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `
You are ZENVYX, an AI personal productivity assistant.

User context:
- Name: ${profile?.full_name ?? "Unknown user"}
- Email: ${profile?.email ?? "Not provided"}

Current tasks:
${taskSummary}

Current goals:
${goalSummary}

Focus sessions:
${focusSummary}

Calendar items:
${calendarSummary}

Your goals:
- Help the user stay organized, focused, and productive.
- Proactively suggest next actions when helpful.
- Keep responses concise and practical.
- When there is a clear task or calendar need, propose a concrete next step.
- Prefer action-oriented guidance with dates, priorities, and time blocks.
- Use listTasks when the user asks about their current tasks or workload.
- Use createTask when the user explicitly asks you to add a task. Never invent a task creation request.
- After using a tool, clearly tell the user what you found or changed.

Be concise and helpful.
`,
    messages: modelMessages,
    tools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}