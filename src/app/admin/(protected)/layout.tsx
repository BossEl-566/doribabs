
import type { ReactNode } from "react";
import Link from "next/link";

import {
  BookOpen,
  CalendarDays,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";
import { logout } from "../actions";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  // This guards the entire protected route group.
  const { user } = await requireSchoolAdmin();

  return (
    <div className="min-h-screen bg-[#F6F8F6] text-slate-900 lg:flex">
      {/* Sidebar */}
      <aside className="hidden w-68 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        {/* Brand */}
        <div className="border-b border-slate-100 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#176B49] text-xl font-bold text-white">
              D
            </div>

            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                DORIBABS
              </h2>

              <p className="text-xs font-medium text-slate-500">
                School Administration
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-8">
          <p className="px-4 pb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Overview
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-[#176B49]"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <p className="px-4 pb-3 pt-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Content Management
          </p>

          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-400">
              <span className="flex items-center gap-3">
                <BookOpen size={19} />
                News & Blog
              </span>
              <span className="text-[10px]">Soon</span>
            </div>

            <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-400">
              <span className="flex items-center gap-3">
                <CalendarDays size={19} />
                Events
              </span>
              <span className="text-[10px]">Soon</span>
            </div>

            <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-400">
              <span className="flex items-center gap-3">
                <ImageIcon size={19} />
                Media Library
              </span>
              <span className="text-[10px]">Soon</span>
            </div>
          </div>
        </nav>

        {/* Current administrator */}
        <div className="border-t border-slate-100 p-5">
          <div className="mb-4 rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-green-700">
              <ShieldCheck size={16} />
              Verified Administrator
            </div>

            <p className="break-all text-xs text-slate-600">
              {user.email}
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main application */}
      <div className="min-w-0 flex-1">
        {/* Top navigation */}
        <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Doribabs School Complex
            </p>

            <h1 className="mt-1 text-lg font-bold">
              Administration Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 sm:inline-flex">
              Administrator
            </span>

            {/* Mobile logout */}
            <form action={logout} className="lg:hidden">
              <button
                type="submit"
                aria-label="Sign out"
                className="rounded-lg border border-slate-200 p-2 text-red-600"
              >
                <LogOut size={19} />
              </button>
            </form>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
              {user.email?.charAt(0).toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        {/* Protected content */}
        <main className="px-5 py-8 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
