import Link from "next/link";

export type AppNavKey = "home" | "tasks" | "focus" | "ai" | "profile";

const navigationItems: Array<{ key: AppNavKey; icon: string; label: string; href: string }> = [
  { key: "home", icon: "⌂", label: "Home", href: "/home-dashboard" },
  { key: "tasks", icon: "≡", label: "Tasks", href: "/tasks-inbox" },
  { key: "focus", icon: "◷", label: "Focus", href: "/focus-home" },
  { key: "ai", icon: "✣", label: "AI", href: "/ai-chat" },
  { key: "profile", icon: "♙", label: "Profile", href: "/profile" },
];

export function AppBottomNav({ active }: { active: AppNavKey }) {
  return (
    <nav className="absolute bottom-5 left-5 right-5 z-20 grid grid-cols-5 border-t border-white/5 bg-[#070516]/90 pt-3 text-center" aria-label="Primary navigation">
      {navigationItems.map((item) => (
        <Link key={item.key} href={item.href} aria-current={item.key === active ? "page" : undefined} className={`text-[8px] transition ${item.key === active ? "text-[#00c7e5]" : "text-white/40 hover:text-white/75"}`}>
          <span className="block text-[15px] leading-none">{item.icon}</span>
          <span className="mt-1 block">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AppBackButton({ fallback = "/home-dashboard" }: { fallback?: string }) {
  return <Link href={fallback} className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 text-[16px] text-white/70 transition hover:border-[#00c7e5] hover:text-[#00c7e5]" aria-label="Go back">‹</Link>;
}