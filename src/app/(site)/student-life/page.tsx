
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  Church,
  Flag,
  GraduationCap,
  Heart,
  HeartHandshake,
  MapPin,
  Mic,
  Music,
  Palette,
  School,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

// ============================================================
// SEO & METADATA
// ============================================================

export const metadata: Metadata = {
  title: "Student Life | Doribabs School Complex",
  description:
    "Explore student life at Doribabs School Complex: sports, culture, music, dance, drama, school events, worship, awards and more.",
  openGraph: {
    title: "Student Life | Doribabs School Complex",
    description:
      "Discover the people, activities and memorable moments that make student life at Doribabs special.",
    images: [
      {
        url: "/images/school-culture-dance3.jpg",
        alt: "Student activities at Doribabs School Complex",
      },
    ],
  },
};

// ============================================================
// STUDENT LIFE ACTIVITIES
// ============================================================

const activities = [
  {
    title: "Sports & Athletics",
    category: "Physical Development",
    description:
      "Sporting activities and athletic competitions encourage fitness, teamwork, discipline and sportsmanship.",
    image: "/images/games-and-fun7.jpg",
    icon: Trophy,
  },
  {
    title: "Cultural Activities",
    category: "Culture & Heritage",
    description:
      "Learners explore Ghanaian traditions and develop an appreciation of cultural heritage, values and diversity.",
    image: "/images/school-culture-dance1.jpg",
    icon: Palette,
  },
  {
    title: "Music, Dance & Drama",
    category: "Creative Expression",
    description:
      "Performances help learners discover artistic talents, express themselves and build confidence.",
    image: "/images/school-culture-dance3.jpg",
    icon: Music,
  },
  {
    title: "Debates & Quizzes",
    category: "Intellectual Growth",
    description:
      "Inter-class debates and quiz competitions develop communication, public speaking and critical thinking.",
    image: "/images/speech-by-head-prefect.jpg",
    icon: Mic,
  },
  {
    title: "Educational Excursions",
    category: "Learning Beyond School",
    description:
      "Educational visits to senior high schools broaden learners' perspectives and inspire future academic ambitions.",
    image: "/images/school-borad-with-some-tudent-group-pics5.jpg",
    icon: MapPin,
  },
  {
    title: "Awards & Celebrations",
    category: "Recognising Excellence",
    description:
      "Prize-giving ceremonies celebrate hard work, academic progress and achievement across school life.",
    image: "/images/speech-and-prize-giving-ceremony3.JPG",
    icon: Award,
  },
] as const;

// ============================================================
// PHOTOGRAPHIC COLLECTIONS
// ============================================================

const sportsPhotos = [
  {
    src: "/images/6th-match.jpg",
    alt: "Doribabs school sporting activity",
    caption: "School Sports",
  },
  {
    src: "/images/6th-match1.jpg",
    alt: "School sporting event photograph",
    caption: "Healthy Competition",
  },
  {
    src: "/images/games-and-fun9.jpg",
    alt: "Learners enjoying games at Doribabs",
    caption: "Play & Recreation",
  },
  {
    src: "/images/games-and-fun12.jpg",
    alt: "Doribabs games and activities",
    caption: "Team Spirit",
  },
] as const;

const bandPhotos = [
  {
    src: "/images/group-of-regimental-band.jpg",
    alt: "Doribabs regimental band group",
    caption: "Regimental Band",
  },
  {
    src: "/images/regimental-band3.jpg",
    alt: "Doribabs regimental band activity",
    caption: "Music & Discipline",
  },
  {
    src: "/images/school-cardet3.jpg",
    alt: "Doribabs cadet activity",
    caption: "Cadet Activities",
  },
  {
    src: "/images/school-cardet-and-regimental-band.jpg",
    alt: "Doribabs cadet and regimental band members",
    caption: "School Spirit",
  },
] as const;

const faithPhotos = [
  {
    src: "/images/school-church-service1.jpg",
    alt: "Doribabs school worship service",
    caption: "Worship & Fellowship",
  },
  {
    src: "/images/school-church-service3.jpg",
    alt: "Students participating in a school church service",
    caption: "Spiritual Development",
  },
  {
    src: "/images/school-church-service5.jpg",
    alt: "Doribabs school religious gathering",
    caption: "Our School Community",
  },
  {
    src: "/images/school-church-service7.jpg",
    alt: "School church service at Doribabs",
    caption: "Faith & Values",
  },
] as const;

const dailyLifePhotos = [
  {
    src: "/images/student-at-dinning-hall-1.jpg",
    alt: "Students at the Doribabs dining hall",
    caption: "Dining Hall",
  },
  {
    src: "/images/student-at-dinning-hall-2.jpg",
    alt: "Doribabs students sharing a meal",
    caption: "Shared Moments",
  },
  {
    src: "/images/friends.jpg",
    alt: "Doribabs students together",
    caption: "Friendship",
  },
  {
    src: "/images/random-students-picture5.jpg",
    alt: "Learners of Doribabs School Complex",
    caption: "Everyday School Life",
  },
] as const;

