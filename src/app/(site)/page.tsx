
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  Images,
  MapPin,
  Newspaper,
  School,
  Sparkles,
} from "lucide-react";

import HeroCarousel from "@/components/public/hero-carousel";
import Reveal from "@/components/animation/Reveal";

import PostCard from "@/components/public/post-card";
import EventCard from "@/components/public/event-card";

import {
  getPublishedPosts,
  getPublishedEvents,
  getPublicGallery,
  getPublicMediaUrl,
} from "@/lib/public-content";

// ======================================================
// PAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: "Doribabs School Complex | Seeing Is Believing!",
  description:
    "Discover Doribabs School Complex, providing quality, affordable and holistic education from Creche through Junior High School in Ghana.",
};

// ======================================================
// SCHOOL HIGHLIGHTS
// ======================================================

const schoolHighlights = [
  {
    icon: School,
    value: "2009",
    label: "Year Established",
  },
  {
    icon: GraduationCap,
    value: "Creche – JHS",
    label: "Educational Levels",
  },
  {
    icon: HeartHandshake,
    value: "Day & Boarding",
    label: "Learning Options",
  },
];

// ======================================================
// ACADEMIC PROGRAMMES
// ======================================================

const programmes = [
  {
    title: "Early Childhood",
    levels: "Creche, Nursery & Kindergarten",
    description:
      "Building confidence, curiosity and early learning skills through a nurturing foundation.",
    icon: BookOpen,
    color: "bg-[#FFF3E3]",
    iconColor: "text-[#D87922]",
  },
  {
    title: "Primary School",
    levels: "Primary Education",
    description:
      "Developing literacy, numeracy, creativity and positive learning habits for continued growth.",
    icon: BookOpen,
    color: "bg-[#EAF5EE]",
    iconColor: "text-[#176B49]",
  },
  {
    title: "Junior High School",
    levels: "JHS Education",
    description:
      "Strengthening academic knowledge, responsibility and readiness for the next stage of education.",
    icon: GraduationCap,
    color: "bg-[#FFF0EA]",
    iconColor: "text-[#D97757]",
  },
];

// ======================================================
// HOMEPAGE
// ======================================================

