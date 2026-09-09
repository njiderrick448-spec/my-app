import Link from "next/link";

const agendaItems = [
  { title: "Review product specs", detail: "09:30 AM - Work", done: true },
  { title: "Design review meeting", detail: "11:00 AM - Design", done: false },
];

function NexusMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#18133b] shadow-[0_0_24px_rgba(92,58,255,0.3)]">
      <span className="absolute left-2.5 h-3 w-2 rounded-full border-[3px] border-[#09c9e8]" />
      <span className="absolute right-2.5 h-2.5 w-4 rotate-[-35deg] rounded-full border-[3px] border-[#9960ff]" />
    </div>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 -my-8 flex min-h-screen w-[calc(100%+2rem)] bg-[#070516] text-white sm:-mx-4">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#09071b] px-5 py-7 lg:flex lg:flex-col">
        <Link href="/home-dashboard" className="flex items-center gap-3">
          <NexusMark />
          <span className="text-lg font-black tracking-tight">NEXUS</span>
        </Link>
        <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Workspace</p>
        <nav className="mt-4 space-y-1" aria-label="Workspace navigation">
          {[
            ["⌂", "Home", "/home-dashboard"],
            ["≡", "Tasks", "/tasks-inbox"],
            ["◷", "Focus", "/focus-home"],
            ["✣", "AI", "/ai-chat"],
            ["♙", "Profile", "/profile"],
          ].map(([icon, label, href]) => (
            <Link key={label} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white">
              <span className="w-5 text-center text-base text-[#00c7e5]">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-[#110d28] p-4">
          <p className="text-xs font-semibold">Alex Rivera</p>
          <p className="mt-1 text-[10px] text-white/40">alex@nexus.ai</p>
          <Link href="/settings" className="mt-4 block text-xs text-[#00c7e5]">Settings</Link>
        </div>
      </aside>
      <div className="relative min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_60%_0%,rgba(81,48,191,0.2),transparent_38%),#070516]">
        <div className="relative mx-auto min-h-screen w-full max-w-[1440px] px-5 pb-24 pt-6 text-white sm:px-8 lg:px-12 lg:pb-12 lg:pt-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SplashScreen() {
  return (
    <PhoneFrame>
      <div className="relative flex min-h-[555px] flex-col items-center justify-center text-center">
        <NexusMark />
        <h2 className="mt-5 text-[25px] font-black tracking-tight">NEXUS</h2>
        <p className="mt-1 text-[10px] text-white/45">Your AI-powered life OS</p>
      </div>
    </PhoneFrame>
  );
}

export function WelcomeScreen() {
  return (
    <PhoneFrame>
      <div className="relative flex min-h-[555px] flex-col justify-end pb-10">
        <div className="mb-8 h-[164px] overflow-hidden rounded-2xl border border-white/10 bg-[#14102e] shadow-[0_0_35px_rgba(92,58,255,0.35)]">
          <div className="relative h-full bg-[radial-gradient(ellipse_at_70%_48%,rgba(112,72,255,0.7),transparent_37%),radial-gradient(ellipse_at_15%_50%,rgba(0,194,229,0.48),transparent_28%)]">
            <div className="absolute left-[38%] top-[41%] h-8 w-8 rounded-full border border-white/10" />
            <div className="absolute left-[51%] top-[28%] h-4 w-4 rounded-full border border-white/10" />
            <div className="absolute left-[52%] top-[56%] h-5 w-5 rounded-full border border-white/10" />
          </div>
        </div>
        <h2 className="max-w-[210px] text-[23px] font-extrabold leading-[1.05]">Take control of your day</h2>
        <p className="mt-4 max-w-[220px] text-[11px] leading-[1.55] text-white/55">Nexus unifies your tasks, schedule, and mental focus into an elegant, intelligence-driven framework.</p>
        <div className="mt-7 space-y-2">
          <Link href="/onboarding/organize" className="block w-full rounded-lg bg-gradient-to-r from-[#4940ec] to-[#8c4eed] py-3 text-center text-[11px] font-bold text-white shadow-[0_7px_18px_rgba(100,71,238,0.3)]">Get Started</Link>
          <Link href="/Login" className="block w-full rounded-lg border border-white/5 bg-[#0d0924] py-3 text-center text-[10px] font-semibold text-white/75">I already have an account</Link>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AgendaScreen() {
  return (
    <PhoneFrame>
      <div className="relative flex min-h-[555px] flex-col justify-end pb-10">
        <div className="mb-9 rounded-2xl border border-white/10 bg-[#100b2b]/90 p-3 shadow-[0_0_28px_rgba(92,58,255,0.18)]">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-wide text-[#00c7e5]">Daily agenda</p>
          <div className="space-y-2">
            {agendaItems.map((item) => (
              <div key={item.title} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2">
                <span className={`flex h-3 w-3 items-center justify-center rounded-[3px] border text-[8px] ${item.done ? "border-[#00c7e5] bg-[#00c7e5]/20 text-[#00c7e5]" : "border-white/20"}`}>{item.done ? "x" : ""}</span>
                <div><p className="text-[9px] font-medium">{item.title}</p><p className="mt-0.5 text-[7px] text-white/40">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
        <p className="mb-3 w-fit rounded bg-[#00c7e5]/15 px-1.5 py-1 text-[8px] font-bold uppercase text-[#00c7e5]">Step 1 of 3</p>
        <h2 className="text-[20px] font-extrabold">Organize Everything</h2>
        <p className="mt-3 text-[11px] leading-[1.5] text-white/55">Map out your tasks, appointments, and project timelines within a clean, automatically unified dashboard.</p>
        <div className="mt-4 flex gap-1"><span className="h-1 w-4 rounded-full bg-[#00c7e5]" /><span className="h-1 w-1 rounded-full bg-white/25" /><span className="h-1 w-1 rounded-full bg-white/25" /></div>
        <Link href="/onboarding/focus" className="mt-8 block w-full rounded-lg bg-gradient-to-r from-[#4940ec] to-[#8c4eed] py-3 text-center text-[11px] font-bold shadow-[0_7px_18px_rgba(100,71,238,0.3)]">Continue</Link>
      </div>
    </PhoneFrame>
  );
}

export function FocusScreen() {
  return (
    <PhoneFrame>
      <div className="relative flex min-h-[555px] flex-col justify-end pb-10">
        <div className="mb-9 flex h-[153px] items-center justify-center rounded-2xl border border-white/10 bg-[#100b2b]/90 shadow-[0_0_28px_rgba(92,58,255,0.18)]">
          <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full border-2 border-[#8a4fff] border-l-transparent text-[16px] font-extrabold shadow-[0_0_0_6px_rgba(137,79,255,0.12)]"><span className="absolute -top-1 right-[-3px] h-2 w-2 rounded-full bg-[#b57aff]" />25:00</div>
          <span className="absolute mt-[55px] text-[7px] font-bold uppercase text-[#8a4fff]">Deep work</span>
        </div>
        <p className="mb-3 w-fit rounded bg-[#00c7e5]/15 px-1.5 py-1 text-[8px] font-bold uppercase text-[#00c7e5]">Step 2 of 3</p>
        <h2 className="text-[20px] font-extrabold">Stay Focused</h2>
        <p className="mt-3 text-[11px] leading-[1.5] text-white/55">Initiate specialized focus timers and selectively block distracting notifications to reclaim deep cognitive flow.</p>
        <div className="mt-4 flex gap-1"><span className="h-1 w-1 rounded-full bg-white/25" /><span className="h-1 w-4 rounded-full bg-[#00c7e5]" /><span className="h-1 w-1 rounded-full bg-white/25" /></div>
        <Link href="/onboarding/ai" className="mt-8 block w-full rounded-lg bg-gradient-to-r from-[#4940ec] to-[#8c4eed] py-3 text-center text-[11px] font-bold shadow-[0_7px_18px_rgba(100,71,238,0.3)]">Continue</Link>
      </div>
    </PhoneFrame>
  );
}

export function AiKnowsYouScreen() {
  return (
    <PhoneFrame>
      <div className="relative flex min-h-[555px] flex-col justify-end pb-10">
        <div className="mb-9 flex h-[149px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#08192d] shadow-[0_0_32px_rgba(0,194,229,0.18)]">
          <div className="relative h-14 w-14 rounded-full border border-[#00c7e5]/70 shadow-[0_0_22px_rgba(0,199,229,0.4)]">
            <span className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-[#00c7e5] shadow-[0_0_18px_#00c7e5]" />
            <span className="absolute -bottom-9 left-1/2 h-5 w-1 -translate-x-1/2 bg-[#00c7e5]" />
            <span className="absolute -bottom-9 left-[42%] h-5 w-1 rotate-[25deg] bg-[#9b55ff]" />
            <span className="absolute -bottom-9 left-[58%] h-5 w-1 rotate-[-25deg] bg-[#9b55ff]" />
          </div>
        </div>
        <p className="mb-3 w-fit rounded bg-[#00c7e5]/15 px-1.5 py-1 text-[8px] font-bold uppercase text-[#00c7e5]">Step 3 of 3</p>
        <h2 className="text-[20px] font-extrabold">AI That Knows You</h2>
        <p className="mt-3 text-[11px] leading-[1.5] text-white/55">Nexus adapts seamlessly to your habits, synthesizing contextual micro-insights to intelligently optimize your day.</p>
        <div className="mt-4 flex gap-1"><span className="h-1 w-1 rounded-full bg-white/25" /><span className="h-1 w-1 rounded-full bg-white/25" /><span className="h-1 w-4 rounded-full bg-[#00c7e5]" /></div>
        <Link href="/create-account" className="mt-8 block w-full rounded-lg bg-gradient-to-r from-[#4940ec] to-[#8c4eed] py-3 text-center text-[11px] font-bold shadow-[0_7px_18px_rgba(100,71,238,0.3)]">Get Started</Link>
      </div>
    </PhoneFrame>
  );
}

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-4 py-8">
      <SplashScreen />
    </main>
  );
}