const photoWall = [
  {
    src: "/images/school-culture-dance2.jpg",
    alt: "Cultural dance at Doribabs School Complex",
    caption: "Cultural Performances",
  },
  {
    src: "/images/trumpet-band.jpg",
    alt: "Doribabs school trumpet band",
    caption: "Music",
  },
  {
    src: "/images/games-and-fun10.jpg",
    alt: "Learners enjoying school games",
    caption: "Recreation",
  },
  {
    src: "/images/school-cardet5.jpg",
    alt: "Doribabs cadet activity photograph",
    caption: "Cadet Moments",
  },
  {
    src: "/images/student-holding-school-award.jpg",
    alt: "Doribabs learner with school award",
    caption: "Student Achievement",
  },
  {
    src: "/images/school-church-service2.jpg",
    alt: "Doribabs school worship activity",
    caption: "Faith",
  },
  {
    src: "/images/random-students-acting.jpg",
    alt: "Learners taking part in a school performance",
    caption: "Drama",
  },
  {
    src: "/images/school-borad-with-some-tudent-group-pics3.jpg",
    alt: "Doribabs school community group picture",
    caption: "Together at Doribabs",
  },
] as const;

// ============================================================
// REUSABLE PHOTO TILE
// ============================================================

type PhotoTileProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
};

