
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  ShieldCheck,
  X,
} from "lucide-react";

import { logout } from "@/app/admin/actions";

type AdminShellProps = {
  children: ReactNode;
  email: string;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "News & Blog",
    href: "/admin/posts",
    icon: Newspaper,
  },
  {
    label: "School Events",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Media Library",
    href: "/admin/media",
    icon: Images,
  },
];

export default function AdminShell({
  children,
  email,
}: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activePage =
    navigation.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    )?.label ?? "Administration";

  return (
    <div className="min-h-screen bg-[#F5F7F5] text-slate-900">
      {/* Mobile navigation backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-22 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#176B49] text-xl font-extrabold text-white">
              D
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight">
                DORIBABS
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Administration Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Administration navigation"
          className="flex-1 overflow-y-auto px-4 py-7"
        >
          <p className="mb-4 px-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[#EAF5EE] text-[#176B49]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={1.9} />
                    {item.label}
                  </span>

                  {active && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </div>

          <div className="mt-9 border-t border-slate-100 pt-7">
            <p className="mb-4 px-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Website
            </p>

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <ExternalLink size={19} />
              View Website
            </Link>
          </div>
        </nav>

        {/* Account and logout */}
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
              {email.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-900">
                School Administrator
              </p>
              <p className="truncate text-xs text-slate-500">
                {email}
              </p>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={19} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main application */}
      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open administration menu"
              aria-controls="admin-sidebar"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-700 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-xs text-slate-400">
                Doribabs School Complex
              </p>
              <h1 className="mt-0.5 text-base font-bold sm:text-lg">
                {activePage}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 sm:flex">
              <ShieldCheck size={16} />
              Authorised Admin
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#176B49] font-bold text-white">
              {email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
