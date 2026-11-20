
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
// CAROUSEL CONTENT
// ======================================================

const slides = [
  {
    id: "campus",
    image: "/images/school-building-and-compound4.jpg",
    alt: "Doribabs School Complex buildings and compound",
    eyebrow: "Welcome to Doribabs",
    title: "We're Here",
    highlight: "to Help You.",
    description:
      "Have questions about admissions, academics or school life? Connect with our team and discover everything you need to know.",
  },
  {
    id: "community",
    image:
      "/images/school-borad-with-some-tudent-and-teachers-group-pics.jpg",
    alt: "Doribabs School Complex school community",
    eyebrow: "Connect With Our Community",
    title: "Every Question",
    highlight: "Matters to Us.",
    description:
      "We welcome enquiries from parents, guardians, prospective learners, alumni and members of our community.",
  },
  {
    id: "learners",
    image: "/images/random-students-picture1.jpg",
    alt: "Learners of Doribabs School Complex",
    eyebrow: "Discover Our School",
    title: "Your Journey",
    highlight: "Starts Here.",
    description:
      "Learn about our educational programmes, admission requirements and opportunities for your child's development.",
  },
  {
    id: "school-life",
    image: "/images/sky-shot-of-school-prepater-and-student.jpg",
    alt: "Doribabs School Complex school environment",
    eyebrow: "Come and Visit Us",
    title: "Experience",
    highlight: "Doribabs.",
    description:
      "Find us at Moree Toll Booth along the Accra–Takoradi Highway and connect with the Doribabs school community.",
  },
] as const;

// ======================================================
// HERO CAROUSEL
// ======================================================

export default function ContactHeroCarousel() {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 6500,
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

  // Synchronise the indicator with Embla.
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(
        emblaApi.selectedScrollSnap()
      );
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  function scrollPrevious() {
    emblaApi?.scrollPrev();
  }

  function scrollNext() {
    emblaApi?.scrollNext();
  }

  function scrollTo(index: number) {
    emblaApi?.scrollTo(index);
  }

  function toggleAutoplay() {
    if (isPlaying) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }

  return (
    <section
      aria-label="Doribabs Contact introduction"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-[#103D2C] text-white"
    >
      {/* ==================================================
          CAROUSEL VIEWPORT
          ================================================== */}

      <div
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div className="relative isolate flex min-h-[690px] items-center overflow-hidden sm:min-h-[720px] lg:min-h-[750px]">

                {/* Background image */}
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Dark overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#061C13]/95 via-[#0C3425]/80 to-black/30" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#061C13]/70 via-transparent to-black/15" />

                {/* Decorative glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-[#F4A43C]/10 blur-3xl"
                />

                {/* Slide content */}
                <div className="relative mx-auto w-full max-w-7xl px-5 pb-32 pt-24 sm:px-8 lg:pb-28">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-3">
                      <span className="h-0.5 w-9 bg-[#F4A43C]" />

                      <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                        {slide.eyebrow}
                      </span>
                    </div>

                    <h1 className="mt-7 text-5xl font-black leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
                      {slide.title}

                      <span className="mt-2 block text-[#F4B45C]">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                      <Link
                        href="/contact#contact-details"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                      >
                        Get in Touch
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        href="/contact#visit-school"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        Visit Our School
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

      {/* ==================================================
          CAROUSEL CONTROLS
          ================================================== */}

      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 sm:bottom-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">

          {/* Indicators */}
          <div className="pointer-events-auto flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollTo(index)}
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

          {/* Navigation */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={
                isPlaying
                  ? "Pause carousel"
                  : "Play carousel"
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} />
              )}
            </button>

            <button
              type="button"
              onClick={scrollPrevious}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={scrollNext}
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
