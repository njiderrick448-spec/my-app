"use client";

import { useEffect, useState } from "react";
import { PhoneFrame } from "@/src/app/onboarding/page";
import { AppBottomNav } from "@/src/components/app-navigation";

function AppNav({ active }: { active: "tasks" | "focus" }) {
  return <AppBottomNav active={active} />;
}

const buttonClassName = "rounded-lg bg-gradient-to-r from-[#4940ec] to-[#8c4eed] py-3 text-[10px] font-bold shadow-[0_7px_18px_rgba(100,71,238,0.3)]";

type BoardTask = { title: string; project: string; due: string; color: string; column: "todo" | "progress" };

const initialBoardTasks: BoardTask[] = [
  { title: "Launch marketing copy drafts", project: "Side Project", due: "Feb 3", color: "#00c7e5", column: "todo" },
  { title: "Buy gym supplies", project: "Health", due: "Feb 5", color: "#9b60ff", column: "todo" },
  { title: "Refactor core layout", project: "Work", due: "Today", color: "#ff9f18", column: "progress" },
  { title: "Review product specs", project: "Work", due: "Tomorrow", color: "#00c7e5", column: "progress" },
];

export function TaskKanbanScreen() {
  const [tasks, setTasks] = useState(initialBoardTasks);

  function moveTask(title: string) {
    setTasks((current) => current.map((task) => task.title === title ? { ...task, column: task.column === "todo" ? "progress" : "todo" } : task));
  }

  return <PhoneFrame><div className="relative min-h-[555px] pb-20 pt-5"><div className="flex items-center justify-between"><h2 className="text-[17px] font-extrabold">Kanban Board</h2><button type="button" className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 text-[16px] text-white/75">+</button></div><div className="mt-6 grid grid-cols-2 gap-2"><div><p className="mb-2 text-[8px] font-bold uppercase text-white/75">To Do (2)<span className="float-right text-white/35">2</span></p><div className="space-y-2">{tasks.filter((task) => task.column === "todo").map((task) => <button type="button" onClick={() => moveTask(task.title)} key={task.title} className="w-full rounded-lg border border-white/5 bg-[#19133d]/90 p-2 text-left"><span className="rounded bg-[#301a65] px-1 text-[6px]" style={{ color: task.color }}>{task.project}</span><p className="mt-2 text-[8px] text-white/80">{task.title}</p><p className="mt-2 text-[7px] text-white/35">{task.due}</p><span className="float-right text-[9px] text-[#00c7e5]">›</span></button>)}</div></div><div><p className="mb-2 text-[8px] font-bold uppercase text-[#00c7e5]">In Progress (2)</p><div className="space-y-2">{tasks.filter((task) => task.column === "progress").map((task) => <button type="button" onClick={() => moveTask(task.title)} key={task.title} className="w-full rounded-lg border border-white/5 bg-[#19133d]/90 p-2 text-left"><span className="rounded bg-[#301a65] px-1 text-[6px]" style={{ color: task.color }}>{task.project}</span><p className="mt-2 truncate text-[8px] text-white/80">{task.title}</p><p className="mt-2 text-[7px] text-white/35">{task.due}</p><span className="float-right h-1.5 w-1.5 rounded-full" style={{ backgroundColor: task.color }} /></button>)}</div></div></div><AppNav active="tasks" /></div></PhoneFrame>;
}

const searchTasks = ["Finish Nexus branding guidelines", "Refactor core layout system", "Pick up groceries"];

export function TasksSearchScreen() {
  const [query, setQuery] = useState("Branding specs");
  const [priorityHigh, setPriorityHigh] = useState(true);
  const matches = searchTasks.filter((task) => task.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes("branding"));

  return <PhoneFrame><div className="relative min-h-[555px] pb-20 pt-5"><h2 className="text-[18px] font-extrabold">Search</h2><label className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-[#110d28] px-3 py-2 text-[9px] text-white/40">⌕<input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[9px] text-white outline-none" /><button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button></label><p className="mt-4 text-[7px] font-bold uppercase text-white/45">Recent searches</p><div className="mt-2 space-y-2 text-[8px] text-white/60">{["Branding specs", "layout system", "groceries"].map((item) => <button type="button" onClick={() => setQuery(item)} key={item} className="block">◷ &nbsp;{item}</button>)}</div><p className="mt-5 text-[7px] font-bold uppercase text-white/45">Filters</p><div className="mt-2 rounded-xl border border-white/5 bg-[#110d28] p-3"><div className="flex gap-1 text-[7px]"><button type="button" onClick={() => setPriorityHigh(!priorityHigh)} className={`rounded border px-2 py-1 ${priorityHigh ? "border-[#00c7e5] bg-[#063747] text-[#00c7e5]" : "border-white/10 text-white/50"}`}>Priority: High</button><button type="button" className="rounded border border-white/10 px-2 py-1 text-white/50">Project: All</button><button type="button" className="rounded border border-white/10 px-2 py-1 text-white/50">Status: Open</button></div></div><p className="mb-2 mt-5 text-[7px] font-bold uppercase text-white/45">Matching tasks</p><div className="space-y-2">{matches.map((task) => <button type="button" key={task} className="flex w-full items-center gap-2 rounded-xl border border-white/5 bg-[#110d28] p-2 text-left"><span className="h-3.5 w-3.5 rounded border border-white/20" /><span className="text-[8px] text-white/75">{task}<small className="block text-[7px] text-white/35">Jan 31 · Work</small></span><span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#357cff]" /></button>)}</div><AppNav active="tasks" /></div></PhoneFrame>;
}

function FocusMetrics() {
  return <div className="mt-5 grid grid-cols-3 rounded-xl border border-white/5 bg-[#110d28] p-3 text-center"><div><b className="text-[14px]">2h 15m</b><small className="mt-1 block text-[7px] text-white/40">Focus Time</small></div><div><b className="text-[14px]">4 / 5</b><small className="mt-1 block text-[7px] text-white/40">Sessions</small></div><div><b className="text-[14px]">12 Days</b><small className="mt-1 block text-[7px] text-white/40">Streak</small></div></div>;
}

export function FocusHomeScreen() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const modes = [["▣", "Deep Work", "25m"], ["▤", "Reading", "20m"], ["☼", "Meditation", "15m"]];
    return <PhoneFrame><div className="relative min-h-[555px] pb-20 pt-5"><div className="flex items-center justify-between"><div><h2 className="text-[18px] font-extrabold">Focus</h2><p className="text-[8px] text-white/45">Cultivate your mental clarity</p></div><span className="rounded-full bg-[#063747] px-2 py-1 text-[7px] text-[#00c7e5]">OS Active</span></div><FocusMetrics /><div className="mt-4 rounded-xl border border-white/5 bg-[#19133d]/80 p-3"><p className="text-[9px] font-bold">Ready to tune out? <span className="float-right text-[#9b60ff]">✣</span></p><p className="mt-1 text-[7px] text-white/45">Start a customizable session now</p><button type="button" onClick={() => setSessionStarted(true)} className={`${buttonClassName} mt-3 w-full`}>{sessionStarted ? "Session Ready" : "▷ Start a New Session"}</button></div><p className="mb-2 mt-5 text-[8px] font-bold uppercase text-white/45">Choose a focus mode</p><div className="flex gap-2">{modes.map(([icon, name, time]) => <button type="button" onClick={() => setSessionStarted(true)} key={name} className="flex-1 rounded-xl border border-white/5 bg-[#110d28] p-2 text-left"><span className="text-[#9b60ff]">{icon}</span><p className="mt-2 text-[7px] font-semibold">{name}</p><small className="text-[7px] text-white/35">{time}</small></button>)}</div><p className="mb-2 mt-5 text-[8px] font-bold uppercase text-white/45">Weekly progress</p><div className="flex h-20 items-end justify-around rounded-xl border border-white/5 bg-[#110d28] px-2 pb-3">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <div key={`${day}-${index}`} className="flex flex-col items-center gap-1"><span className={`w-2 rounded-t ${index === 4 ? "h-11 bg-[#9b60ff]" : "h-6 bg-[#092d40]"}`} /><small className="text-[6px] text-white/35">{day}</small></div>)}</div><AppBottomNav active="focus" /></div></PhoneFrame>;
}

