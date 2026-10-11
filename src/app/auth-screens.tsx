"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

const inputClassName = "w-full rounded-lg border border-[#dbe4ef] bg-white px-3.5 py-3 text-sm text-[#10233f] outline-none placeholder:text-[#9aa9ba] transition focus:border-[#5b9bea] focus:ring-4 focus:ring-[#5b9bea]/15";
const primaryButtonClassName = "w-full rounded-lg bg-[#155fcf] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(21,95,207,0.18)] transition hover:bg-[#0d4fac] focus:outline-none focus:ring-4 focus:ring-[#5b9bea]/30";
const labelClassName = "block text-xs font-semibold text-[#243b5a]";

function AuthFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8fc] px-4 py-10 text-[#10233f]">
      <div className="w-full max-w-[440px]">
        <Link href="/" className="mx-auto flex w-fit items-center gap-3" aria-label="Zenvyx home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#155fcf] text-lg font-bold text-white shadow-[0_8px_20px_rgba(21,95,207,0.2)]">Z</span>
          <span className="text-xl font-semibold tracking-tight">Zenvyx</span>
        </Link>
        <section className="mt-7 rounded-2xl border border-[#dbe4ef] bg-white p-6 shadow-[0_18px_50px_rgba(16,35,63,0.08)] sm:p-9">
          {children}
        </section>
        <p className="mt-6 text-center text-xs text-[#7b8da5]">A clearer view of what deserves your attention.</p>
      </div>
    </main>
  );
}

function SocialButtons({ onError }: { onError: (message: string) => void }) {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);

  async function signIn(provider: "google" | "apple") {
    setLoadingProvider(provider);
    onError("");

    try {
      const { error } = await createClient().auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/home-dashboard`,
        },
      });

      if (error) {
        onError(error.message);
        setLoadingProvider(null);
      }
    } catch {
      onError(`Unable to start ${provider === "google" ? "Google" : "Apple"} sign-in. Check your connection and try again.`);
      setLoadingProvider(null);
    }
  }

  const buttonClassName = "flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dbe4ef] bg-white py-2.5 text-xs font-medium text-[#405773] transition hover:bg-[#f5f8fc] disabled:cursor-not-allowed disabled:opacity-60";
  return <><div className="my-5 flex items-center gap-3 text-[10px] font-medium tracking-wide text-[#9aa9ba]"><span className="h-px flex-1 bg-[#e7edf4]" />OR CONTINUE WITH<span className="h-px flex-1 bg-[#e7edf4]" /></div><div className="flex gap-3"><button type="button" onClick={() => void signIn("google")} disabled={loadingProvider !== null} className={buttonClassName}>{loadingProvider === "google" ? "Opening Google…" : <><svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>Google</>}</button><button type="button" onClick={() => void signIn("apple")} disabled={loadingProvider !== null} className={buttonClassName}>{loadingProvider === "apple" ? "Opening Apple…" : <><svg aria-hidden="true" className="h-4 w-4 shrink-0 text-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.093 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>Apple</>}</button></div></>;
}

export function CreateAccountScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!name || !email || password.length < 8) { setMessage("Enter your name, a valid email, and a password with at least 8 characters."); return; }
    setIsSubmitting(true);
    const { data, error } = await createClient().auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/home-dashboard`,
      },
    });
    setIsSubmitting(false);
    if (error) { setMessage(error.message); return; }
    router.push(data.session ? "/home-dashboard" : "/email-verification");
  }
  return <AuthFrame><div><h1 className="text-2xl font-semibold tracking-tight">Create your account</h1><p className="mt-2 text-sm text-[#60738c]">Start building a clearer, more focused day.</p></div><form onSubmit={submit} className="mt-7 space-y-4"><label className={labelClassName}>Full name<input name="name" required className={`${inputClassName} mt-2`} placeholder="Alex Rivers" autoComplete="name" /></label><label className={labelClassName}>Email address<input name="email" required type="email" className={`${inputClassName} mt-2`} placeholder="alex@example.com" autoComplete="email" /></label><label className={labelClassName}>Password<input name="password" required minLength={8} className={`${inputClassName} mt-2`} type="password" placeholder="At least 8 characters" autoComplete="new-password" /></label><button disabled={isSubmitting} type="submit" className={`${primaryButtonClassName} mt-2 disabled:cursor-not-allowed disabled:opacity-60`}>{isSubmitting ? "Creating account..." : "Create account"}</button></form><SocialButtons onError={setMessage} /><p role="status" className="mt-3 min-h-5 text-center text-xs text-[#c0392b]">{message}</p><p className="mt-4 text-center text-sm text-[#60738c]">Already have an account? <Link href="/Login" className="font-semibold text-[#1664d8] hover:text-[#0d4fac]">Log in</Link></p></AuthFrame>;
}

