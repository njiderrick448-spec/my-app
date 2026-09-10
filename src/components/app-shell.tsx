import Link from "next/link";

type AppNavKey = "home" | "tasks" | "focus" | "ai" | "profile";

const navigation = [
  { key: "home" as const, label: "Overview", href: "/", mark: "⌂" },
  { key: "tasks" as const, label: "Tasks", href: "/tasks", mark: "✓" },
  { key: "focus" as const, label: "Focus", href: "/focus-home", mark: "◷" },
  { key: "ai" as const, label: "AI workspace", href: "/ai-chat", mark: "Z" },
  { key: "profile" as const, label: "Profile", href: "/profile", mark: "A" },
];

export function AppShell({ active, children }: { active: AppNavKey; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#10233f]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-[#dbe4ef] bg-white lg:flex lg:flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-[#edf1f6] px-7"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#155fcf] font-semibold text-white">Z</span><span className="text-lg font-semibold tracking-tight">Zenvyx</span></div>
        <nav className="flex-1 space-y-1 px-4 py-7" aria-label="Primary navigation">{navigation.map((item) => <Link key={item.key} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${active === item.key ? "bg-[#eaf2ff] text-[#155fcf]" : "text-[#60738c] hover:bg-[#f5f8fc] hover:text-[#243b5a]"}`}><span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f1f5fa] text-xs font-semibold">{item.mark}</span>{item.label}</Link>)}</nav>
        <div className="border-t border-[#edf1f6] p-5"><p className="text-xs font-medium text-[#7b8da5]">Your workspace</p><p className="mt-1 text-sm font-semibold">Personal plan</p></div>
      </aside>
      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-[#dbe4ef] bg-white px-5 sm:px-8 lg:hidden"><Link href="/" className="flex items-center gap-2 font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#155fcf] text-sm text-white">Z</span>Zenvyx</Link><Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dceaff] text-sm font-semibold text-[#1557b5]" aria-label="Open profile">A</Link></header>
        <main className="mx-auto w-full max-w-6xl px-5 py-7 pb-24 sm:px-8 sm:py-10 lg:pb-10">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-[#dbe4ef] bg-white px-2 py-2 lg:hidden" aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.key} href={item.href} className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium ${active === item.key ? "text-[#155fcf]" : "text-[#7b8da5]"}`}><span className="text-base leading-none">{item.mark}</span>{item.label}</Link>)}</nav>
      </div>
    </div>
  );
}