export function ActiveFocusSessionScreen() {
  const [seconds, setSeconds] = useState(23 * 60 + 47);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }, [paused, seconds]);

  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");

  return <PhoneFrame><div className="relative min-h-[555px] pb-20 pt-5"><div className="flex items-center justify-between text-[14px] text-white/50"><button type="button">‹</button><span className="rounded-full bg-[#063747] px-2 py-1 text-[7px] text-[#00e5a0]">● Session Active</span><button type="button">•••</button></div><div className="mt-10 flex flex-col items-center"><div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[3px] border-[#9b60ff] text-[25px] font-extrabold shadow-[0_0_40px_rgba(140,80,238,0.45)]"><span className="absolute inset-2 rounded-full border border-[#00c7e5]/30" />{minutes}:{remainder}<small className="absolute bottom-9 text-[7px] font-bold text-white/45">DEEP WORK</small></div><div className="mt-5 flex gap-3"><button type="button" onClick={() => setPaused(!paused)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#302a70] text-[13px]">{paused ? "▶" : "Ⅱ"}</button><button type="button" onClick={() => setSeconds(0)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#632244] text-[13px] text-[#ff536b]">■</button></div></div><div className="mt-8 rounded-xl border border-white/5 bg-[#110d28] p-3"><p className="text-[8px] font-bold uppercase text-white/50">Blocked apps <span className="float-right rounded bg-[#392174] px-1 text-[7px] text-[#9b60ff]">4 Active</span></p><div className="mt-3 flex gap-2 text-[13px] text-white/50"><span>▣</span><span>♙</span><span>◉</span><span>▣</span></div></div><p className="mt-4 text-center text-[8px] italic text-white/50">&quot;Focus is a muscle, and you are building it right now.&quot;</p><p className="mt-3 text-center text-[7px] text-[#9b60ff]">NEXUS AI</p><AppBottomNav active="focus" /></div></PhoneFrame>;
}