export default async function HomePage() {
  // Ensure content and event dates are evaluated at
  // request time rather than during static prerendering.
  await connection();

  const now = new Date().toISOString();

  // Fetch published CMS content concurrently.
  const [postsResult, eventsResult, galleryResult] =
    await Promise.all([
      getPublishedPosts({
        pageSize: 3,
        featuredFirst: true,
      }),

      getPublishedEvents({
        pageSize: 3,
        mode: "upcoming",
        now,
        featuredFirst: true,
      }),

      getPublicGallery({
        pageSize: 6,
      }),
    ]);

  const latestPosts = postsResult.items;
  const upcomingEvents = eventsResult.items;
  const galleryImages = galleryResult.items;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: ANIMATED HERO CAROUSEL
          ================================================== */}

      <HeroCarousel />

      {/* ==================================================
          SECTION 2: SCHOOL HIGHLIGHTS
          ================================================== */}

      <section className="relative z-10 border-b border-slate-100 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3 sm:divide-x sm:divide-slate-100">
          {schoolHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.label}
                delay={index * 0.08}
                className="flex items-center gap-4 sm:justify-center sm:px-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49]">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-lg font-extrabold text-[#143D2C]">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 3: WELCOME TO DORIBABS
          ================================================== */}

      <section className="overflow-hidden bg-[#FAFCFA] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* School photograph */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[5/5.3] overflow-hidden rounded-[2rem] bg-green-100 sm:aspect-[5/4.8]">
                <Image
                  src="/images/school-building-and-compound1.jpg"
                  alt="Doribabs School Complex school environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Floating statement */}
              <div className="absolute -bottom-5 right-3 max-w-[230px] rounded-2xl bg-[#176B49] p-5 text-white shadow-xl sm:-right-4 sm:max-w-[270px] sm:p-7">
                <p className="text-2xl font-black leading-tight sm:text-3xl">
                  Since 2009
                </p>

                <p className="mt-2 text-xs leading-6 text-white/85 sm:text-sm">
                  Nurturing learners through quality education
                  and character development.
                </p>
              </div>
            </div>
          </Reveal>

          {/* School introduction */}
          <Reveal delay={0.1}>
            <div className="pt-8 lg:pt-0">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#D87922]">
                <span className="h-0.5 w-8 bg-[#E99E48]" />
                Discover Our School
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Welcome to
                <span className="block text-[#176B49]">
                  Doribabs School Complex
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600">
                Doribabs School Complex is an educational
                institution dedicated to helping children
                develop academically, socially and morally.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Founded in 2009 by Madam Doris Baaba Simpson,
                the school provides a supportive learning
                environment from Creche through Junior High
                School, with a commitment to discipline,
                academic excellence and holistic development.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-green-100 p-3 text-[#176B49]">
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Quality Education
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Learning that supports academic
                      and personal growth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-100 p-3 text-orange-700">
                    <HeartHandshake size={22} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Character Development
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Encouraging responsibility,
                      confidence and discipline.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#105638] hover:shadow-lg"
              >
                Learn More About Us
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: ACADEMIC PROGRAMMES
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <BookOpen size={17} />
                Learning at Doribabs
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Our Academic Programmes
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                We support learners at every stage,
                building strong educational foundations
                and preparing them for future opportunities.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {programmes.map((programme, index) => {
              const Icon = programme.icon;

              return (
                <Reveal
                  key={programme.title}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <div className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-8">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${programme.color} ${programme.iconColor}`}
                    >
                      <Icon size={29} strokeWidth={1.7} />
                    </div>

                    <p className="mt-7 text-xs font-bold uppercase tracking-wide text-orange-600">
                      {programme.levels}
                    </p>

                    <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
                      {programme.title}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-8 text-slate-500">
                      {programme.description}
                    </p>

                    <Link
                      href="/academics"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition group-hover:gap-3"
                    >
                      Explore Programme
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: LATEST SCHOOL NEWS
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <Newspaper size={17} />
                  Stay Informed
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Latest News & Stories
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-500">
                  Discover school announcements,
                  academic achievements and the
                  latest stories from our community.
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition hover:gap-3"
              >
                View All News
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          {latestPosts.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <Reveal
                  key={post.id}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <Newspaper
                  size={38}
                  className="mx-auto text-green-700"
                />

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  School stories will appear here
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  Visit again for the latest published
                  news from Doribabs School Complex.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 6: UPCOMING EVENTS
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <CalendarDays size={17} />
                  School Calendar
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Upcoming Events
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-500">
                  Stay connected with school programmes,
                  important activities and celebrations
                  throughout the academic year.
                </p>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition hover:gap-3"
              >
                Explore Events
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event, index) => (
                <Reveal
                  key={event.id}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-[#F8FAF8] px-6 py-16 text-center">
                <CalendarDays
                  size={38}
                  className="mx-auto text-orange-500"
                />

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No upcoming events announced yet
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  Future school programmes will appear
                  here when they are published.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 7: SCHOOL GALLERY
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <Images size={17} />
                  Life at Doribabs
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Moments That Matter
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-500">
                  Discover memorable experiences,
                  achievements and everyday moments
                  from our school community.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition hover:gap-3"
              >
                View Full Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {galleryImages.map((asset, index) => {
                const url = getPublicMediaUrl(
                  asset.storage_path
                );

                if (!url) return null;

                return (
                  <Reveal
                    key={asset.id}
                    delay={Math.min(index * 0.06, 0.3)}
                  >
                    <Link
                      href="/gallery"
                      className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 sm:rounded-2xl"
                    >
                      <Image
                        src={url}
                        alt={asset.alt_text}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

                      <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <p className="line-clamp-2 text-xs font-semibold text-white sm:text-sm">
                          {asset.alt_text}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <Images
                  size={38}
                  className="mx-auto text-green-700"
                />

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Our gallery is being prepared
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  Published school photographs will
                  appear here.
                </p>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-10 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-4 text-sm font-bold text-[#176B49] transition duration-300 hover:bg-[#176B49] hover:text-white"
              >
                Explore Our Gallery
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: ADMISSIONS CALL TO ACTION
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#F4A43C]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#FFCB72]">
              <GraduationCap size={17} />
              Join the Doribabs Family
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Give Your Child a
              <span className="block text-[#F4A43C]">
                Strong Foundation.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Discover a supportive learning environment
              committed to nurturing academic excellence,
              confidence, discipline and positive character
              development.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#143D2C] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
              >
                Explore Admissions
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:bg-white/20"
              >
                Contact Our School
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-white/65">
              <MapPin size={16} />
              Moree Toll Booth, Accra–Takoradi Highway, Ghana
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
