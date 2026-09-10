"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AppShell } from "@/src/components/app-shell";

type ChatMessage = { role: "user" | "assistant"; content: string };
const initialMessages: ChatMessage[] = [{ role: "assistant", content: "Hi Alex. I’m here to help you organize the day. Tell me what you’re working through, or ask me to turn an idea into a clear next step." }];

export default function AiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSending) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);
    try {
      const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages }) });
      if (!response.ok) throw new Error("Assistant request failed");
      const reply = await response.text();
      setMessages((current) => [...current, { role: "assistant", content: reply || "I’m ready for the next step." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I couldn’t reach the assistant just now. Your message is still here; try sending it again when the connection is ready." }]);
    } finally {
      setIsSending(false);
    }
  }

  return <AppShell active="ai"><div className="flex min-h-[calc(100vh-9rem)] flex-col"><header className="flex flex-col gap-3 border-b border-[#dbe4ef] pb-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-3"><Link href="/" className="text-sm text-[#7b8da5] hover:text-[#1664d8]">Overview</Link><span className="text-[#b4c3d4]">/</span><span className="text-sm font-medium text-[#243b5a]">AI workspace</span></div><h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#10233f]">Your AI workspace</h1><p className="mt-1 text-sm text-[#7b8da5]">A private place to think, plan, and turn conversations into action.</p></div><span className="flex w-fit items-center gap-2 rounded-full border border-[#cce0fa] bg-[#f1f7ff] px-3 py-1.5 text-xs font-medium text-[#1664d8]"><span className="h-2 w-2 rounded-full bg-[#2ea66f]" />Connected</span></header><div className="mt-6 grid min-h-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_260px]"><section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#dbe4ef] bg-white shadow-sm" aria-label="Chat with Zenvyx AI"><div className="flex items-center gap-3 border-b border-[#edf1f6] px-5 py-4"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f0ff] font-semibold text-[#1664d8]">Z</span><div><p className="text-sm font-semibold text-[#10233f]">Zenvyx AI</p><p className="text-xs text-[#7b8da5]">Your productivity partner</p></div></div><div className="flex-1 space-y-5 overflow-y-auto px-5 py-6" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-sm bg-[#155fcf] text-white" : "rounded-bl-sm bg-[#f1f5fa] text-[#243b5a]"}`}>{message.content}</div></div>)}{isSending && <div className="flex gap-3"><div className="rounded-2xl rounded-bl-sm bg-[#f1f5fa] px-4 py-3 text-sm text-[#7b8da5]">Thinking...</div></div>}</div><form onSubmit={sendMessage} className="border-t border-[#edf1f6] p-4"><label htmlFor="chat-message" className="sr-only">Message Zenvyx AI</label><div className="flex items-end gap-3 rounded-xl border border-[#cbd8e7] bg-[#fbfcfe] p-2 focus-within:border-[#1664d8] focus-within:ring-2 focus-within:ring-[#1664d8]/10"><textarea id="chat-message" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Write a message..." rows={1} className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[#10233f] outline-none placeholder:text-[#9aa9ba]" /><button type="submit" disabled={!draft.trim() || isSending} className="rounded-lg bg-[#155fcf] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d4fac] disabled:cursor-not-allowed disabled:opacity-50">Send</button></div><p className="mt-2 px-2 text-[11px] text-[#9aa9ba]">Enter to send · Shift + Enter for a new line</p></form></section><aside className="hidden rounded-2xl border border-[#dbe4ef] bg-white p-5 shadow-sm lg:block"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8da5]">Start with</p><div className="mt-4 space-y-2">{["Plan my top three priorities", "Break down a complex task", "Create a focused work block", "Help me reflect on today"].map((prompt) => <button key={prompt} type="button" onClick={() => setDraft(prompt)} className="w-full rounded-lg border border-[#edf1f6] px-3 py-3 text-left text-sm text-[#48627e] transition hover:border-[#b9d2f4] hover:bg-[#f7faff] hover:text-[#155fcf]">{prompt}</button>)}</div><div className="mt-8 border-t border-[#edf1f6] pt-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8da5]">Coming together</p><p className="mt-3 text-sm leading-6 text-[#60738c]">Your conversations will become the connective layer between tasks, notes, goals, and focus sessions.</p></div></aside></div></div></AppShell>;
}
