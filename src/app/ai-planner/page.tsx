"use client";

import { useEffect, useState } from "react";

type ScheduleItem = {
  time: string;
  title: string;
  detail: string;
  duration: string;
  color: string;
};

const tasks = ["Pay Rent", "Study Chemistry", "Go Gym", "Buy Groceries"];

const schedule: ScheduleItem[] = [
  {
    time: "9:00 AM",
    title: "Study Chemistry",
    detail: "Deep focus block",
    duration: "2 hrs",
    color: "bg-cyan-300",
  },
  {
    time: "11:30 AM",
    title: "Buy Groceries",
    detail: "Quick errand on your route",
    duration: "45 min",
    color: "bg-amber-300",
  },
  {
    time: "12:30 PM",
    title: "Pay Rent",
    detail: "Important task, handled early",
    duration: "15 min",
    color: "bg-lime-300",
  },
  {
    time: "5:30 PM",
    title: "Go Gym",
    detail: "Energy-friendly evening session",
    duration: "1 hr",
    color: "bg-rose-300",
  },
];

export default function AiPlannerPage() {
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [isOrganized, setIsOrganized] = useState(false);

  useEffect(() => {
    if (!isOrganizing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsOrganizing(false);
      setIsOrganized(true);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [isOrganizing]);

  function organizeDay() {
    if (isOrganizing) {
      return;
    }

    setIsOrganized(false);
    setIsOrganizing(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#101415] px-5 py-8 text-zinc-100 sm:px-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-lime-300">
              Pro feature preview
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Give your day a little more shape.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Drop in the things you need to do. Your personal AI planner will
              find the rhythm that makes them feel lighter.
            </p>
          </div>
          <div className="hidden shrink-0 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400 sm:block">
            <span className="mr-2 text-lime-300">●</span>
            Today, Tuesday
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20 sm:p-7" aria-labelledby="inbox-heading">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Step 01
                </p>
                <h2 id="inbox-heading" className="text-xl font-medium text-white">
                  Your loose ends
                </h2>
              </div>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                {tasks.length} tasks
              </span>
            </div>

            <ul className="space-y-3">
              {tasks.map((task, index) => (
                <li
                  key={task}
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#151b1c] px-4 py-4 transition hover:border-zinc-700"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-500">
                    0{index + 1}
                  </span>
                  <span className="text-base text-zinc-200">{task}</span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-zinc-700" />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={organizeDay}
              disabled={isOrganizing}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-300 px-5 py-4 font-semibold text-[#142016] shadow-lg shadow-lime-300/10 transition hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-wait disabled:opacity-80"
            >
              {isOrganizing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#142016]/30 border-t-[#142016]" />
                  AI is organizing your day...
                </>
              ) : (
                <>{isOrganized ? "✨ Re-organize My Day" : "✨ Ask AI to Organize My Day"}</>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-zinc-500">
              Finds focus windows, errands, and breathing room automatically.
            </p>
          </section>

          <section
            className={`relative rounded-2xl border p-5 transition-all duration-700 sm:p-7 ${
              isOrganized
                ? "border-lime-300/30 bg-[#17201b]"
                : "border-zinc-800 bg-zinc-900/40"
            }`}
            aria-live="polite"
            aria-labelledby="schedule-heading"
          >
            {!isOrganized ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800/80 text-3xl">
                  ✦
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Step 02
                </p>
                <h2 className="text-2xl font-medium text-white">
                  A calmer day is one click away.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
                  {isOrganizing
                    ? "AI is analyzing your habits..."
                    : "Your optimized timeline will appear here."}
                </p>
                {isOrganizing && (
                  <div className="mt-8 flex gap-1.5" aria-label="Loading">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-lime-300 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-lime-300 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-lime-300" />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-lime-300">
                      Step 02 · Optimized
                    </p>
                    <h2 id="schedule-heading" className="text-2xl font-medium text-white">
                      Tuesday, September 8
                    </h2>
                  </div>
                  <span className="hidden text-sm text-zinc-500 sm:block">4 tasks · 4h total</span>
                </div>

                <div className="relative space-y-4">
                  <div className="absolute bottom-7 left-[76px] top-7 w-px bg-zinc-700 sm:left-[92px]" />
                  {schedule.map((item) => (
                    <article key={item.time} className="relative grid grid-cols-[64px_24px_1fr] items-center gap-3 sm:grid-cols-[80px_24px_1fr] sm:gap-4">
                      <time className="text-right text-xs font-medium text-zinc-500 sm:text-sm">{item.time}</time>
                      <span className={`relative z-10 h-3 w-3 rounded-full ${item.color} ring-4 ring-[#17201b]`} />
                      <div className="rounded-xl border border-zinc-700/70 bg-[#1d2821] px-4 py-4 transition hover:border-lime-300/50">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium text-zinc-100">{item.title}</h3>
                            <p className="mt-1 text-sm text-zinc-500">{item.detail}</p>
                          </div>
                          <span className="shrink-0 text-xs text-zinc-500">{item.duration}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-lime-300/30 bg-lime-300/10 p-5 shadow-xl shadow-black/20 sm:-mr-10 sm:translate-x-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-300 text-lg text-[#142016]">
                      ✨
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-lime-100">Your day, upgraded.</p>
                      <p className="mt-2 text-sm leading-6 text-lime-100/70">
                        AI just saved you 45 minutes of planning. Unlock unlimited weekly AI scheduling for <strong className="font-semibold text-lime-100">$2.99/mo!</strong>
                      </p>
                      <button type="button" className="mt-4 rounded-lg bg-lime-300 px-4 py-2.5 text-sm font-semibold text-[#142016] transition hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-[#17201b]">
                        Unlock Pro
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
