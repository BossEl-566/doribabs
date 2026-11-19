
import {
  BookOpen,
  CalendarDays,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireSchoolAdmin();

  // Fetch real dashboard counts from Supabase.
  const [postsResult, eventsResult, mediaResult] =
    await Promise.all([
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true }),

      supabase
        .from("events")
        .select("id", { count: "exact", head: true }),

      supabase
        .from("media_assets")
        .select("id", { count: "exact", head: true }),
    ]);

  const statistics = [
    {
      label: "Total Articles",
      value: postsResult.error
        ? "—"
        : (postsResult.count ?? 0),
      description: "News, achievements and notices",
      icon: BookOpen,
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      label: "School Events",
      value: eventsResult.error
        ? "—"
        : (eventsResult.count ?? 0),
      description: "Activities and upcoming events",
      icon: CalendarDays,
      iconClass: "bg-orange-50 text-orange-700",
    },
    {
      label: "Media Assets",
      value: mediaResult.error
        ? "—"
        : (mediaResult.count ?? 0),
      description: "Uploaded gallery images",
      icon: ImageIcon,
      iconClass: "bg-green-50 text-green-700",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-9">
      {/* Welcome */}
      <section>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
          <ShieldCheck size={15} />
          Administrator Access Verified
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Dashboard Overview
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Welcome back, {user.email}. Manage the content
          and digital presence of Doribabs School Complex.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`rounded-xl p-3 ${item.iconClass}`}
                >
                  <Icon size={23} />
                </div>
              </div>

              <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Welcome panel */}
      <section className="overflow-hidden rounded-2xl bg-[#176B49] p-8 text-white sm:p-10">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
            Doribabs Content Management
          </p>

          <h3 className="text-2xl font-bold sm:text-3xl">
            Your school. Your stories. One dashboard.
          </h3>

          <p className="mt-4 leading-7 text-green-50/85">
            The administration system will make it easy
            to publish school news, celebrate academic
            achievements, promote upcoming events, and
            manage the school gallery.
          </p>

          <div className="mt-7 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold">
            CMS modules coming in the next phases
          </div>
        </div>
      </section>

      {/* Security information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-slate-900">
          Administration Access
        </h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Logged-in account
            </p>

            <p className="mt-2 break-all text-sm font-semibold text-slate-800">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Access level
            </p>

            <p className="mt-2 text-sm font-semibold text-green-700">
              School Administrator
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
