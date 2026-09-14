"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AppShell } from "@/src/components/app-shell";
import { getAssistantContext } from "@/src/lib/ai/context";

const welcomeMessage = "Hi Alex. I’m here to help you organize the day. Tell me what you’re working through, or ask me to turn an idea into a clear next step.";

export default function AiChatPage() {
  const [draft, setDraft] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/assistant" }),
  });
  const isSending = status === "submitted" || status === "streaming";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSending) return;

    const context = await getAssistantContext();
    setDraft("");
    await sendMessage(
      { text: content },
      {
        body: {
          profile: context.profile,
          tasks: context.tasks,
          goals: context.goals,
          focusSessions: context.focusSessions,
          calendarEvents: context.calendarEvents,
        },
      },
    );
  }

  return <AppShell active="ai"><div className="flex min-h-[calc(100vh-9rem)] flex-col"><header className="flex flex-col gap-3 border-b border-[#dbe4ef] pb-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-3"><Link href="/" className="text-sm text-[#7b8da5] hover:text-[#1664d8]">Overview</Link><span className="text-[#b4c3d4]">/</span><span className="text-sm font-medium text-[#243b5a]">AI workspace</span></div><h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#10233f]">Your AI workspace</h1><p className="mt-1 text-sm text-[#7b8da5]">A private place to think, plan, and turn conversations into action.</p></div><span className="flex w-fit items-center gap-2 rounded-full border border-[#cce0fa] bg-[#f1f7ff] px-3 py-1.5 text-xs font-medium text-[#1664d8]"><span className="h-2 w-2 rounded-full bg-[#2ea66f]" />Connected</span></header><div className="mt-6 grid min-h-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_260px]"><section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#dbe4ef] bg-white shadow-sm" aria-label="Chat with Zenvyx AI"><div className="flex items-center gap-3 border-b border-[#edf1f6] px-5 py-4"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f0ff] font-semibold text-[#1664d8]">Z</span><div><p className="text-sm font-semibold text-[#10233f]">Zenvyx AI</p><p className="text-xs text-[#7b8da5]">Your productivity partner</p></div></div><div className="flex-1 space-y-5 overflow-y-auto px-5 py-6" aria-live="polite">{messages.length === 0 && <div className="flex justify-start gap-3"><div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#f1f5fa] px-4 py-3 text-sm leading-6 text-[#243b5a]">{welcomeMessage}</div></div>}{messages.map((message) => <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-sm bg-[#155fcf] text-white" : "rounded-bl-sm bg-[#f1f5fa] text-[#243b5a]"}`}>{message.parts.map((part, index) => { if (part.type === "text") return <span key={`${message.id}-text-${index}`}>{part.text}</span>; if (part.type.startsWith("tool-")) return <div key={`${message.id}-tool-${index}`} className="mt-2 border-t border-current/10 pt-2 text-xs opacity-70">Agent tool: {part.type.replace("tool-", "")}{"state" in part && part.state === "output-available" ? " completed" : " working"}</div>; return null; })}</div></div>)}{isSending && <div className="flex gap-3"><div className="rounded-2xl rounded-bl-sm bg-[#f1f5fa] px-4 py-3 text-sm text-[#7b8da5]">Thinking through it...</div></div>}{error && <p className="text-sm text-[#b42318]">The assistant could not complete that request. Please try again.</p>}</div><form onSubmit={handleSubmit} className="flex gap-3 border-t border-[#edf1f6] p-4"><input value={draft} onChange={(event) => setDraft(event.target.value)} disabled={isSending} className="min-w-0 flex-1 rounded-xl border border-[#dbe4ef] px-4 py-3 text-sm text-[#243b5a] outline-none placeholder:text-[#9aabc0] focus:border-[#1664d8]" placeholder="Ask your agent something..." aria-label="Message Zenvyx AI" /><button type="submit" disabled={isSending || !draft.trim()} className="rounded-xl bg-[#155fcf] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#104fae] disabled:cursor-not-allowed disabled:opacity-50">{isSending ? "Sending" : "Send"}</button></form></section><aside className="rounded-2xl border border-[#dbe4ef] bg-[#f8fbff] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8da5]">Agent abilities</p><div className="mt-4 space-y-3 text-sm text-[#46617e]"><p>Read your current task list and priorities.</p><p>Create a task when you explicitly ask.</p><p>Use your goals, focus sessions, and calendar context.</p></div></aside></div></div></AppShell>;
}
