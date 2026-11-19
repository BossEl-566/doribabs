
"use client";

import { useActionState, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { login, type LoginState } from "../actions";

const initialState: LoginState = {
  error: null,
};

type LoginFormProps = {
  accessDenied?: boolean;
};

export default function LoginForm({
  accessDenied = false,
}: LoginFormProps) {
  const [state, formAction, isPending] =
    useActionState(login, initialState);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Security label */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-800">
        <ShieldCheck size={15} />
        SECURE SCHOOL ADMINISTRATION
      </div>

      {/* Heading */}
      <div className="mb-9">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Welcome back<span className="text-orange-500">.</span>
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          Sign in to manage Doribabs School Complex news,
          events, galleries, and website content.
        </p>
      </div>

      {/* Login errors */}
      {(state.error || accessDenied) && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {state.error ??
            "Your account does not have administrator access."}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              placeholder="admin@doribabsschool.com"
              className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
            />

            <button
              type="button"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#176B49] px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#105638] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in to dashboard"}

          {!isPending && <ArrowRight size={19} />}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <p className="text-center text-sm leading-6 text-slate-500">
          This portal is restricted to authorised
          Doribabs School Complex personnel.
        </p>
      </div>
    </div>
  );
}
