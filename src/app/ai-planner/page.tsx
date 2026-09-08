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
    color: "bg-blue-500",
  },
  {
    time: "11:30 AM",
    title: "Buy Groceries",
    detail: "Quick errand on your route",
    duration: "45 min",
    color: "bg-amber-400",
  },
  {
    time: "12:30 PM",
    title: "Pay Rent",
    detail: "Important task, handled early",
    duration: "15 min",
    color: "bg-emerald-500",
  },
  {
    time: "5:30 PM",
    title: "Go Gym",
    detail: "Energy-friendly evening session",
    duration: "1 hr",
    color: "bg-rose-500",
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
    <main className="min-h-screen overflow-hidden bg-slate-50 px-5 py-8 text-gray-900 sm:px-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              Pro feature preview
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Give your day a little more shape.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Drop in the things you need to do. Your personal AI planner will
              find the rhythm that makes them feel lighter.
            </p>
          </div>
          <div className="hidden shrink-0 rounded-full border border-[#E5E7EB] bg-white/45 px-4 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-[12px] sm:block">
            <span className="mr-2 text-blue-600">●</span>
            Today, Tuesday
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <section className="rounded-2xl border border-white/60 bg-white/45 p-5 shadow-xl shadow-gray-900/5 backdrop-blur-[12px] sm:p-7" aria-labelledby="inbox-heading">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                  Step 01
                </p>
                <h2 id="inbox-heading" className="text-xl font-medium text-gray-900">
                  Your loose ends
                </h2>
              </div>
              <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-gray-600">
                {tasks.length} tasks
              </span>
            </div>

            <ul className="space-y-3">
              {tasks.map((task, index) => (
                <li
                  key={task}
                  className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 transition hover:border-[#9CA3AF]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-sm text-gray-500">
                    0{index + 1}
                  </span>
                  <span className="text-base text-gray-800">{task}</span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-gray-300" />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={organizeDay}
              disabled={isOrganizing}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#0061E0] px-5 py-4 font-semibold text-white shadow-lg shadow-blue-700/10 transition hover:bg-[#004FBA] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-slate-50 disabled:cursor-wait disabled:opacity-80"
            >
              {isOrganizing ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  AI is organizing your day...
                </>
              ) : (
                <>{isOrganized ? "Re-organize My Day" : "Ask AI to Organize My Day"}</>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">
              Finds focus windows, errands, and breathing room automatically.
            </p>
          </section>

          <section
            className={`relative rounded-2xl border p-5 shadow-sm transition-all duration-700 sm:p-7 ${
              isOrganized
                ? "border-blue-200 bg-blue-50/60"
                : "border-[#E5E7EB] bg-white/45 backdrop-blur-[12px]"
            }`}
            aria-live="polite"
            aria-labelledby="schedule-heading"
          >
            {!isOrganized ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] text-3xl">
                  ✦
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] texta-gray-500">
                  Step 02
                </p>
                <h2 className="text-2xl font-medium text-gray-900">
                  A calmer day is one click away.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                  {isOrganizing
                    ? "AI is analyzing your habits..."
                    : "Your optimized timeline will appear here."}
                </p>
                {isOrganizing && (
                  <div className="mt-8 flex gap-1.5" aria-label="Loading">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0061E0] [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0061E0] [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#0061E0]" />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-700">
                      Step 02 · Optimized
                    </p>
                    <h2 id="schedule-heading" className="text-2xl font-medium text-gray-900">
                      Tuesday, September 8
                    </h2>
                  </div>
                  <span className="hidden text-sm text-gray-500 sm:block">4 tasks · 4h total</span>
                </div>

                <div className="relative space-y-4">
                  <div className="absolute bottom-7 left-[76px] top-7 w-px bg-[#E5E7EB] sm:left-[92px]" />
                  {schedule.map((item) => (
                    <article key={item.time} className="relative grid grid-cols-[64px_24px_1fr] items-center gap-3 sm:grid-cols-[80px_24px_1fr] sm:gap-4">
                      <time className="text-right text-xs font-medium text-gray-500 sm:text-sm">{item.time}</time>
                      <span className={`relative z-10 h-3 w-3 rounded-full ${item.color} ring-4 ring-slate-50`} />
                      <div className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 transition hover:border-[#9CA3AF]">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
                          </div>
                          <span className="shrink-0 text-xs text-gray-500">{item.duration}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