export function LoginScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "auth_callback") {
      const timeout = window.setTimeout(() => {
        setMessage("Social sign-in could not be completed. Check the provider setup and allowed redirect URLs, then try again.");
      }, 0);
      return () => window.clearTimeout(timeout);
    }
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!email || !password) { setMessage("Enter your email and password to continue."); return; }
    setIsSubmitting(true);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    setIsSubmitting(false);
    if (error) { setMessage(error.message); return; }
    router.push("/home-dashboard");
  }
  return <AuthFrame><div><h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1><p className="mt-2 text-sm text-[#60738c]">Sign in to pick up where you left off.</p></div><form onSubmit={submit} className="mt-7 space-y-4"><label className={labelClassName}>Email address<input name="email" required type="email" className={`${inputClassName} mt-2`} placeholder="you@example.com" autoComplete="email" /></label><label className={labelClassName}>Password<input name="password" required className={`${inputClassName} mt-2`} placeholder="Enter your password" type="password" autoComplete="current-password" /></label><Link href="/forgot-password" className="block text-right text-xs font-semibold text-[#1664d8] hover:text-[#0d4fac]">Forgot password?</Link><button disabled={isSubmitting} type="submit" className={`${primaryButtonClassName} disabled:cursor-not-allowed disabled:opacity-60`}>{isSubmitting ? "Signing in..." : "Log in"}</button></form><SocialButtons onError={setMessage} /><p role="status" className="mt-3 min-h-5 text-center text-xs text-[#c0392b]">{message}</p><p className="mt-4 text-center text-sm text-[#60738c]">Don&apos;t have an account? <Link href="/create-account" className="font-semibold text-[#1664d8] hover:text-[#0d4fac]">Sign up</Link></p></AuthFrame>;
}

export function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!email) return;
    setIsSubmitting(true);
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile-edit`,
    });
    setIsSubmitting(false);
    if (error) { setMessage(error.message); return; }
    setSent(true);
  }
  return <AuthFrame><Link href="/Login" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#1664d8] hover:text-[#0d4fac]">← Back to log in</Link><div><h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1><p className="mt-2 text-sm leading-6 text-[#60738c]">Enter the email address associated with your account and we&apos;ll send you a reset link.</p></div><form onSubmit={submit} className="mt-7"><label className={labelClassName}>Email address<input name="email" required type="email" className={`${inputClassName} mt-2`} placeholder="you@example.com" autoComplete="email" /></label><button disabled={isSubmitting} type="submit" className={`${primaryButtonClassName} mt-5 disabled:cursor-not-allowed disabled:opacity-60`}>{isSubmitting ? "Sending..." : sent ? "Reset link sent" : "Send reset link"}</button></form><p role="status" className="mt-4 rounded-lg border border-[#dbe4ef] bg-[#f5f8fc] px-3 py-3 text-xs leading-5 text-[#60738c]"><span className="mr-2 text-[#1664d8]" aria-hidden="true">ⓘ</span>{message || (sent ? "Check your inbox for the password reset link." : "If you don&apos;t receive the email within a few minutes, check your spam folder.")}</p></AuthFrame>;
}
