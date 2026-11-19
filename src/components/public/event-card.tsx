
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import {
  getPublicMediaUrl,
  type PublicEvent,
} from "@/lib/public-content";

import { formatSchoolEventDate } from "@/lib/events";

type EventCardProps = {
  event: PublicEvent;
};

export default function EventCard({
  event,
}: EventCardProps) {
  const imageUrl = getPublicMediaUrl(
    event.cover_image_path
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/events/${event.slug}`}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-orange-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-orange-600">
              <CalendarDays size={43} strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
            {formatSchoolEventDate(event.starts_at)}
          </p>

          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-slate-950 transition group-hover:text-green-700">
            {event.title}
          </h3>

          {event.location && (
            <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-500">
              <MapPin size={17} className="mt-1 shrink-0" />
              {event.location}
            </p>
          )}

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176B49]">
            Event Details
            <ArrowUpRight size={18} />
          </div>
        </div>
      </Link>
    </article>
  );
}
