"use client";

import { FormEvent, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTask.trim();
    if (!title) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title, completed: false },
    ]);
    setNewTask("");
  }

  function toggleTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Workspace
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            My Tasks
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row"
        >
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input
            id="new-task"
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs to be done?"
            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Add Task
          </button>
        </form>

        <section aria-labelledby="task-list-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="task-list-heading"
              className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500"
            >
              Your list
            </h2>
            <span className="text-sm text-zinc-500">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-12 text-center text-zinc-500">
              Your task list is empty.
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-4 px-4 py-4 sm:px-5"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark ${task.title} as ${
                      task.completed ? "incomplete" : "complete"
                    }`}
                    className="h-5 w-5 shrink-0 accent-cyan-400"
                  />
                  <span
                    className={`min-w-0 flex-1 break-words text-base ${
                      task.completed
                        ? "text-zinc-500 line-through"
                        : "text-zinc-100"
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="shrink-0 rounded-md px-2 py-1 text-sm text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
