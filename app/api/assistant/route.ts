import { openai } from "@ai-sdk/openai";
import { stepCountIs, streamText } from "ai";

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

Be concise and helpful.
`,
    messages,
    stopWhen: stepCountIs(5),
  });

  return result.toTextStreamResponse();
}