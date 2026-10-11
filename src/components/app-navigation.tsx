import Link from "next/link";
import { NavIcon, type NavIconName } from "@/src/components/nav-icon";

export type AppNavKey = "home" | "tasks" | "focus" | "ai" | "profile";

const navigationItems: Array<{ key: AppNavKey; icon: NavIconName; label: string; href: string }> = [
  { key: "home", icon: "home", label: "Home", href: "/" },
  { key: "tasks", icon: "tasks", label: "Tasks", href: "/tasks-inbox" },
  { key: "focus", icon: "focus", label: "Focus", href: "/focus-home" },
  { key: "ai", icon: "ai", label: "AI", href: "/ai-chat" },
  { key: "profile", icon: "profile", label: "Profile", href: "/profile" },
];

export function AppBottomNav({ active }: { active: AppNavKey }) {
  return (
    <nav className="app-bottom-nav absolute bottom-5 left-5 right-5 z-20 grid grid-cols-5 border-t border-white/5 bg-[#070516]/90 pt-3 text-center lg:hidden" aria-label="Primary navigation">
      {navigationItems.map((item) => (
        <Link key={item.key} href={item.href} aria-current={item.key === active ? "page" : undefined} className={`text-[8px] transition ${item.key === active ? "text-[#00c7e5]" : "text-white/40 hover:text-white/75"}`}>
          <NavIcon name={item.icon} />
          <span className="block">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AppBackButton({ fallback = "/home-dashboard" }: { fallback?: string }) {
  return <Link href={fallback} className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 text-[16px] text-white/70 transition hover:border-[#00c7e5] hover:text-[#00c7e5]" aria-label="Go back">‹</Link>;
}