
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  Images,
  MapPin,
  Music2,
  Newspaper,
  Search,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

import {
  getPublicMediaUrl,
} from "@/lib/public-content";

import {
  getPublicEventListing,
  type PublicSchoolEvent,
  type EventView,
} from "@/lib/public-events-listing";

// ======================================================
// PAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: "School Events | Doribabs School Complex",
  description:
    "Discover upcoming and past events, school celebrations, educational activities, sports, cultural programmes and memorable occasions at Doribabs School Complex.",
  openGraph: {
    title: "Events | Doribabs School Complex",
    description:
      "Explore school events, cultural programmes, celebrations and other activities at Doribabs School Complex.",
    images: [
      {
        url: "/images/speech-and-prize-giving-ceremony1.jpg",
        alt: "Doribabs School Complex school event",
      },
    ],
  },
};

// ======================================================
// TYPES AND CONSTANTS
// ======================================================

type EventsPageProps = {
  searchParams: Promise<{
    view?: string | string[];
    page?: string | string[];
    q?: string | string[];
  }>;
};

const PAGE_SIZE = 9;

function firstParam(
  value: string | string[] | undefined
) {
  return Array.isArray(value)
    ? value[0] ?? ""
    : value ?? "";
}

function eventsUrl({
  view = "upcoming",
  page = 1,
  search = "",
}: {
  view?: EventView;
  page?: number;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (view === "past") {
    params.set("view", "past");
  }

  if (search) {
    params.set("q", search);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query
    ? `/events?${query}`
    : "/events";
}

// ======================================================
// DATE FORMATTING — GHANA LOCAL TIME
// ======================================================

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date to be confirmed";
  }

  return new Intl.DateTimeFormat("en-GH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Accra",
  }).format(date);
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GH", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Accra",
  }).format(date);
}

function formatDay(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GH", {
    day: "2-digit",
    timeZone: "Africa/Accra",
  }).format(date);
}

function formatMonth(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GH", {
    month: "short",
    timeZone: "Africa/Accra",
  }).format(date);
}

function eventImage(event: PublicSchoolEvent) {
  if (event.cover_image_path) {
    const url = getPublicMediaUrl(
      event.cover_image_path
    );

    if (url) return url;
  }

  return "/images/school-building-and-compound4.jpg";
}

function eventHref(event: PublicSchoolEvent) {
  return `/events/${encodeURIComponent(event.slug)}`;
}

// ======================================================
// FEATURED / LEAD EVENT
// ======================================================

