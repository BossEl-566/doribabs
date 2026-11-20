
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

// ======================================================
// HERO CONTENT
// ======================================================

const slides = [
  {
    image: "/images/school-building-and-compound4.jpg",
    alt: "Doribabs School Complex building and compound",
    eyebrow: "Welcome to Doribabs School Complex",
    title: "Building Strong Foundations.",
    accent: "Inspiring Bright Futures.",
    description:
      "A nurturing school community where quality education, discipline and character development help every learner thrive.",
    primaryLabel: "Discover Our School",
    primaryHref: "/about",
    secondaryLabel: "Explore Admissions",
    secondaryHref: "/admissions",
  },
  {
    image: "/images/random-students-picture1.jpg",
    alt: "Learners of Doribabs School Complex",
    eyebrow: "Learning • Growth • Excellence",
    title: "Every Child Matters.",
    accent: "Every Dream Counts.",
    description:
      "From Creche to Junior High School, we support learners through meaningful educational experiences and personal development.",
    primaryLabel: "Our Academic Programmes",
    primaryHref: "/academics",
    secondaryLabel: "Student Life",
    secondaryHref: "/student-life",
  },
  {
    image: "/images/school-achievement-and-award4.jpg",
    alt: "School achievement and award photograph",
    eyebrow: "Celebrating Achievement",
    title: "A Culture of Excellence.",
    accent: "A Future of Possibilities.",
    description:
      "We celebrate effort, progress and achievement while preparing our learners to become confident and responsible citizens.",
    primaryLabel: "Our Achievements",
    primaryHref: "/achievements",
    secondaryLabel: "Latest School News",
    secondaryHref: "/blog",
  },
  {
    image: "/images/school-culture-dance4.jpg",
    alt: "Doribabs School Complex cultural activities",
    eyebrow: "Beyond the Classroom",
    title: "Learning Through Experience.",
    accent: "Growing Together.",
    description:
      "Discover a vibrant school environment where creativity, cultural activities, teamwork and discovery complement classroom learning.",
    primaryLabel: "Discover Student Life",
    primaryHref: "/student-life",
    secondaryLabel: "View Our Gallery",
    secondaryHref: "/gallery",
  },
] as const;

// ======================================================
// COMPONENT
// ======================================================

export default function HeroCarousel() {
  const reduceMotion = useReducedMotion();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);


const [autoplay] = useState(() =>
  Autoplay({
    delay: 6000,
    playOnInit: false,
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


  // ======================================================
  // TRACK ACTIVE SLIDE
  // ======================================================

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);


useEffect(() => {
  if (!emblaApi) return;

  // Listen for user navigation and autoplay slide changes.
  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);

  return () => {
    emblaApi.off("select", onSelect);
    emblaApi.off("reInit", onSelect);
  };
}, [emblaApi, onSelect]);


  // ======================================================
  // AUTOPLAY
  // ======================================================


useEffect(() => {
  if (!emblaApi) return;

  if (isPlaying && !reduceMotion) {
    autoplay.play();
  } else {
    autoplay.stop();
  }
}, [emblaApi, autoplay, isPlaying, reduceMotion]);


  // ======================================================
  // NAVIGATION
  // ======================================================

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev(Boolean(reduceMotion));
  }, [emblaApi, reduceMotion]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext(Boolean(reduceMotion));
  }, [emblaApi, reduceMotion]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index, Boolean(reduceMotion));
    },
    [emblaApi, reduceMotion]
  );

  const currentSlide = slides[selectedIndex];

  return (
    <section
      aria-label="Discover Doribabs School Complex"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-[#103D2C] text-white"
    >
      {/* ===========================================
          SLIDE IMAGES
          =========================================== */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={selectedIndex !== index}
              className="relative h-[640px] min-w-0 shrink-0 basis-full sm:h-[700px] lg:h-[740px]"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Dark gradient ensures readable text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/70 to-[#071C12]/20" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
            </div>
          ))}
        </div>
      </div>

      {/* ===========================================
          ANIMATED HERO TEXT
          =========================================== */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="mx-auto flex h-full max-w-7xl items-center px-5 pb-28 pt-12 sm:px-8 lg:pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 22 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -10 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: "easeOut",
              }}
              className="pointer-events-auto max-w-[760px]"
            >
              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#FFCB72] sm:text-xs">
                  {currentSlide.eyebrow}
                </p>
              </div>

              {/* Main headline */}
              <h1 className="max-w-[780px] text-[clamp(2.4rem,5.4vw,5.3rem)] font-black leading-[1.08] tracking-tight">
                {currentSlide.title}

                <span className="mt-2 block text-[#F9B75C]">
                  {currentSlide.accent}
                </span>
              </h1>

              {/* Supporting copy */}
              <p className="mt-6 max-w-[600px] text-sm leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-lg">
                {currentSlide.description}
              </p>

              {/* Hero actions */}
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={currentSlide.primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#143C2B] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  {currentSlide.primaryLabel}
                  <ArrowUpRight size={18} />
                </Link>

                <Link
                  href={currentSlide.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white/20"
                >
                  {currentSlide.secondaryLabel}
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* School motto */}
              <p className="mt-9 text-xs font-semibold italic tracking-wide text-white/75">
                Doribabs... Seeing Is Believing!
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ===========================================
          CAROUSEL CONTROLS
          =========================================== */}
      <div className="absolute inset-x-0 bottom-6 z-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          {/* Slide indicators */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-white">
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>

            <div
              className="flex items-center gap-2"
              aria-label="Choose a slide"
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={
                    index === selectedIndex
                      ? "true"
                      : undefined
                  }
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-9 bg-[#F4A43C]"
                      : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm font-semibold tabular-nums text-white/60">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous hero slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={() =>
                setIsPlaying((playing) => !playing)
              }
              disabled={Boolean(reduceMotion)}
              aria-label={
                isPlaying && !reduceMotion
                  ? "Pause automatic slideshow"
                  : "Play automatic slideshow"
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPlaying && !reduceMotion ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next hero slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
