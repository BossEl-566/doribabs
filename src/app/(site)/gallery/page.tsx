
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowLeft,
  Images,
  Maximize2,
} from "lucide-react";

import {
  getPublicGallery,
  getPublicMediaUrl,
} from "@/lib/public-content";

import Pagination from "@/components/public/pagination";

export const metadata: Metadata = {
  title: "School Gallery | Doribabs School Complex",
  description:
    "Explore photographs of school life, academic achievements, cultural activities and events at Doribabs School Complex.",
};

type GalleryPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 12;

export default async function GalleryPage({
  searchParams,
}: GalleryPageProps) {
  await connection();

  const params = await searchParams;

  const page = Math.max(
    1,
    Math.min(1000, Number.parseInt(params.page ?? "1", 10) || 1)
  );

  const { items: images, total } = await getPublicGallery({
    page,
    pageSize: PAGE_SIZE,
  });

  return (
    <main className="min-h-screen bg-[#F8FAF8]">
      {/* Introduction */}
      <section className="bg-[#EAF5EE] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700"
          >
            <ArrowLeft size={17} />
            Home
          </Link>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-green-700">
            <Images size={16} />
            LIFE AT DORIBABS
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            Our School Gallery
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            A glimpse into the experiences, achievements,
            activities and memorable moments that make
            Doribabs School Complex special.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-9 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-950">
            School Moments
          </h2>

          <p className="text-sm text-slate-400">
            {total} photo{total === 1 ? "" : "s"}
          </p>
        </div>

        {images.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((asset) => {
                const url = getPublicMediaUrl(
                  asset.storage_path
                );

                if (!url) return null;

                return (
                  <a
                    key={asset.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full image: ${asset.alt_text}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={url}
                        alt={asset.alt_text}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute bottom-4 right-4 rounded-full bg-white/95 p-2.5 text-slate-800 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Maximize2 size={17} />
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                        {asset.alt_text}
                      </h3>

                      {asset.caption && (
                        <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">
                          {asset.caption}
                        </p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-12">
              <Pagination
                page={page}
                total={total}
                pageSize={PAGE_SIZE}
                basePath="/gallery"
              />
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-24 text-center">
            <Images
              size={44}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-6 text-xl font-bold">
              No gallery photographs available
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              School photographs will appear here after
              they have been selected for public display
              in the administration Media Library.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
