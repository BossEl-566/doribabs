
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronRight,
  GraduationCap,
  Images,
  School,
  Sparkles,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";
import GalleryExplorer from "@/components/public/gallery-explorer";

import schoolGallery from "@/data/school-gallery.generated.json";

import type {
  GalleryPhoto,
} from "@/lib/gallery-types";

import {
  getPublicGallery,
  getPublicMediaUrl,
} from "@/lib/public-content";

// ======================================================
// METADATA
// ======================================================

export const metadata: Metadata = {
  title: "Photo Gallery | Doribabs School Complex",
  description:
    "Explore photographs of Doribabs School Complex, including academic activities, sports, cultural events, cadets, regimental band, student life, school facilities and achievements.",
  openGraph: {
    title: "Photo Gallery | Doribabs School Complex",
    description:
      "Discover life at Doribabs through school photographs, memorable moments and achievements.",
    images: [
      {
        url: "/images/sky-shot-of-school-prepater-and-student.jpg",
        alt: "Doribabs School Complex",
      },
    ],
  },
};

// ======================================================
// PAGE
// ======================================================

export default async function GalleryPage() {
  // Keep the Supabase gallery content current.
  await connection();

  // Automatically generated local school images.
  const localPhotos: GalleryPhoto[] =
    schoolGallery as GalleryPhoto[];

  // Supplement the local gallery with publicly
  // published photographs from the existing CMS.
  // A CMS problem must not prevent local photos
  // from loading.
  let cmsPhotos: GalleryPhoto[] = [];

  try {
    const result = await getPublicGallery({
      pageSize: 100,
    });

    cmsPhotos = result.items.flatMap((asset) => {
      const src = getPublicMediaUrl(
        asset.storage_path
      );

      if (!src) {
        return [];
      }

      const title =
        asset.alt_text?.trim() ||
        "School Gallery Photograph";

      return [
        {
          id: `cms:${asset.id}`,
          src,
          title,
          alt: title,
          category: "CMS Gallery",
        },
      ];
    });
  } catch (error) {
    console.error(
      "Unable to load CMS gallery:",
      error
    );
  }

  // Published CMS photos appear first.
  // All local images are still included.
  const photos: GalleryPhoto[] = [
    ...cmsPhotos,
    ...localPhotos,
  ];

  const categoryCount = new Set(
    photos.map((photo) => photo.category)
  ).size;

  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: GALLERY HERO
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] text-white">
        <Image
          src="/images/sky-shot-of-school-prepater-and-student.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/90 to-[#071C12]/65" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Hero introduction */}
          <Reveal>
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/75"
              >
                <Link
                  href="/"
                  className="transition hover:text-[#FFCA75]"
                >
                  Home
                </Link>

                <ChevronRight size={15} />

                <span className="text-[#FFCA75]">
                  Gallery
                </span>
              </nav>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  The Doribabs Collection
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Our School.
                <span className="block text-[#F4B45C]">
                  Our Moments.
                </span>
                Our Story.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                Take a photographic journey through
                life at Doribabs School Complex.
                Discover learning, activities,
                friendships, culture and memorable
                achievements.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#photo-gallery"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  Explore Photographs
                  <Camera size={18} />
                </Link>

                <Link
                  href="/student-life"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Explore Student Life
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              <p className="mt-9 text-sm font-semibold italic text-[#FFCA75]">
                Doribabs... Seeing Is Believing!
              </p>
            </div>
          </Reveal>

          {/* Hero photography */}
          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl border border-white/20 bg-white/10">
                <Image
                  src="/images/random-students-picture1.jpg"
                  alt="Doribabs School Complex learners"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/school-culture-dance3.jpg"
                  alt="Cultural activities at Doribabs"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/school-achievement-and-award4.jpg"
                  alt="Doribabs school achievements"
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
          SECTION 2: GALLERY INTRODUCTION
          ================================================== */}

      <section className="border-b border-slate-100 bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3 md:divide-x md:divide-slate-100">
          {[
            {
              icon: Images,
              value: String(photos.length),
              label: "Photographs Available",
            },
            {
              icon: Camera,
              value: String(categoryCount),
              label: "Photo Collections",
            },
            {
              icon: School,
              value: "Doribabs",
              label: "Our School Community",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.label}
                delay={index * 0.08}
                className="flex items-center gap-4 md:px-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49]">
                  <Icon size={25} />
                </div>

                <div>
                  <p className="text-xl font-extrabold text-slate-950">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 3: FEATURED SCHOOL MOMENTS
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                A Glimpse of School Life
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Moments That Matter
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Our school photographs reflect
                different experiences in the
                Doribabs community, from academic
                activities and cultural performances
                to school celebrations and achievements.
              </p>
            </div>
          </Reveal>

          {/* Curated, large-format photo grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {[
              {
                src: "/images/computer-lab4.jpeg",
                alt: "Learning in the Doribabs computer laboratory",
                title: "Academic Life",
                span: "lg:col-span-7",
              },
              {
                src: "/images/school-culture-dance4.jpg",
                alt: "Cultural performance at Doribabs",
                title: "Culture & Creativity",
                span: "lg:col-span-5",
              },
              {
                src: "/images/regimental-band3.jpg",
                alt: "Doribabs regimental band",
                title: "Music & School Spirit",
                span: "lg:col-span-4",
              },
              {
                src: "/images/games-and-fun7.jpg",
                alt: "Doribabs games and recreation",
                title: "Sports & Recreation",
                span: "lg:col-span-4",
              },
              {
                src: "/images/school-achievement-and-award21.jpg",
                alt: "School achievements at Doribabs",
                title: "Celebrating Excellence",
                span: "lg:col-span-4",
              },
            ].map((item, index) => (
              <Reveal
                key={item.src}
                delay={Math.min(index * 0.06, 0.24)}
                className={item.span}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <p className="absolute bottom-5 left-5 right-5 text-base font-extrabold text-white sm:text-lg">
                    {item.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: INTERACTIVE GALLERY
          ================================================== */}

      <GalleryExplorer photos={photos} />

      {/* ==================================================
          SECTION 5: GALLERY CTA
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/school-borad-with-some-tudent-and-teachers-group-pics.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071C12]/85" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#FFCA75]">
              <GraduationCap size={17} />
              Discover Our School
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Pictures Tell Stories.
              <span className="mt-2 block text-[#F4A43C]">
                Come Experience Doribabs.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Explore our academic programmes,
              admission information and the
              school community behind these
              memorable photographs.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#123B29] transition hover:bg-[#FFCA75]"
              >
                Explore Admissions
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Contact Our School
                <ArrowRight size={18} />
              </Link>
            </div>

            <p className="mt-10 text-sm font-semibold italic text-[#FFCA75]">
              Doribabs... Seeing Is Believing!
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
