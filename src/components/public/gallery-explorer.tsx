
"use client";

import Image from "next/image";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  Search,
  X,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

import {
  GALLERY_CATEGORY_ORDER,
  type GalleryPhoto,
} from "@/lib/gallery-types";

// ======================================================
// TYPES & CONSTANTS
// ======================================================

type GalleryExplorerProps = {
  photos: GalleryPhoto[];
};

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 24;

// ======================================================
// GALLERY EXPLORER
// ======================================================

export default function GalleryExplorer({
  photos,
}: GalleryExplorerProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("All Photos");

  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] =
    useState(INITIAL_COUNT);

  const [activeId, setActiveId] =
    useState<string | null>(null);

  const touchStartX = useRef<number | null>(null);

  // ====================================================
  // CATEGORY COUNTS
  // ====================================================

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const photo of photos) {
      counts.set(
        photo.category,
        (counts.get(photo.category) ?? 0) + 1
      );
    }

    return counts;
  }, [photos]);

  const categories = useMemo(() => {
    const ordered = GALLERY_CATEGORY_ORDER.filter(
      (category) => categoryCounts.has(category)
    );

    const additional = Array.from(
      categoryCounts.keys()
    ).filter(
      (category) =>
        !GALLERY_CATEGORY_ORDER.some(
          (known) => known === category
        )
    );

    return [
      "All Photos",
      ...ordered,
      ...additional,
    ];
  }, [categoryCounts]);

  // ====================================================
  // FILTER ALL PHOTOS
  // ====================================================

  const filteredPhotos = useMemo(() => {
    const search = query.trim().toLowerCase();

    return photos.filter((photo) => {
      const matchesCategory =
        selectedCategory === "All Photos" ||
        photo.category === selectedCategory;

      const matchesSearch =
        !search ||
        [
          photo.title,
          photo.alt,
          photo.category,
        ].some((value) =>
          value.toLowerCase().includes(search)
        );

      return matchesCategory && matchesSearch;
    });
  }, [photos, query, selectedCategory]);

  const visiblePhotos = filteredPhotos.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < filteredPhotos.length;

  // ====================================================
  // LIGHTBOX SELECTION
  // ====================================================

  const activeIndex = filteredPhotos.findIndex(
    (photo) => photo.id === activeId
  );

  const activePhoto =
    activeIndex >= 0
      ? filteredPhotos[activeIndex]
      : null;

  const navigatePhoto = useCallback(
    (direction: number) => {
      if (
        activeIndex < 0 ||
        filteredPhotos.length === 0
      ) {
        return;
      }

      const nextIndex =
        (
          activeIndex +
          direction +
          filteredPhotos.length
        ) % filteredPhotos.length;

      setActiveId(
        filteredPhotos[nextIndex].id
      );
    },
    [activeIndex, filteredPhotos]
  );

  // ====================================================
  // KEYBOARD NAVIGATION & SCROLL LOCK
  // ====================================================

  useEffect(() => {
    if (!activePhoto) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigatePhoto(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigatePhoto(-1);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [activePhoto, navigatePhoto]);

  // ====================================================
  // FILTER HANDLERS
  // ====================================================

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_COUNT);
    setActiveId(null);
  }

  function changeSearch(value: string) {
    setQuery(value);
    setVisibleCount(INITIAL_COUNT);
    setActiveId(null);
  }

  function resetFilters() {
    setSelectedCategory("All Photos");
    setQuery("");
    setVisibleCount(INITIAL_COUNT);
    setActiveId(null);
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      <section
        id="photo-gallery"
        className="scroll-mt-28 bg-[#F6F9F6] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <Camera size={18} />
                  Our Photo Collection
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Explore the Gallery
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                  Explore learning, school activities,
                  performances, achievements and
                  everyday moments at Doribabs.
                </p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-white px-6 py-4 text-center shadow-sm">
                <p className="text-3xl font-black text-[#176B49]">
                  {photos.length}
                </p>

                <p className="mt-1 text-xs font-bold text-slate-500">
                  Gallery Photographs
                </p>
              </div>
            </div>
          </Reveal>

          {/* Search */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="relative">
              <Search
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  changeSearch(event.target.value)
                }
                placeholder="Search school photographs..."
                aria-label="Search school photographs"
                className="h-13 w-full rounded-xl border border-slate-200 bg-[#FAFCFA] py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => {
              const selected =
                selectedCategory === category;

              const count =
                category === "All Photos"
                  ? photos.length
                  : categoryCounts.get(category) ?? 0;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    selectCategory(category)
                  }
                  aria-pressed={selected}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-extrabold transition sm:px-5 sm:text-sm ${
                    selected
                      ? "bg-[#176B49] text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-green-200 hover:bg-green-50"
                  }`}
                >
                  {category}

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      selected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter results summary */}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <p
              aria-live="polite"
              className="text-sm text-slate-600"
            >
              Showing{" "}
              <span className="font-extrabold text-slate-900">
                {Math.min(
                  visibleCount,
                  filteredPhotos.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-extrabold text-slate-900">
                {filteredPhotos.length}
              </span>{" "}
              photographs
            </p>

            {(query ||
              selectedCategory !== "All Photos") && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] hover:underline"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>

          {/* =================================================
              MASONRY PHOTO GRID
              ================================================= */}

          {visiblePhotos.length > 0 ? (
            <div className="mt-9 columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4">
              {visiblePhotos.map((photo, index) => {
                const aspectClass =
                  index % 7 === 0
                    ? "aspect-[4/5]"
                    : index % 7 === 2
                    ? "aspect-square"
                    : index % 7 === 4
                    ? "aspect-[5/4]"
                    : "aspect-[4/3]";

                return (
                  <Reveal
                    key={photo.id}
                    delay={Math.min(
                      (index % 8) * 0.025,
                      0.175
                    )}
                    className="mb-3 break-inside-avoid sm:mb-5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveId(photo.id)
                      }
                      aria-label={`View full photograph: ${photo.title}`}
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-white text-left shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-[#176B49]/40 sm:rounded-2xl"
                    >
                      <div
                        className={`relative overflow-hidden bg-green-50 ${aspectClass}`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />

                        <span className="absolute bottom-3 left-3 right-3 line-clamp-2 text-[11px] font-bold leading-5 text-white sm:bottom-4 sm:left-4 sm:right-4 sm:text-sm">
                          {photo.title}
                        </span>

                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#176B49] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
                          <Images size={18} />
                        </span>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-9 rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-[#176B49]">
                <Search size={30} />
              </div>

              <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                No photographs found
              </h3>

              <p className="mt-3 text-sm leading-8 text-slate-500">
                Try another search or choose
                a different category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white"
              >
                <ArrowLeft size={18} />
                View All Photos
              </button>
            </div>
          )}

          {/* =================================================
              LOAD MORE
              ================================================= */}

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount(
                    (current) =>
                      current + LOAD_MORE_COUNT
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-8 py-4 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#105638] hover:shadow-lg"
              >
                Load More Photos
                <ArrowRight size={18} />
              </button>

              <p className="mt-4 text-xs text-slate-500">
                More moments from Doribabs await.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FULL-SCREEN LIGHTBOX
          ===================================================== */}

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph viewer: ${activePhoto.title}`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#06110D]/98 text-white"
        >
          {/* Lightbox toolbar */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-7">
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">
                {activePhoto.title}
              </p>

              <p className="mt-1 text-xs text-white/60">
                {activeIndex + 1} of{" "}
                {filteredPhotos.length}
                {" • "}
                {activePhoto.category}
              </p>
            </div>

            <button
              type="button"
              autoFocus
              onClick={() =>
                setActiveId(null)
              }
              aria-label="Close photo viewer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main image and swipe area */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 sm:px-20"
            onTouchStart={(event) => {
              touchStartX.current =
                event.changedTouches[0]?.clientX ??
                null;
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current;

              if (start === null) return;

              const end =
                event.changedTouches[0]?.clientX ??
                start;

              const difference = end - start;

              if (Math.abs(difference) > 60) {
                navigatePhoto(
                  difference < 0 ? 1 : -1
                );
              }

              touchStartX.current = null;
            }}
          >
            <div className="relative h-full w-full max-w-6xl">
              <Image
                key={activePhoto.id}
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Previous */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  navigatePhoto(-1)
                }
                aria-label="Previous photograph"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 shadow-xl transition hover:bg-white/20 sm:left-6 sm:h-13 sm:w-13"
              >
                <ChevronLeft size={25} />
              </button>
            )}

            {/* Next */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  navigatePhoto(1)
                }
                aria-label="Next photograph"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 shadow-xl transition hover:bg-white/20 sm:right-6 sm:h-13 sm:w-13"
              >
                <ChevronRight size={25} />
              </button>
            )}
          </div>

          {/* Lightbox caption */}
          <div className="border-t border-white/10 px-5 py-4 text-center">
            <p className="text-xs text-white/65 sm:text-sm">
              Doribabs School Complex
              {" • "}
              {activePhoto.category}
            </p>

            <p className="mt-1 text-[11px] text-white/40">
              Use the arrow keys or swipe to browse.
              Press Esc to close.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
