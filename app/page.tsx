"use client";

import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [showAiBanner, setShowAiBanner] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-50 sm:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Good morning, User <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1 text-slate-400">Here is your overview for today.</p>
      </header>

      {showAiBanner && (
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 shadow-xl">
          <div className="relative z-10 max-w-xl">
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-white">
              AI Assistant
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white">
              You have 7 tasks due tomorrow. Want me to organize your day automatically?
            </h2>
            <p className="mt-2 text-sm text-indigo-100">
              Our AI will analyze your priorities, bills, and deadlines to build the perfect hourly schedule.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link href="/ai-planner" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-md transition hover:bg-slate-100">
                <span aria-hidden="true">✨</span> Let AI Plan My Day
              </Link>
              <button type="button" onClick={() => setShowAiBanner(false)} className="text-sm font-medium text-white transition hover:text-indigo-200">
                Dismiss
              </button>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent opacity-50" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-200">Tasks Today</h2>
            <Link href="/tasks" className="text-xs text-indigo-400 hover:underline">View all</Link>
          </div>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2 opacity-50 line-through"><input type="checkbox" checked readOnly aria-label="Review Next.js docs completed" className="rounded accent-indigo-500" /> Review Next.js docs</li>
            <li className="flex items-center gap-2"><input type="checkbox" disabled aria-label="Pay Rent incomplete" className="rounded accent-indigo-500" /> Pay Rent (Friday)</li>
            <li className="flex items-center gap-2"><input type="checkbox" disabled aria-label="Buy groceries incomplete" className="rounded accent-indigo-500" /> Buy groceries</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-200">Upcoming Bills</h2>
            <span className="rounded bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400">Due soon</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-400">Netflix Subscription</span><span className="font-medium text-slate-200">$15.99</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Apartment Rent</span><span className="font-medium text-slate-200">$850.00</span></div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-200">Weekly Goal</h2>
          <p className="mb-2 text-sm text-slate-400">Launch SaaS Business MVP</p>
          <div className="h-2.5 w-full rounded-full bg-slate-800"><div className="h-2.5 w-2/5 rounded-full bg-indigo-500" /></div>
          <p className="mt-2 text-right text-xs text-indigo-400">40% completed</p>
        </section>
      </div>
    </div>
  );
}