function PhotoTile({
  src,
  alt,
  caption,
  className = "",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw",
}: PhotoTileProps) {
  return (
    <div
      className={`group relative isolate overflow-hidden rounded-2xl bg-slate-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {caption && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <p className="text-xs font-extrabold text-white sm:text-sm">
              {caption}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// REUSABLE SECTION INTRODUCTION
// ============================================================

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={
        centered
          ? "mx-auto mb-12 max-w-3xl text-center"
          : "mb-12 max-w-3xl"
      }
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

// ============================================================
// STUDENT LIFE PAGE
// ============================================================

export default function StudentLifePage() {
  return (
    <main className="overflow-x-hidden bg-white">

      {/* =====================================================
          1. HERO — IMMERSIVE PHOTO & COLLAGE
          ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] text-white">
        <Image
          src="/images/random-students-picture1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/85 to-[#071C12]/65" />

        <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">

          <Reveal>
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/75"
              >
                <Link
                  href="/"
                  className="hover:text-[#FFCA75]"
                >
                  Home
                </Link>

                <ChevronRight size={15} />

                <span className="text-[#FFCA75]">
                  Student Life
                </span>
              </nav>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  Beyond the Classroom
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Discover Life
                <span className="mt-2 block text-[#F4B45C]">
                  at Doribabs.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                Learning, friendships, culture,
                creativity, sports and memorable
                experiences come together to
                enrich the lives of our learners.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#activities"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  Explore School Life
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  View Gallery
                  <Camera size={18} />
                </Link>
              </div>

              <p className="mt-9 text-sm font-semibold italic text-[#FFCA75]">
                Doribabs... Seeing Is Believing!
              </p>
            </div>
          </Reveal>

          {/* Hero photo collage */}
          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <PhotoTile
                src="/images/school-culture-dance4.jpg"
                alt="Learners taking part in cultural activities"
                caption="Culture"
                className="col-span-2 aspect-[16/9] border border-white/20"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              <PhotoTile
                src="/images/regimental-band2.jpg"
                alt="Doribabs regimental band activity"
                caption="Music"
                className="aspect-[4/3] border border-white/20"
              />

              <PhotoTile
                src="/images/games-and-fun6.jpg"
                alt="Doribabs students enjoying school activities"
                caption="Sports & Fun"
                className="aspect-[4/3] border border-white/20"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          2. STUDENT LIFE INTRODUCTION
          ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <PhotoTile
                src="/images/playing.jpg"
                alt="Learners engaged in play at Doribabs"
                className="aspect-[4/5]"
              />

              <div className="flex flex-col gap-3 sm:gap-4">
                <PhotoTile
                  src="/images/random-students-picture8.jpg"
                  alt="Doribabs learners together"
                  className="aspect-[4/3]"
                />

                <div className="flex flex-1 flex-col justify-center rounded-2xl bg-[#176B49] p-5 text-white">
                  <Users
                    size={28}
                    className="text-[#FFCA75]"
                  />

                  <p className="mt-4 text-lg font-extrabold">
                    Growing Together
                  </p>

                  <p className="mt-2 text-xs leading-6 text-white/80">
                    Learning, friendship and character
                    development.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                More Than Education
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Growing Through
                <span className="mt-2 block text-[#176B49]">
                  Every Experience
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                At Doribabs School Complex, education
                extends beyond academic instruction.
                School activities create opportunities
                for learners to discover talents,
                develop confidence, form friendships
                and practise important life skills.
              </p>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Through sporting events, cultural
                programmes, creative performances,
                worship activities and school
                celebrations, learners experience
                different aspects of personal and
                social development.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Creativity & confidence",
                  "Teamwork & friendship",
                  "Leadership & responsibility",
                  "Character & discipline",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-[#176B49]"
                    />

                    <p className="text-sm font-semibold text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                Discover Our School
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          3. EXTRACURRICULAR ACTIVITIES
          ===================================================== */}

      <section
        id="activities"
        className="scroll-mt-32 bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Discover Your Interests"
              title="Activities Beyond the Classroom"
              description="From athletics and creative performances to academic competitions and community events, our activities support holistic development."
              centered
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <Reveal
                  key={activity.title}
                  delay={Math.min(index * 0.07, 0.28)}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={activity.image}
                        alt={`Doribabs school life: ${activity.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="-mt-13 relative flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white bg-[#176B49] text-white shadow-md">
                        <Icon size={24} />
                      </div>

                      <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange-600">
                        {activity.category}
                      </p>

                      <h3 className="mt-3 text-xl font-extrabold text-slate-950">
                        {activity.title}
                      </h3>

                      <p className="mt-4 flex-1 text-sm leading-8 text-slate-600">
                        {activity.description}
                      </p>

                      <Link
                        href="/events"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition group-hover:gap-3"
                      >
                        Explore School Events
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. SPORTS & RECREATION
          ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Trophy size={18} />
                Sports & Recreation
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Active Bodies.
                <span className="block text-[#176B49]">
                  Stronger Teams.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                Sporting activities encourage physical
                fitness, teamwork, discipline,
                sportsmanship and healthy competition.
              </p>

              <p className="mt-4 text-sm leading-8 text-slate-600">
                Learners are encouraged to participate
                responsibly in school games and
                recreational activities while developing
                cooperation and a positive competitive spirit.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Teamwork and cooperation",
                  "Physical fitness and recreation",
                  "Sportsmanship and self-discipline",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="text-[#176B49]"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {sportsPhotos.map((photo) => (
                <PhotoTile
                  key={photo.src}
                  {...photo}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 50vw, 27vw"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          5. CULTURE & CREATIVE EXPRESSION
          ===================================================== */}

      <section className="bg-[#FFF7EF] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-10 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                  <Palette size={18} />
                  Culture & Creativity
                </span>

                <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Celebrating Talent
                  <span className="block text-[#176B49]">
                    and Heritage
                  </span>
                </h2>
              </div>

              <p className="text-sm leading-8 text-slate-600 sm:text-base">
                Cultural activities, music, dance and
                drama provide opportunities for learners
                to appreciate Ghanaian heritage and
                develop creative confidence.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <PhotoTile
                src="/images/school-culture-dance-dramas.jpg"
                alt="Doribabs learners taking part in cultural dance and drama"
                caption="Cultural Dance & Drama"
                className="aspect-[16/10]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </Reveal>

            <Reveal
              delay={0.08}
              className="lg:col-span-5"
            >
              <PhotoTile
                src="/images/school-culture-dance5.jpg"
                alt="Cultural performance at Doribabs"
                caption="Creative Expression"
                className="aspect-[16/10] lg:aspect-auto lg:h-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-white p-6 sm:p-8">
              <p className="max-w-2xl text-sm leading-8 text-slate-600">
                Learners also take part in debates,
                quizzes and educational activities
                that develop communication skills,
                confidence and critical thinking.
              </p>

              <Link
                href="/academics"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49]"
              >
                Our Academics
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          6. CADET & REGIMENTAL BAND HIGHLIGHTS
          ===================================================== */}

      <section className="bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFCA75]">
                <Music size={18} />
                From the School Photo Archive
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Cadet & Regimental
                <span className="block text-[#F4A43C]">
                  Band Highlights
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-white/75 sm:text-base">
                Explore photographs of the schools
                cadet and regimental band activities,
                capturing moments of performance,
                participation and school spirit.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {bandPhotos.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.07}
                className={
                  index === 0
                    ? "col-span-2"
                    : ""
                }
              >
                <PhotoTile
                  {...photo}
                  className={
                    index === 0
                      ? "aspect-[16/10] lg:aspect-[4/3]"
                      : "aspect-[4/3]"
                  }
                  sizes={
                    index === 0
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 50vw, 25vw"
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          7. FAITH & SPIRITUAL DEVELOPMENT
          ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {faithPhotos.map((photo) => (
                <PhotoTile
                  key={photo.src}
                  {...photo}
                  className="aspect-[4/3]"
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Church size={18} />
                Faith & Values
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Growing in
                <span className="block text-[#176B49]">
                  Faith & Character
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                As a Christian-based institution,
                Doribabs places strong emphasis on
                the spiritual and moral development
                of its learners.
              </p>

              <p className="mt-5 text-sm leading-8 text-slate-600">
                The schools documented religious
                activities include morning and evening
                devotions, Sunday church services,
                visits to The Church of Pentecost,
                and worship services led by invited ministers.
              </p>

              <div className="mt-8 rounded-2xl border-l-4 border-[#F4A43C] bg-[#F6F9F6] p-6">
                <p className="text-sm font-semibold leading-8 text-slate-700">
                  Our approach to school life combines
                  intellectual development with integrity,
                  discipline, respect and moral responsibility.
                </p>
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49]"
              >
                Learn About Our Values
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          8. EVERYDAY LIFE, FRIENDSHIP & BOARDING
          ===================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our School Community"
              title="The Everyday Doribabs Experience"
              description="Beyond special events, school life is shaped by daily routines, friendships, shared experiences, learning and the relationships built within our community."
              centered
            />
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {dailyLifePhotos.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.07}
                className="h-full"
              >
                <PhotoTile
                  {...photo}
                  className="aspect-[4/5]"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 grid gap-7 rounded-3xl bg-white p-7 md:grid-cols-[1fr_auto] md:items-center sm:p-9">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Day & Boarding School Life
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600">
                  Doribabs offers day and boarding
                  education. The school maintains rules
                  and routines intended to support
                  discipline, responsible behaviour
                  and an orderly school environment.
                </p>
              </div>

              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                Admissions Information
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          9. CEREMONIES & ACHIEVEMENTS
          ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Award size={18} />
                Milestones & Celebrations
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Celebrating Progress
                <span className="block text-[#176B49]">
                  and Achievement
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                Graduation and transition ceremonies
                celebrate important stages of each
                learners educational journey.
                Speech and prize-giving events also
                recognise hard work and achievement.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Pre-School to Lower Primary transitions",
                  "Upper Primary to Junior High School transitions",
                  "Post-B.E.C.E. graduation and completion",
                  "Speech and prize-giving celebrations",
                  "Independence Day celebrations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-[#176B49]"
                    />

                    <p className="text-sm font-semibold leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/events"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                View School Events
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <PhotoTile
                src="/images/speech-and-prize-giving-ceremony2.JPG"
                alt="Doribabs speech and prize-giving ceremony"
                caption="Prize-Giving Ceremony"
                className="col-span-2 aspect-[16/10]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <PhotoTile
                src="/images/school-achievement-and-award3.jpg"
                alt="Doribabs school achievements and awards"
                caption="Achievements"
                className="aspect-[4/3]"
              />

              <PhotoTile
                src="/images/school-achievement-and-award21.jpg"
                alt="Doribabs school award photograph"
                caption="Recognition"
                className="aspect-[4/3]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          10. PHOTO WALL
          ===================================================== */}

      <section className="bg-[#FFF7EE] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                  <Camera size={18} />
                  Captured at Doribabs
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Moments That Tell Our Story
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600">
                  A collection of memories from
                  school activities, performances,
                  celebrations and everyday life.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49]"
              >
                View Public Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {photoWall.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={Math.min(index * 0.04, 0.2)}
              >
                <PhotoTile
                  {...photo}
                  className="aspect-[4/3]"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          11. STUDENT DEVELOPMENT PILLARS
          ===================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Purposeful Experiences"
              title="What School Life Helps Us Build"
              description="Different experiences contribute to the personal, social, moral and intellectual development of our learners."
              centered
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Community & Friendship",
                description:
                  "Developing positive relationships, cooperation and a sense of belonging.",
              },
              {
                icon: Heart,
                title: "Character & Responsibility",
                description:
                  "Encouraging discipline, integrity, respect and responsible choices.",
              },
              {
                icon: GraduationCap,
                title: "Confidence & Leadership",
                description:
                  "Helping learners express ideas, develop initiative and grow through experience.",
              },
            ].map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <Reveal
                  key={pillar.title}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl border border-slate-100 bg-[#F8FAF8] p-7 transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E5F2E9] text-[#176B49]">
                      <Icon size={27} />
                    </div>

                    <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                      {pillar.title}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          12. ADMISSIONS CTA
          ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/school-borad-with-some-tudent-group-pics4.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071C12]/85" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#FFCA75]">
              <School size={17} />
              Join the Doribabs Community
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A Place to Learn.
              <span className="block text-[#F4A43C]">
                A Place to Grow.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Discover an educational environment
              where classroom learning is complemented
              by creativity, school activities,
              personal development and shared experiences.
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
