
import Link from "next/link";

import {
  CalendarDays,
  Clock3,
  Eye,
  MapPin,
  PencilLine,
  Plus,
  Star,
} from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";
import { formatSchoolEventDate } from "@/lib/events";

import DeleteEventButton from
  "@/components/admin/delete-event-button";

type EventsPageProps = {
  searchParams: Promise<{
    filter?: string;
  }>;
};

export default async function AdminEventsPage({
  searchParams,
}: EventsPageProps) {
  const { supabase } = await requireSchoolAdmin();
  const { filter: requestedFilter } = await searchParams;

  const allowedFilters = [
    "all",
    "upcoming",
    "past",
    "draft",
  ] as const;

  const filter = allowedFilters.some(
    (value) => value === requestedFilter
  )
    ? requestedFilter!
    : "all";

  const now = new Date().toISOString();

  let query = supabase
    .from("events")
    .select(
      "id, title, slug, location, starts_at, ends_at, status, is_featured, cover_image_path"
    )
    .order("starts_at", {
      ascending: filter === "upcoming",
    })
    .limit(50);

  // Apply selected filter.
  if (filter === "upcoming") {
    query = query
      .eq("status", "published")
      .gte("starts_at", now);
  } else if (filter === "past") {
    query = query
      .eq("status", "published")
      .lt("starts_at", now);
  } else if (filter === "draft") {
    query = query.eq("status", "draft");
  }

  const { data: events, error } = await query;

  const filters = [
    { label: "All Events", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Started / Past", value: "past" },
    { label: "Drafts", value: "draft" },
  ];

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            School Events
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Plan, publish, and manage Doribabs School
            Complex events and activities.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#105638]"
        >
          <Plus size={19} />
          Create Event
        </Link>
      </div>

      {/* Main directory */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <Link
                key={item.value}
                href={
                  item.value === "all"
                    ? "/admin/events"
                    : `/admin/events?filter=${item.value}`
                }
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  filter === item.value
                    ? "bg-[#176B49] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            {error ? "Unavailable" : `${events?.length ?? 0} shown`}
          </span>
        </div>

        {/* Results */}
        {error ? (
          <div
            role="alert"
            className="p-8 text-sm text-red-600"
          >
            Unable to retrieve school events. Check your
            Supabase database connection.
          </div>
        ) : events?.length ? (
          <div className="divide-y divide-slate-100">
            {events.map((event) => {
              const isPast =
                new Date(event.starts_at).getTime() <
                new Date(now).getTime();

              const coverUrl = event.cover_image_path
                ? supabase.storage
                    .from("doribabs-media")
                    .getPublicUrl(event.cover_image_path)
                    .data.publicUrl
                : null;

              return (
                <div
                  key={event.id}
                  className="flex flex-col gap-5 p-5 transition hover:bg-slate-50/60 sm:flex-row sm:items-center sm:p-6"
                >
                  {/* Image */}
                  <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl bg-green-50 sm:h-24 sm:w-36">
                    {coverUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={coverUrl}
                        alt={event.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-green-700">
                        <CalendarDays size={32} />
                      </div>
                    )}
                  </div>

                  {/* Event information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {event.title}
                      </h3>

                      {event.is_featured && (
                        <Star
                          size={16}
                          className="fill-orange-400 text-orange-400"
                        />
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {formatSchoolEventDate(event.starts_at)}
                      </span>

                      {event.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          event.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {event.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>

                      {event.status === "published" && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                          {isPast
                            ? "Started / Past"
                            : "Upcoming"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-1 sm:justify-end">
                    <Link
                      href={`/admin/events/${event.id}/preview`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      <Eye size={15} />
                      Preview
                    </Link>

                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-50"
                    >
                      <PencilLine size={15} />
                      Edit
                    </Link>

                    <DeleteEventButton
                      id={event.id}
                      title={event.title}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <div className="mb-5 rounded-2xl bg-orange-50 p-5 text-orange-600">
              <CalendarDays size={36} />
            </div>

            <h3 className="text-lg font-bold">
              No events found
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              Create school programmes, celebrations,
              academic events, and extracurricular activities
              to keep parents and learners informed.
            </p>

            <Link
              href="/admin/events/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white hover:bg-[#105638]"
            >
              <Plus size={18} />
              Create First Event
            </Link>
          </div>
        )}
      </section>

      <p className="text-xs text-slate-400">
        Showing up to 50 matching events. Upcoming events
        are sorted earliest first; all other views show
        events with the latest start dates first.
      </p>
    </div>
  );
}
