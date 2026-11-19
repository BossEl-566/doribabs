
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import RichText from "@/components/public/rich-text";

import {
  getPublishedEventBySlug,
  getPublicMediaUrl,
} from "@/lib/public-content";

import { formatSchoolEventDate } from "@/lib/events";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | Doribabs School Complex",
      robots: { index: false },
    };
  }

  return {
    title: `${event.title} | Doribabs School Complex`,
    description: `Information about ${event.title} at Doribabs School Complex.`,
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  await connection();

  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);

  if (!event) notFound();

  const imageUrl = getPublicMediaUrl(
    event.cover_image_path
  );

  return (
    <main className="min-h-screen bg-[#F8FAF8] px-5 py-12 sm:px-8">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#176B49]"
        >
          <ArrowLeft size={17} />
          All School Events
        </Link>

        <div className="mt-12">
          <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700">
            SCHOOL EVENT
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            {event.title}
          </h1>
        </div>

        {imageUrl && (
          <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        )}

        {/* Event information */}
        <div className="mt-10 grid gap-5 rounded-3xl border border-green-100 bg-[#EAF5EE] p-7 sm:grid-cols-2 sm:p-9">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={22}
              className="mt-1 shrink-0 text-green-700"
            />

            <div>
              <p className="text-xs font-bold uppercase text-green-800/70">
                Event Starts
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {formatSchoolEventDate(event.starts_at)}
              </p>
            </div>
          </div>

          {event.ends_at && (
            <div className="flex items-start gap-3">
              <Clock3
                size={22}
                className="mt-1 shrink-0 text-green-700"
              />

              <div>
                <p className="text-xs font-bold uppercase text-green-800/70">
                  Event Ends
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {formatSchoolEventDate(event.ends_at)}
                </p>
              </div>
            </div>
          )}

          {event.location && (
            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin
                size={22}
                className="mt-1 shrink-0 text-green-700"
              />

              <div>
                <p className="text-xs font-bold uppercase text-green-800/70">
                  Venue
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {event.location}
                </p>
              </div>
            </div>
          )}
        </div>

        <section className="mt-10 rounded-3xl border border-slate-100 bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
          <h2 className="mb-7 text-2xl font-extrabold text-slate-950">
            About This Event
          </h2>

          <RichText content={event.description} />
        </section>

        <div className="mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-bold text-[#176B49] hover:underline"
          >
            <ArrowLeft size={18} />
            Back to School Events
          </Link>
        </div>
      </article>
    </main>
  );
}
