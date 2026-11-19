
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { ArrowLeft, CalendarDays } from "lucide-react";

import EventCard from "@/components/public/event-card";
import Pagination from "@/components/public/pagination";

import { getPublishedEvents } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "School Events | Doribabs School Complex",
  description:
    "Discover upcoming school programmes, celebrations, academic events and activities at Doribabs School Complex.",
};

type EventsPageProps = {
  searchParams: Promise<{
    view?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 9;

export default async function EventsPage({
  searchParams,
}: EventsPageProps) {
  // Events depend on the current date and time.
  await connection();

  const params = await searchParams;

  const mode =
    params.view === "past" ? "past" : "upcoming";

  const page = Math.max(
    1,
    Math.min(1000, Number.parseInt(params.page ?? "1", 10) || 1)
  );

  const { items: events, total } =
    await getPublishedEvents({
      mode,
      page,
      pageSize: PAGE_SIZE,
      now: new Date().toISOString(),
    });

  return (
    <main className="min-h-screen bg-[#F8FAF8]">
      <section className="bg-[#FFF0DF] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-800"
          >
            <ArrowLeft size={17} />
            Home
          </Link>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-orange-700">
            <CalendarDays size={16} />
            SCHOOL CALENDAR
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            Events & Activities
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Explore our school programmes, educational
            activities, ceremonies and celebrations that
            bring the Doribabs community together.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <Link
              href="/events"
              className={`rounded-full px-5 py-2.5 text-sm font-bold ${
                mode === "upcoming"
                  ? "bg-[#176B49] text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              Upcoming
            </Link>

            <Link
              href="/events?view=past"
              className={`rounded-full px-5 py-2.5 text-sm font-bold ${
                mode === "past"
                  ? "bg-[#176B49] text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              Started / Past
            </Link>
          </div>

          <p className="text-sm text-slate-400">
            {total} event{total === 1 ? "" : "s"}
          </p>
        </div>

        {events.length > 0 ? (
          <>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </div>

            <div className="mt-12">
              <Pagination
                page={page}
                total={total}
                pageSize={PAGE_SIZE}
                basePath="/events"
                query={
                  mode === "past"
                    ? { view: "past" }
                    : {}
                }
              />
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-24 text-center">
            <CalendarDays
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-6 text-xl font-bold">
              No {mode === "past" ? "previous" : "upcoming"} events
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              Published school events will appear here
              when they are available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
