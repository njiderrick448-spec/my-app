"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/src/app/onboarding/page";

const inputClassName = "w-full rounded-lg border border-white/5 bg-[#110d28] px-3 py-2.5 text-[10px] text-white/80 outline-none placeholder:text-white/25";
const primaryButtonClassName = "w-full rounded-lg bg-gradient-to-r from-[#4940ec] to-[#8c4eed] py-3 text-[10px] font-bold shadow-[0_7px_18px_rgba(100,71,238,0.3)]";

function SocialButtons({ onUnavailable }: { onUnavailable: () => void }) {
  return <><div className="my-4 flex items-center gap-2 text-[7px] text-white/25"><span className="h-px flex-1 bg-white/5" />OR CONTINUE WITH<span className="h-px flex-1 bg-white/5" /></div><div className="flex gap-2"><button type="button" onClick={onUnavailable} className="flex-1 rounded-lg border border-white/5 bg-[#0d0924] py-2 text-[9px] text-white/70">◉ Google</button><button type="button" onClick={onUnavailable} className="flex-1 rounded-lg border border-white/5 bg-[#0d0924] py-2 text-[9px] text-white/70">◯ Apple</button></div></>;
}

export function CreateAccountScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!name || !email || password.length < 8) { setMessage("Enter your name, a valid email, and a password with at least 8 characters."); return; }
    router.push("/email-verification");
  }
  return <PhoneFrame><div className="relative flex min-h-[555px] flex-col justify-end pb-10"><div className="mb-5"><h2 className="text-[18px] font-extrabold">Create your account</h2><p className="mt-1 text-[10px] text-white/45">Start designing your focus OS today.</p></div><form onSubmit={submit} className="space-y-3"><label className="block text-[8px] font-bold uppercase text-white/50">Full name<input name="name" required className={`${inputClassName} mt-1`} placeholder="Alex Rivers" /></label><label className="block text-[8px] font-bold uppercase text-white/50">Email address<input name="email" required type="email" className={`${inputClassName} mt-1`} placeholder="alex@nexus.ai" /></label><label className="block text-[8px] font-bold uppercase text-white/50">Password<input name="password" required minLength={8} className={`${inputClassName} mt-1`} type="password" placeholder="At least 8 characters" /></label><button type="submit" className={`${primaryButtonClassName} mt-1`}>Create Account</button></form><SocialButtons onUnavailable={() => setMessage("Social sign-in needs a provider configuration before it can be enabled.")} /><p className="mt-3 min-h-5 text-center text-[8px] text-[#ffb246]">{message}</p><p className="mt-3 text-center text-[9px] text-white/45">Already have an account? <Link href="/Login" className="text-[#00c7e5]">Log in</Link></p></div></PhoneFrame>;
}

export function LoginScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!String(form.get("email") ?? "").trim() || !String(form.get("password") ?? "")) { setMessage("Enter your email and password to continue."); return; }
    router.push("/home-dashboard");
  }
  return <PhoneFrame><div className="relative flex min-h-[555px] flex-col justify-end pb-10"><div className="mb-5"><h2 className="text-[18px] font-extrabold">Welcome back</h2><p className="mt-1 text-[10px] text-white/45">Connect to your personal intelligence ecosystem.</p></div><form onSubmit={submit} className="space-y-3"><label className="block text-[8px] font-bold uppercase text-white/50">Email address<input name="email" required type="email" className={`${inputClassName} mt-1`} placeholder="alex@nexus.ai" /></label><label className="block text-[8px] font-bold uppercase text-white/50">Password<input name="password" required className={`${inputClassName} mt-1`} placeholder="••••••••" type="password" /></label><Link href="/forgot-password" className="block text-right text-[8px] font-semibold text-[#9b60ff]">Forgot Password?</Link><button type="submit" className={primaryButtonClassName}>Log In</button></form><SocialButtons onUnavailable={() => setMessage("Social sign-in needs a provider configuration before it can be enabled.")} /><p className="mt-3 min-h-5 text-center text-[8px] text-[#ffb246]">{message}</p><p className="mt-3 text-center text-[9px] text-white/45">Don&apos;t have an account? <Link href="/create-account" className="text-[#00c7e5]">Sign Up</Link></p></div></PhoneFrame>;
}

export function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (!String(email ?? "").trim()) return;
    setSent(true);
  }
  return <PhoneFrame><div className="relative flex min-h-[555px] flex-col justify-end pb-10"><Link href="/Login" className="mb-7 text-[9px] text-white/75">← &nbsp;Back to Log In</Link><div className="mb-5"><h2 className="text-[18px] font-extrabold">Reset Password</h2><p className="mt-3 text-[9px] leading-[1.5] text-white/50">Enter the email address associated with your account. We will send you a verification link to reset your security credentials.</p></div><form onSubmit={submit}><label className="block text-[8px] font-bold uppercase text-white/50">Email address<input name="email" required type="email" className={`${inputClassName} mt-1`} placeholder="alex@nexus.ai" /></label><button type="submit" className={`${primaryButtonClassName} mt-4`}>{sent ? "Reset Link Sent" : "Send Reset Link"}</button></form><p className="mt-4 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-[8px] leading-[1.4] text-white/45"><span className="mr-2 text-[#00c7e5]">ⓘ</span>{sent ? "Check your inbox for the password reset link." : "Please check your spam or junk folder if you don&apos;t receive the email within 2 minutes."}</p></div></PhoneFrame>;
}
