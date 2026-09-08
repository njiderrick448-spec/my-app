"use client";

import { FormEvent, useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TASKS_STORAGE_KEY = "tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [hasLoadedTasks, setHasLoadedTasks] = useState(false);

  useEffect(() => {
    let loadedTasks: Task[] = [];

    try {
      const savedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks: unknown = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          loadedTasks = parsedTasks as Task[];
        }
      }
    } catch {
      loadedTasks = [];
    }

    queueMicrotask(() => {
      setTasks(loadedTasks);
      setHasLoadedTasks(true);
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedTasks) {
      return;
    }

    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
    }
  }, [hasLoadedTasks, tasks]);

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
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-gray-900 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-700">
            Workspace
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            My Tasks
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 rounded-xl border border-white/60 bg-white/45 p-4 shadow-sm backdrop-blur-[12px] sm:flex-row"
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
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-gray-400 focus:ring-2 focus:ring-blue-500/40"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#0061E0] px-5 py-3 font-semibold text-white transition hover:bg-[#004FBA] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Add Task
          </button>
        </form>

        <section aria-labelledby="task-list-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="task-list-heading"
              className="text-sm font-medium uppercase tracking-[0.16em] text-gray-500"
            >
              Your list
            </h2>
            <span className="text-sm text-gray-500">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center text-gray-500">
              Your task list is empty.
            </div>
          ) : (
            <ul className="divide-y divide-[#E5E7EB] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white/45 backdrop-blur-[12px]">
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
                        ? "text-gray-500 line-through"
                          : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="shrink-0 rounded-md px-2 py-1 text-sm text-gray-500 transition hover:bg-red-50 hover:text-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
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