function LeadEvent({
  event,
  view,
}: {
  event: PublicSchoolEvent;
  view: EventView;
}) {
  return (
    <article className="group grid overflow-hidden rounded-3xl bg-[#103D2C] text-white shadow-xl lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative min-h-[300px] overflow-hidden bg-green-950 sm:min-h-[420px]">
        <Image
          src={eventImage(event)}
          alt={event.title}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

        {event.is_featured && (
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#F4A43C] px-4 py-2 text-xs font-extrabold text-[#103D2C]">
            <Sparkles size={15} />
            Featured Event
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFCA75]">
          <CalendarDays size={17} />
          {view === "upcoming"
            ? "Upcoming School Event"
            : "From Our Past Events"}
        </span>

        <h3 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {event.title}
        </h3>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={20}
              className="mt-0.5 shrink-0 text-[#FFCA75]"
            />

            <p className="text-sm leading-7 text-white/85">
              {formatDate(event.starts_at)}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Clock3
              size={20}
              className="mt-0.5 shrink-0 text-[#FFCA75]"
            />

            <p className="text-sm leading-7 text-white/85">
              {formatTime(event.starts_at)}
              {event.ends_at
                ? ` – ${formatTime(event.ends_at)}`
                : ""}
              <span className="ml-2 text-xs text-white/60">
                GMT
              </span>
            </p>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-0.5 shrink-0 text-[#FFCA75]"
              />

              <p className="text-sm leading-7 text-white/85">
                {event.location}
              </p>
            </div>
          )}
        </div>

        <Link
          href={eventHref(event)}
          className="mt-10 inline-flex items-center gap-2 self-start rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#103D2C] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
        >
          View Event Details
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// EVENT CARD
// ======================================================

function SchoolEventCard({
  event,
  view,
}: {
  event: PublicSchoolEvent;
  view: EventView;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      <Link
        href={eventHref(event)}
        className="relative block aspect-[16/10] overflow-hidden bg-green-50"
        aria-label={`View ${event.title}`}
      >
        <Image
          src={eventImage(event)}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4 rounded-xl bg-white px-3 py-2 text-center shadow-lg">
          <p className="text-2xl font-black leading-none text-[#176B49]">
            {formatDay(event.starts_at)}
          </p>

          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wide text-orange-600">
            {formatMonth(event.starts_at)}
          </p>
        </div>

        {event.is_featured && (
          <span className="absolute right-4 top-4 rounded-full bg-[#F4A43C] px-3 py-2 text-[10px] font-extrabold text-[#103D2C]">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-600">
          {view === "upcoming"
            ? "Upcoming Event"
            : "Past Event"}
        </p>

        <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-slate-950 transition group-hover:text-[#176B49]">
          <Link href={eventHref(event)}>
            {event.title}
          </Link>
        </h3>

        <div className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-5">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={18}
              className="mt-0.5 shrink-0 text-[#176B49]"
            />

            <span className="text-sm leading-6 text-slate-600">
              {formatDate(event.starts_at)}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <Clock3
              size={18}
              className="mt-0.5 shrink-0 text-[#176B49]"
            />

            <span className="text-sm leading-6 text-slate-600">
              {formatTime(event.starts_at)} GMT
            </span>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#176B49]"
              />

              <span className="text-sm leading-6 text-slate-600">
                {event.location}
              </span>
            </div>
          )}
        </div>

        <Link
          href={eventHref(event)}
          className="mt-7 inline-flex items-center gap-2 self-start text-sm font-extrabold text-[#176B49] transition group-hover:gap-3"
        >
          View Event
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// PAGINATION
// ======================================================

function EventPagination({
  currentPage,
  totalPages,
  view,
  search,
}: {
  currentPage: number;
  totalPages: number;
  view: EventView;
  search: string;
}) {
  if (totalPages <= 1) return null;

  const start = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4)
  );

  const end = Math.min(
    totalPages,
    start + 4
  );

  const numbers = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

  return (
    <nav
      aria-label="Events pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={
            eventsUrl({
              view,
              search,
              page: currentPage - 1,
            }) + "#events-list"
          }
          className="inline-flex h-11 items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-green-50"
        >
          <ChevronLeft size={17} />
          Previous
        </Link>
      )}

      {numbers.map((number) => (
        <Link
          key={number}
          href={
            eventsUrl({
              view,
              search,
              page: number,
            }) + "#events-list"
          }
          aria-current={
            number === currentPage
              ? "page"
              : undefined
          }
          className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-sm font-extrabold transition ${
            number === currentPage
              ? "bg-[#176B49] text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-green-50"
          }`}
        >
          {number}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={
            eventsUrl({
              view,
              search,
              page: currentPage + 1,
            }) + "#events-list"
          }
          className="inline-flex h-11 items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-green-50"
        >
          Next
          <ChevronRight size={17} />
        </Link>
      )}
    </nav>
  );
}

// ======================================================
// SCHOOL EVENT PHOTO THEMES
// These are real school activities, not invented events.
// ======================================================

const schoolMoments = [
  {
    title: "Sports & Athletics",
    description:
      "Teamwork, competition and active participation.",
    image: "/images/6th-match.jpg",
    icon: Trophy,
  },
  {
    title: "Cultural Programmes",
    description:
      "Celebrating traditions, dance and creativity.",
    image: "/images/school-culture-dance3.jpg",
    icon: Music2,
  },
  {
    title: "Prize-Giving",
    description:
      "Recognising achievements and dedicated effort.",
    image: "/images/speech-and-prize-giving-ceremony1.jpg",
    icon: Sparkles,
  },
  {
    title: "School Celebrations",
    description:
      "Meaningful moments across the school community.",
    image: "/images/school-borad-with-some-tudent-group-pics-with-awards.jpg",
    icon: Users,
  },
  {
    title: "Learning Activities",
    description:
      "Developing skills through different experiences.",
    image: "/images/computer-lab4.jpeg",
    icon: GraduationCap,
  },
  {
    title: "Student Performances",
    description:
      "Providing opportunities for expression and talent.",
    image: "/images/random-students-acting.jpg",
    icon: Newspaper,
  },
] as const;

const galleryImages = [
  {
    src: "/images/school-culture-dance4.jpg",
    alt: "Doribabs school cultural activity",
  },
  {
    src: "/images/speech-and-prize-giving-ceremony4.jpg",
    alt: "Doribabs prize-giving ceremony",
  },
  {
    src: "/images/regimental-band3.jpg",
    alt: "Doribabs regimental band event",
  },
  {
    src: "/images/games-and-fun10.jpg",
    alt: "Doribabs school games and recreation",
  },
  {
    src: "/images/school-achievement-and-award21.jpg",
    alt: "Doribabs school achievements",
  },
  {
    src: "/images/school-church-service6.jpg",
    alt: "Doribabs school worship activity",
  },
] as const;

// ======================================================
// EVENTS PAGE
// ======================================================

export default async function EventsPage({
  searchParams,
}: EventsPageProps) {
  // Prevent current time from being evaluated at build time.
  await connection();

  const params = await searchParams;
  const now = new Date().toISOString();

  const view: EventView =
    firstParam(params.view) === "past"
      ? "past"
      : "upcoming";

  const search = firstParam(params.q)
    .trim()
    .slice(0, 100);

  const parsedPage = Number.parseInt(
    firstParam(params.page),
    10
  );

  const requestedPage =
    Number.isSafeInteger(parsedPage) &&
    parsedPage > 0
      ? Math.min(parsedPage, 100000)
      : 1;

  let result = await getPublicEventListing({
    view,
    page: requestedPage,
    pageSize: PAGE_SIZE,
    search,
    now,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(result.total / PAGE_SIZE)
  );

  if (
    result.total > 0 &&
    requestedPage > totalPages
  ) {
    result = await getPublicEventListing({
      view,
      page: totalPages,
      pageSize: PAGE_SIZE,
      search,
      now,
    });
  }

  const currentPage = result.page;
  const total = result.total;
  const events = result.items;

  // Highlight one event on the first unfiltered page.
  const showLead =
    currentPage === 1 &&
    !search &&
    events.length > 0;

  const leadEvent = showLead
    ? events[0]
    : null;

  const remainingEvents = showLead
    ? events.slice(1)
    : events;

  const firstResult =
    total > 0
      ? (currentPage - 1) * PAGE_SIZE + 1
      : 0;

  const lastResult =
    total > 0
      ? Math.min(currentPage * PAGE_SIZE, total)
      : 0;

  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: HERO
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] text-white">
        <Image
          src="/images/school-borad-with-some-tudent-group-pics4.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/85 to-[#071C12]/65" />

        <div className="relative mx-auto grid min-h-[630px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">

          <Reveal>
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs font-semibold text-white/75"
              >
                <Link
                  href="/"
                  className="hover:text-[#FFCA75]"
                >
                  Home
                </Link>

                <ChevronRight size={15} />

                <span className="text-[#FFCA75]">
                  School Events
                </span>
              </nav>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  The Doribabs Calendar
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Moments Worth
                <span className="block text-[#F4B45C]">
                  Celebrating.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                Discover upcoming school activities,
                memorable celebrations, academic
                programmes and special events
                across our Doribabs community.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#events-list"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  Explore Events
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  School Gallery
                  <Images size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Hero image collage */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl border border-white/20">
                <Image
                  src="/images/speech-and-prize-giving-ceremony4.jpg"
                  alt="Doribabs school prize-giving ceremony"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/school-culture-dance2.jpg"
                  alt="Cultural activities at Doribabs"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/games-and-fun9.jpg"
                  alt="Doribabs games and recreational activities"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: EVENT LISTING
          ================================================== */}

      <section
        id="events-list"
        className="scroll-mt-32 bg-[#F6F9F6] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <CalendarDays size={18} />
                  Our School Calendar
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  {view === "upcoming"
                    ? "Upcoming Events"
                    : "Past Events & Memories"}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600">
                  {view === "upcoming"
                    ? "Stay informed about published activities, programmes and celebrations scheduled by the school."
                    : "Look back at previously published school events and memorable occasions."}
                </p>
              </div>

              <Link
                href="/student-life"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49] transition hover:gap-3"
              >
                Explore Student Life
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          {/* Upcoming / Past tabs */}
          <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-6">
            <Link
              href={
                eventsUrl({
                  view: "upcoming",
                  search,
                }) + "#events-list"
              }
              aria-current={
                view === "upcoming"
                  ? "page"
                  : undefined
              }
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition ${
                view === "upcoming"
                  ? "bg-[#176B49] text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-green-50"
              }`}
            >
              <CalendarDays size={17} />
              Upcoming Events
            </Link>

            <Link
              href={
                eventsUrl({
                  view: "past",
                  search,
                }) + "#events-list"
              }
              aria-current={
                view === "past"
                  ? "page"
                  : undefined
              }
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition ${
                view === "past"
                  ? "bg-[#176B49] text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-green-50"
              }`}
            >
              <Clock3 size={17} />
              Past Events
            </Link>
          </div>

          {/* Server-side search */}
          <Reveal>
            <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <form
                action="/events"
                method="get"
                role="search"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="hidden"
                  name="view"
                  value={view}
                />

                <div className="relative flex-1">
                  <Search
                    size={20}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="q"
                    type="search"
                    defaultValue={search}
                    maxLength={100}
                    placeholder="Search school event titles..."
                    aria-label="Search school events"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-[#FAFCFA] py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#176B49] px-7 text-sm font-bold text-white transition hover:bg-[#105638]"
                >
                  <Search size={17} />
                  Search Events
                </button>

                {search && (
                  <Link
                    href={
                      eventsUrl({ view }) +
                      "#events-list"
                    }
                    className="inline-flex h-13 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Clear Search
                  </Link>
                )}
              </form>
            </div>
          </Reveal>

          {/* Results count */}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              {total > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-extrabold text-slate-900">
                    {firstResult}–{lastResult}
                  </span>{" "}
                  of{" "}
                  <span className="font-extrabold text-slate-900">
                    {total}
                  </span>{" "}
                  published events
                </>
              ) : (
                "No matching published events"
              )}
            </p>

            <p className="text-xs font-semibold text-slate-500">
              {view === "upcoming"
                ? "Upcoming events, with featured events prioritised"
                : "Most recently started events first"}
            </p>
          </div>

          {/* Lead event */}
          {leadEvent && (
            <div className="mt-8">
              <Reveal>
                <LeadEvent
                  event={leadEvent}
                  view={view}
                />
              </Reveal>
            </div>
          )}

          {/* Remaining events */}
          {remainingEvents.length > 0 && (
            <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {remainingEvents.map((event, index) => (
                <Reveal
                  key={event.id}
                  delay={Math.min(index * 0.05, 0.25)}
                  className="h-full"
                >
                  <SchoolEventCard
                    event={event}
                    view={view}
                  />
                </Reveal>
              ))}
            </div>
          )}

          {/* Empty states */}
          {total === 0 && (
            <Reveal>
              <div className="mt-9 rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-17 w-17 items-center justify-center rounded-2xl bg-green-50 text-[#176B49]">
                  <CalendarDays size={31} />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                  {search
                    ? "No matching events found"
                    : view === "upcoming"
                    ? "No upcoming events announced yet"
                    : "No past events published yet"}
                </h3>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-slate-500">
                  {search
                    ? "Try another event title or clear your search."
                    : view === "upcoming"
                    ? "New school activities will appear here when they are published by the administration."
                    : "Previously held school events will appear here when available."}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href={
                      eventsUrl({
                        view:
                          view === "upcoming"
                            ? "past"
                            : "upcoming",
                      }) + "#events-list"
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
                  >
                    {view === "upcoming"
                      ? "View Past Events"
                      : "View Upcoming Events"}

                    <ArrowRight size={18} />
                  </Link>

                  {search && (
                    <Link
                      href={
                        eventsUrl({ view }) +
                        "#events-list"
                      }
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700"
                    >
                      Clear Search
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* Pagination */}
          <EventPagination
            currentPage={currentPage}
            totalPages={totalPages}
            view={view}
            search={search}
          />
        </div>
      </section>

      {/* ==================================================
          SECTION 3: TYPES OF SCHOOL ACTIVITIES
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Beyond the Classroom
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Experiences That Shape Us
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                From school celebrations to creative,
                sporting and educational activities,
                Doribabs provides varied experiences
                for the development of its learners.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schoolMoments.map((moment, index) => {
              const Icon = moment.icon;

              return (
                <Reveal
                  key={moment.title}
                  delay={Math.min(index * 0.06, 0.25)}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="-mt-12 relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-[#176B49] text-white shadow-md">
                        <Icon size={22} />
                      </div>

                      <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                        {moment.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {moment.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: EVENT PHOTO WALL
          ================================================== */}

      <section className="bg-[#FFF7EE] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                  <Images size={18} />
                  Memories in Pictures
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Celebrating Doribabs
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600">
                  A photographic look at school occasions,
                  activities, achievements and memorable
                  moments across the community.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49] transition hover:gap-3"
              >
                View Full Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {galleryImages.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={Math.min(index * 0.06, 0.25)}
                className={index < 2 ? "col-span-2" : ""}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      index < 2
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: CLOSING CTA
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/school-culture-dance-dramas.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071C12]/85" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#FFCA75]">
              <Sparkles size={17} />
              Be Part of Our Community
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Every Event.
              <span className="mt-2 block text-[#F4A43C]">
                A Meaningful Memory.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Discover the activities, learning
              experiences and celebrations that make
              life at Doribabs memorable.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/student-life"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
              >
                Explore Student Life
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Contact the School
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
