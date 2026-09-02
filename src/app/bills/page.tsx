"use client";

import { FormEvent, useState } from "react";

type Subscription = {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
};

const initialSubscriptions: Subscription[] = [
  { id: 1, name: "Netflix", amount: 15.99, dueDate: "2026-09-08" },
  { id: 2, name: "Gym", amount: 30, dueDate: "2026-09-15" },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatDueDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function BillsPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const totalMonthlySpend = subscriptions.reduce(
    (total, subscription) => total + subscription.amount,
    0,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const parsedAmount = Number(amount);

    if (!trimmedName || !Number.isFinite(parsedAmount) || parsedAmount <= 0 || !dueDate) {
      return;
    }

    setSubscriptions((currentSubscriptions) => [
      ...currentSubscriptions,
      {
        id: Date.now(),
        name: trimmedName,
        amount: parsedAmount,
        dueDate,
      },
    ]);
    setName("");
    setAmount("");
    setDueDate("");
  }

  function deleteSubscription(subscriptionId: number) {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.filter(
        (subscription) => subscription.id !== subscriptionId,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Finances
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Bills &amp; Subscriptions
          </h1>
        </header>

        <section className="mb-8 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">
            Total Monthly Spend
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
            {currencyFormatter.format(totalMonthlySpend)}
          </p>
        </section>

        <section className="mb-10" aria-labelledby="active-subscriptions-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="active-subscriptions-heading"
              className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500"
            >
              Active subscriptions
            </h2>
            <span className="text-sm text-zinc-500">
              {subscriptions.length} {subscriptions.length === 1 ? "item" : "items"}
            </span>
          </div>

          {subscriptions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-12 text-center text-zinc-500">
              No active subscriptions.
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              {subscriptions.map((subscription) => (
                <li
                  key={subscription.id}
                  className="flex items-center gap-4 px-4 py-4 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-base font-medium text-zinc-100">
                      {subscription.name}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Due {formatDueDate(subscription.dueDate)}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-base font-medium text-zinc-100">
                    {currencyFormatter.format(subscription.amount)}
                    <span className="block text-xs font-normal text-zinc-500">/mo</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteSubscription(subscription.id)}
                    aria-label={`Delete ${subscription.name}`}
                    className="shrink-0 rounded-md px-2 py-1 text-sm text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="add-subscription-heading">
          <h2
            id="add-subscription-heading"
            className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-zinc-500"
          >
            Add New Subscription
          </h2>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="subscription-name" className="mb-2 block text-sm text-zinc-400">
                  Name
                </label>
                <input
                  id="subscription-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Streaming service"
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <div>
                <label htmlFor="subscription-amount" className="mb-2 block text-sm text-zinc-400">
                  Amount
                </label>
                <input
                  id="subscription-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <div>
                <label htmlFor="subscription-due-date" className="mb-2 block text-sm text-zinc-400">
                  Due Date
                </label>
                <input
                  id="subscription-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Add New Subscription
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
