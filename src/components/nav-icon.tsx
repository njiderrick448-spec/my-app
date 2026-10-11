import type { ReactNode } from "react";

export type NavIconName = "home" | "tasks" | "focus" | "ai" | "profile";

const iconPaths: Record<NavIconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
  tasks: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3.5 6 .8.8L6 5m-2.5 7 .8.8L6 11m-2.5 7 .8.8L6 17" /></>,
  focus: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  ai: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /></>,
  profile: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
};

export function NavIcon({ name }: { name: NavIconName }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name]}
      </svg>
    </span>
  );
}