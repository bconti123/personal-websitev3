"use client";

import { signIn } from "next-auth/react";

export default function AdminLogin() {
  async function onSubmit(formData: FormData) {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/admin",
    });
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        action={onSubmit}
        className="grid w-full max-w-md gap-5 rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">Use your admin credentials.</p>
        </div>

        <label className="grid gap-2">
          <span className="label">Email</span>
          <input className="input" name="email" type="email" placeholder="you@example.com" required />
        </label>

        <label className="grid gap-2">
          <span className="label">Password</span>
          <input className="input" name="password" type="password" placeholder="••••••••" required />
        </label>

        <button className="btn btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
