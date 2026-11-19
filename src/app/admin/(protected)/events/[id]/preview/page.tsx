
import Link from "next/link";
import { notFound } from "next/navigation";
import type { JSONContent } from "@tiptap/react";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  PencilLine,
} from "lucide-react";

import { requireSchoolAdmin } from "@/lib/auth";
import { formatSchoolEventDate } from "@/lib/events";
import ArticlePreview from "@/components/admin/article-preview";

type PreviewEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PreviewEventPage({
  params,
}: PreviewEventPageProps) {
  const { id } = await params;
  const { supabase } = await requireSchoolAdmin();

  const { data: event, error } = await supabase
    .from("events")
    .select(
      "id, title, slug, description, starts_at, ends_at, location, cover_image_path, status"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load the event preview.");
  }

  if (!event) {
    notFound();
  }

  const coverUrl = event.cover_image_path
    ? supabase.storage
        .from("doribabs-media")
        .getPublicUrl(event.cover_image_path)
        .data.publicUrl
    : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <Link
          href={`/admin/events/${event.id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-semibold text-white hover:bg-[#105638]"
        >
          <PencilLine size={17} />
          Edit Event
        </Link>
      </div>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Cover image */}
        {coverUrl && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={event.title}
              className="aspect-[16/7] w-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700">
              SCHOOL EVENT
            </span>

            <span
              className={`rounded-full px-4 py-2 text-xs font-semibold capitalize ${
                event.status === "published"
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {event.status}
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            {event.title}
          </h1>

          {/* Event details */}
          <div className="mt-9 grid gap-5 rounded-2xl bg-[#F5F9F6] p-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CalendarDays
                size={20}
                className="mt-1 shrink-0 text-green-700"
              />

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Starts
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {formatSchoolEventDate(event.starts_at)}
                </p>
              </div>
            </div>

            {event.ends_at && (
              <div className="flex items-start gap-3">
                <Clock3
                  size={20}
                  className="mt-1 shrink-0 text-green-700"
                />

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Ends
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {formatSchoolEventDate(event.ends_at)}
                  </p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-1 shrink-0 text-green-700"
                />

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Location
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {event.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Read-only rich-text content */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="mb-5 text-xl font-bold text-slate-950">
              About This Event
            </h2>

            <ArticlePreview
              content={event.description as JSONContent}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
