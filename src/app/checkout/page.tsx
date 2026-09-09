"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type PaymentMethod = "card" | "mobile";

export default function CheckoutPage() {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = String(form.get("payment") ?? "").trim();
    if (!value) {
      setError(method === "card" ? "Enter your card details to continue." : "Enter your mobile payment number to continue.");
      return;
    }
    setError("Payment provider setup is required before a charge can be processed.");
  }

  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 text-gray-900"><section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Nexus Pro</p><h1 className="mt-2 text-2xl font-semibold">Complete checkout</h1></div><Link href="/subscription-plan" className="text-sm text-gray-500 hover:text-gray-900">Cancel</Link></div><div className="mt-6 rounded-xl bg-slate-50 p-4"><div className="flex justify-between text-sm"><span>Annual plan</span><b>$79.99</b></div><p className="mt-1 text-xs text-gray-500">Nexus Pro productivity features</p></div><div className="mt-5 grid grid-cols-2 gap-2"><button type="button" onClick={() => { setMethod("card"); setError(""); }} className={`rounded-lg border px-3 py-2 text-sm ${method === "card" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}>Card</button><button type="button" onClick={() => { setMethod("mobile"); setError(""); }} className={`rounded-lg border px-3 py-2 text-sm ${method === "mobile" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}>Mobile payment</button></div><form onSubmit={submit} className="mt-5 space-y-3"><label className="block text-sm font-medium">{method === "card" ? "Card number" : "Mobile number"}<input name="payment" inputMode={method === "card" ? "numeric" : "tel"} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600" placeholder={method === "card" ? "•••• •••• •••• ••••" : "+254 700 000 000"} /></label>{method === "card" && <div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Expiry<input name="expiry" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="MM/YY" /></label><label className="text-sm font-medium">CVC<input name="cvc" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="CVC" /></label></div>}<button type="submit" className="w-full rounded-lg bg-[#0061E0] px-4 py-3 font-semibold text-white hover:bg-[#004FBA]">Continue to payment</button></form>{error && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800" role="alert">{error}</p>}<p className="mt-5 text-xs leading-5 text-gray-500">No payment provider is configured in this project yet. No charge is made by this form.</p></section></main>;
}