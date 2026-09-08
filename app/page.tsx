"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  action?: string;
};

const quickActions = [
  { label: "Notes", prompt: "Create a note about ", mark: "N" },
  { label: "Task", prompt: "Create a task to ", mark: "T" },
  { label: "Focus", prompt: "Focus for 45 minutes", mark: "F" },
  { label: "Voice", prompt: "Start a voice note", mark: "V" },
];

const recentActivity = [
  { title: "Computer Engineering Project", detail: "Note created", time: "9:42 AM", mark: "N" },
  { title: "Assignment Reminder", detail: "Task added", time: "Yesterday", mark: "T" },
  { title: "Morning Focus Session", detail: "25 minutes completed", time: "Yesterday", mark: "F" },
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  function submitPrompt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isProcessing) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: "user", content: trimmedPrompt },
    ]);
    setPrompt("");
    setIsProcessing(true);

    window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "I am ready to help with that. Tell me whether you want this saved as a note, task, or focus session.",
          action: "Agent response",
        },
      ]);
      setIsProcessing(false);
    }, 650);
  }

  function chooseQuickAction(action: (typeof quickActions)[number]) {
    setPrompt(action.prompt);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_transparent_32%),_#f8fafc] px-4 py-6 text-gray-900 sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0061E0]">Tuesday, September 8</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Good morning, Alex</h1>
            <p className="mt-2 text-sm text-gray-600">Your day, organized around what matters.</p>
          </div>
          <Link href="/Login" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50" aria-label="Open profile">A</Link>
        </header>

        <section className="relative overflow-hidden rounded-[2rem] border border-blue-200 bg-white/70 p-5 shadow-xl shadow-blue-900/5 backdrop-blur-[12px] sm:p-8" aria-labelledby="assistant-heading">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0061E0] text-lg font-semibold text-white shadow-lg shadow-blue-700/20">N</div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0061E0]">Zenvyx AI</p><p className="text-sm text-gray-500">Personal productivity agent</p></div>
              <span className="ml-auto flex items-center gap-2 text-xs font-medium text-gray-500"><span className="h-2 w-2 rounded-full bg-emerald-500" />Ready</span>
            </div>
            <div className="max-w-2xl">
              <h2 id="assistant-heading" className="text-3xl font-semibold tracking-tight sm:text-5xl">How can I help today?</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">Ask me to capture an idea, plan your work, or make space for focused progress.</p>
            </div>
            <form onSubmit={submitPrompt} className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm sm:flex-row sm:items-center">
              <label htmlFor="assistant-prompt" className="sr-only">Ask Zenvyx AI</label>
              <input id="assistant-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Type anything..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400" />
              <button type="submit" disabled={isProcessing} className="rounded-xl bg-[#0061E0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004FBA] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:cursor-wait disabled:opacity-70">{isProcessing ? "Working..." : "Send"}</button>
            </form>
            {messages.length > 0 && <div className="mt-5 space-y-3" aria-live="polite">{messages.slice(-4).map((message) => <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-[#0061E0] text-white" : "border border-blue-100 bg-blue-50 text-blue-950"}`}>{message.action && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">{message.action}</p>}{message.content}</div></div>)}</div>}
          </div>
        </section>

        <section className="mt-8" aria-labelledby="quick-actions-heading">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Capabilities</p><h2 id="quick-actions-heading" className="mt-1 text-xl font-semibold">Quick actions</h2></div><span className="text-xs text-gray-500">Ask Zenvyx to do more</span></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{quickActions.map((action) => <button key={action.label} type="button" onClick={() => chooseQuickAction(action)} className="group rounded-2xl border border-[#E5E7EB] bg-white/70 p-4 text-left shadow-sm backdrop-blur-[12px] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3F4F6] text-sm font-semibold text-[#0061E0] transition group-hover:bg-blue-100">{action.mark}</span><span className="mt-4 block text-sm font-semibold text-gray-900">{action.label}</span><span className="mt-1 block text-xs text-gray-500">Ask AI</span></button>)}</div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section aria-labelledby="overview-heading"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Today</p><h2 id="overview-heading" className="mt-1 text-xl font-semibold">Your overview</h2></div><span className="text-xs text-gray-500">Live summary</span></div><div className="grid grid-cols-3 gap-3"><div className="rounded-2xl border border-[#E5E7EB] bg-white/70 p-4 shadow-sm"><p className="text-2xl font-semibold text-gray-900">3</p><p className="mt-2 text-xs leading-5 text-gray-500">Tasks due today</p></div><div className="rounded-2xl border border-[#E5E7EB] bg-white/70 p-4 shadow-sm"><p className="text-2xl font-semibold text-gray-900">5</p><p className="mt-2 text-xs leading-5 text-gray-500">Notes created</p></div><div className="rounded-2xl border border-[#E5E7EB] bg-white/70 p-4 shadow-sm"><p className="text-2xl font-semibold text-gray-900">1h 20m</p><p className="mt-2 text-xs leading-5 text-gray-500">Focus time</p></div></div></section>
          <section aria-labelledby="activity-heading"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">History</p><h2 id="activity-heading" className="mt-1 text-xl font-semibold">Recent activity</h2></div><Link href="/tasks" className="text-xs font-semibold text-[#0061E0] hover:underline">View all</Link></div><div className="divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white/70 px-4 shadow-sm">{recentActivity.map((item) => <div key={item.title} className="flex items-center gap-3 py-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-xs font-semibold text-[#0061E0]">{item.mark}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-gray-900">{item.title}</p><p className="mt-0.5 text-xs text-gray-500">{item.detail}</p></div><time className="shrink-0 text-xs text-gray-400">{item.time}</time></div>)}</div></section>
  </div>
+
      </div>
    </main>
  );
}
