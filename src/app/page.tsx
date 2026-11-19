
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Images,
  Newspaper,
  School,
} from "lucide-react";

import PostCard from "@/components/public/post-card";
import EventCard from "@/components/public/event-card";

import {
  getPublishedPosts,
  getPublishedEvents,
  getPublicGallery,
  getPublicMediaUrl,
} from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Doribabs School Complex | Seeing Is Believing!",
  description:
    "Doribabs School Complex provides quality, affordable and holistic education from Creche through Junior High School in Ghana.",
};

export default async function HomePage() {
  await connection();

  const now = new Date().toISOString();

  // Retrieve the most recent CMS content.
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
    <main className="min-h-screen bg-white">
      {/* ========================================
          TEMPORARY HOMEPAGE INTRODUCTION
          ======================================== */}
      <section className="overflow-hidden bg-[#F4F9F5]">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#176B49]">
              <School size={16} />
              Established 2009
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
              Inspiring Excellence.
              <br />
              <span className="text-[#176B49]">
                Nurturing Future Leaders.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600">
              At Doribabs School Complex, we are committed
              to quality, affordable and holistic education
              rooted in discipline, Christian values and
              academic excellence.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                Explore School News
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-4 text-sm font-bold text-green-800 transition hover:bg-green-50"
              >
                School Events
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 border-t border-green-200 pt-7">
              <div>
                <p className="text-xl font-extrabold text-green-800">
                  2009
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Year Established
                </p>
              </div>

              <div>
                <p className="text-xl font-extrabold text-green-800">
                  Creche–JHS
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Educational Levels
                </p>
              </div>

              <div>
                <p className="text-xl font-extrabold text-green-800">
                  Day & Boarding
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  School Options
                </p>
              </div>
            </div>
          </div>

          {/* Existing school photograph */}
          <div className="relative">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] bg-green-100 shadow-xl">
              <Image
                src="/images/random-students-picture1.jpg"
                alt="Learners of Doribabs School Complex"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-[#176B49] p-5 text-center text-base font-bold text-white shadow-xl sm:left-auto sm:right-[-12px] sm:max-w-xs">
              Doribabs... Seeing Is Believing!
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          LATEST SCHOOL NEWS
          ======================================== */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.17em] text-orange-600">
                <Newspaper size={17} />
                Stay Informed
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Latest News & Stories
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                Discover our latest announcements, school
                achievements and stories from the
                Doribabs community.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
            >
              View All News
              <ArrowRight size={18} />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <BookOpen
                size={36}
                className="mx-auto text-green-700"
              />
              <p className="mt-4 font-semibold text-slate-800">
                School stories will appear here.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Visit again for our latest published news.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          UPCOMING EVENTS
          ======================================== */}
      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.17em] text-orange-600">
                <CalendarDays size={17} />
                School Calendar
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Upcoming Events
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                Keep track of important activities,
                programmes and celebrations across
                our school community.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
              <CalendarDays
                size={36}
                className="mx-auto text-orange-500"
              />
              <p className="mt-4 font-semibold text-slate-800">
                No upcoming events announced yet.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Upcoming school activities will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          SCHOOL GALLERY
          ======================================== */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.17em] text-orange-600">
                <Images size={17} />
                Life at Doribabs
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Moments That Matter
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                Explore memorable school experiences
                through our growing collection of photographs.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
            >
              View Full Gallery
              <ArrowRight size={18} />
            </Link>
          </div>

          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {galleryImages.map((asset) => {
                const url = getPublicMediaUrl(
                  asset.storage_path
                );

                if (!url) return null;

                return (
                  <Link
                    key={asset.id}
                    href="/gallery"
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 sm:rounded-2xl"
                  >
                    <Image
                      src={url}
                      alt={asset.alt_text}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition group-hover:opacity-100" />

                    <p className="absolute inset-x-4 bottom-4 line-clamp-2 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 sm:text-sm">
                      {asset.alt_text}
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <Images
                size={36}
                className="mx-auto text-green-700"
              />
              <p className="mt-4 font-semibold text-slate-800">
                Our gallery is being prepared.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Temporary closing CTA */}
      <section className="bg-[#176B49] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Doribabs... Seeing Is Believing!
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">
            Dedicated to developing confident,
            disciplined and responsible learners
            through quality holistic education.
          </p>
        </div>
      </section>
    </main>
  );
}
