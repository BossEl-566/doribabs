
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Images,
  Newspaper,
  PencilLine,
  Plus,
  ShieldCheck,
} from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "medium",
    timeZone: "Africa/Accra",
  }).format(new Date(value));
}

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Accra",
  }).format(new Date(value));
}

function StatusBadge({ status }: { status: string }) {
  const published = status === "published";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${
        published
          ? "bg-green-50 text-green-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireSchoolAdmin();
  const now = new Date().toISOString();

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    upcomingEvents,
    totalMedia,
    recentPosts,
    nextEvents,
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),

    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),

    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("status", "published")
      .gte("starts_at", now),

    supabase
      .from("media_assets")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("posts")
      .select("id, title, category, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("events")
      .select("id, title, location, starts_at")
      .eq("status", "published")
      .gte("starts_at", now)
      .order("starts_at", { ascending: true })
      .limit(4),
  ]);

  const hasErrors = [
    totalPosts,
    publishedPosts,
    draftPosts,
    upcomingEvents,
    totalMedia,
    recentPosts,
    nextEvents,
  ].some((result) => result.error);

  const stats = [
    {
      title: "Total Articles",
      value: totalPosts.error ? "—" : totalPosts.count ?? 0,
      icon: Newspaper,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      title: "Published",
      value: publishedPosts.error ? "—" : publishedPosts.count ?? 0,
      icon: FileText,
      bg: "bg-green-50",
      color: "text-green-700",
    },
    {
      title: "Draft Articles",
      value: draftPosts.error ? "—" : draftPosts.count ?? 0,
      icon: PencilLine,
      bg: "bg-amber-50",
      color: "text-amber-700",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.error ? "—" : upcomingEvents.count ?? 0,
      icon: CalendarDays,
      bg: "bg-purple-50",
      color: "text-purple-700",
    },
    {
      title: "Media Files",
      value: totalMedia.error ? "—" : totalMedia.count ?? 0,
      icon: Images,
      bg: "bg-orange-50",
      color: "text-orange-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard heading */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            <ShieldCheck size={15} />
            Content Management System
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Dashboard Overview
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Welcome back, {user.email}. Here is an overview
            of your school website content.
          </p>
        </div>

        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#105638]"
        >
          <Newspaper size={18} />
          Manage Articles
        </Link>
      </div>

      {hasErrors && (
        <div
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          Some CMS data could not be loaded. Check the
          Supabase connection and database policies.
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </div>
              </div>

              <p className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950">
                {stat.value}
              </p>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {stat.title}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main content */}
      <div className="grid items-start gap-6 xl:grid-cols-5">
        {/* Recent articles */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-6">
            <div>
              <h3 className="text-lg font-bold">
                Recent Articles
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Latest news, achievements and notices
              </p>
            </div>

            <Link
              href="/admin/posts"
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#176B49] hover:underline"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          {recentPosts.error ? (
            <p className="p-8 text-sm text-red-600">
              Unable to retrieve articles.
            </p>
          ) : recentPosts.data?.length ? (
            <div className="divide-y divide-slate-100">
              {recentPosts.data.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      {post.title}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="capitalize">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>

                  <StatusBadge status={post.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-14 text-center">
              <div className="mb-4 rounded-2xl bg-slate-100 p-4 text-slate-400">
                <Newspaper size={26} />
              </div>

              <p className="font-semibold text-slate-800">
                No articles yet
              </p>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Articles will appear here once you start
                creating school news and blog content.
              </p>
            </div>
          )}
        </section>

        {/* Upcoming events */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-6">
            <div>
              <h3 className="text-lg font-bold">
                Upcoming Events
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Published school activities
              </p>
            </div>

            <Link
              href="/admin/events"
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#176B49] hover:underline"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          {nextEvents.error ? (
            <p className="p-8 text-sm text-red-600">
              Unable to retrieve events.
            </p>
          ) : nextEvents.data?.length ? (
            <div className="divide-y divide-slate-100">
              {nextEvents.data.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4 px-6 py-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <CalendarDays size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {event.title}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {formatEventDate(event.starts_at)}
                    </p>

                    {event.location && (
                      <p className="mt-1 text-xs text-slate-400">
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-14 text-center">
              <div className="mb-4 rounded-2xl bg-orange-50 p-4 text-orange-500">
                <CalendarDays size={26} />
              </div>

              <p className="font-semibold text-slate-800">
                No upcoming events
              </p>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Published future school events will be
                displayed here automatically.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* CMS Modules */}
      <section className="rounded-2xl bg-[#176B49] p-7 text-white sm:p-9">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            Doribabs Digital Campus
          </p>

          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
            Manage the school&apos;s digital presence
          </h3>

          <p className="mt-4 text-sm leading-7 text-green-50/85">
            Organise school news, achievements, events,
            and galleries from one secure administration portal.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#176B49] transition hover:bg-green-50"
          >
            <Plus size={18} />
            Articles
          </Link>

          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <CalendarDays size={18} />
            Events
          </Link>

          <Link
            href="/admin/media"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Images size={18} />
            Media
          </Link>
        </div>
      </section>
    </div>
  );
}
