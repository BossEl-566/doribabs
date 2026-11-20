
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

// ======================================================
// FACILITIES HERO SLIDES
// ======================================================

const slides = [
  {
    id: "campus",
    image: "/images/school-building-and-compound4.jpg",
    eyebrow: "Explore Our Campus",
    title: "Spaces to Learn.",
    highlight: "Places to Grow.",
    description:
      "Discover the environment, learning spaces and facilities that support education and school life at Doribabs School Complex.",
  },
  {
    id: "computing",
    image: "/images/computer-lab4.jpeg",
    eyebrow: "Technology & Digital Skills",
    title: "Learning Today.",
    highlight: "Preparing for Tomorrow.",
    description:
      "Our ICT centre supports computer learning and the development of digital literacy among learners.",
  },
  {
    id: "science",
    image: "/images/science-lab-section14.jpeg",
    eyebrow: "Science & Discovery",
    title: "Explore Ideas.",
    highlight: "Discover Possibilities.",
    description:
      "Practical scientific learning helps learners develop curiosity, understanding and problem-solving skills.",
  },
  {
    id: "community",
    image: "/images/sky-shot-of-school-prepater-and-student.jpg",
    eyebrow: "The Doribabs Environment",
    title: "More Than a School.",
    highlight: "A Community.",
    description:
      "From academic spaces to recreation and daily routines, our facilities support the wider development of every learner.",
  },
] as const;

// ======================================================
// FACILITIES HERO CAROUSEL
// ======================================================

export default function FacilitiesHeroCarousel() {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 6000,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 35,
    },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(
        emblaApi.selectedScrollSnap()
      );
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  function toggleAutoplay() {
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }

  return (
    <section
      aria-label="Doribabs school facilities"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-[#103D2C] text-white"
    >
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div className="relative isolate flex min-h-[680px] items-center overflow-hidden sm:min-h-[730px] lg:min-h-[780px]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#061C13]/95 via-[#092A1C]/80 to-black/30" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#061C13]/65 via-transparent to-black/20" />

                <div className="relative mx-auto w-full max-w-7xl px-5 pb-32 pt-24 sm:px-8">
                  <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFCA75]">
                      <span className="h-0.5 w-9 bg-[#F4A43C]" />
                      {slide.eyebrow}
                    </span>

                    {index === 0 ? (
                      <h1 className="mt-7 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                        {slide.title}
                        <span className="mt-2 block text-[#F4B45C]">
                          {slide.highlight}
                        </span>
                      </h1>
                    ) : (
                      <h2 className="mt-7 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                        {slide.title}
                        <span className="mt-2 block text-[#F4B45C]">
                          {slide.highlight}
                        </span>
                      </h2>
                    )}

                    <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                      <Link
                        href="/facilities#explore-facilities"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
                      >
                        Explore Facilities
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        href="/contact#visit-school"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        Find Our School
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>

                    <p className="mt-10 text-sm font-semibold italic text-[#FFCA75]">
                      Doribabs... Seeing Is Believing!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 sm:bottom-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="pointer-events-auto flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  index === selectedIndex
                    ? "true"
                    : undefined
                }
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-11 bg-[#F4A43C]"
                    : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={
                isPlaying
                  ? "Pause slideshow"
                  : "Play slideshow"
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} />
              )}
            </button>

            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4A43C] text-[#103D2C] transition hover:bg-[#FFCA75]"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
