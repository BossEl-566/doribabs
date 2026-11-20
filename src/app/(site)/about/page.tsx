
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Eye,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

// ======================================================
// PAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: "About Us | Doribabs School Complex",
  description:
    "Learn about Doribabs School Complex, founded by Madam Doris Baaba Simpson in 2009. Discover our history, mission, vision, values and commitment to holistic education.",
  openGraph: {
    title: "About Doribabs School Complex",
    description:
      "Discover the story, mission, vision, core values and educational philosophy of Doribabs School Complex.",
    images: [
      {
        url: "/images/school-building-and-compound4.jpg",
        alt: "Doribabs School Complex",
      },
    ],
  },
};

// ======================================================
// SCHOOL VALUES
// Based on the school's official core values.
// ======================================================

const coreValues = [
  {
    title: "Faith & Discipline",
    description:
      "Upholding discipline, moral virtues and the fear of God in our school community.",
    icon: ShieldCheck,
  },
  {
    title: "Originality & Excellence",
    description:
      "Encouraging originality, effectiveness and high standards in everything we do.",
    icon: Sparkles,
  },
  {
    title: "Respect",
    description:
      "Valuing the opinions and contributions of learners, parents, staff and stakeholders.",
    icon: Heart,
  },
  {
    title: "Integrity & Inclusiveness",
    description:
      "Promoting honesty, inclusion, innovation and fairness within our learning environment.",
    icon: CheckCircle2,
  },
  {
    title: "Professionalism",
    description:
      "Maintaining professionalism, quality teaching and a commitment to continuous improvement.",
    icon: Award,
  },
  {
    title: "Commitment & Adaptability",
    description:
      "Approaching challenges with passion, dedication, flexibility and determination.",
    icon: Target,
  },
  {
    title: "Holistic Education",
    description:
      "Working to remain a reference centre for quality education and all-round child development.",
    icon: GraduationCap,
  },
  {
    title: "Social Responsibility",
    description:
      "Serving our communities and upholding the dedication and legacy of our founders.",
    icon: Users,
  },
];

// ======================================================
// EDUCATIONAL PILLARS
// ======================================================

const educationalPillars = [
  {
    number: "01",
    title: "Spiritual & Moral Development",
    description:
      "Nurturing God-fearing learners with integrity, discipline, humility, respect and good character.",
    icon: Heart,
  },
  {
    number: "02",
    title: "Academic & Intellectual Development",
    description:
      "Developing knowledge, confidence, creativity, critical thinking and effective problem-solving skills.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Social & Personal Development",
    description:
      "Raising responsible leaders, independent thinkers and citizens who contribute positively to society.",
    icon: Users,
  },
];

// ======================================================
// SCHOOL HISTORY TIMELINE
// ======================================================

const timeline = [
  {
    year: "Before 2009",
    title: "A Foundation of Care",
    description:
      "The premises operated as a girls' hostel serving students from several schools in the Cape Coast area.",
  },
  {
    year: "2008",
    title: "A New Educational Vision",
    description:
      "As boarding facilities improved elsewhere, Madam Doris Baaba Simpson recognised an opportunity to contribute to quality basic education.",
  },
  {
    year: "8 September 2009",
    title: "Doribabs School Complex Founded",
    description:
      "The school was formally founded, guided by a commitment to holistic education, discipline and moral development.",
  },
  {
    year: "9 September 2009",
    title: "Admissions Begin",
    description:
      "The school officially opened admissions with an initial enrolment of 15 pupils.",
  },
  {
    year: "2018",
    title: "Academic Excellence Recognised",
    description:
      "Doribabs earned notable recognition, including the B.E.C.E. Presidential Award Winner distinction for the Central Region.",
  },
  {
    year: "September 2019",
    title: "A Decade of Education",
    description:
      "The school marked its 10th anniversary, reflecting on its journey and commitment to developing future leaders.",
  },
];

// ======================================================
// ABOUT PAGE
// ======================================================

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: PAGE HERO
          ================================================== */}

      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#103D2C] text-white lg:min-h-[620px]">
        <Image
          src="/images/sky-shot-of-school-prepater-and-student.jpg"
          alt="Doribabs School Complex learners and school environment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071E15]/95 via-[#103D2C]/85 to-[#103D2C]/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071E15]/60 via-transparent to-black/10" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div>
              {/* Breadcrumb */}
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

                <ChevronRight size={14} />

                <span className="text-[#FFCA75]">
                  About Us
                </span>
              </nav>

              {/* Eyebrow */}
              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  Our Story, Our Purpose
                </p>
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                About
                <span className="mt-2 block text-[#F4B45C]">
                  Doribabs School
                </span>
                Complex
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                A school built on the conviction that
                education should nurture not just academic
                achievement, but character, creativity,
                responsibility and lifelong learning.
              </p>

              <Link
                href="#our-story"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
              >
                Discover Our Story
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          {/* Hero information panel */}
          <Reveal delay={0.15}>
            <div className="max-w-md rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-md lg:ml-auto lg:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4A43C] text-[#123B29]">
                <School size={28} />
              </div>

              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFCA75]">
                Our Heritage
              </p>

              <p className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Since 2009
              </p>

              <p className="mt-5 text-sm leading-8 text-white/80">
                Founded by Madam Doris Baaba Simpson
                with a vision to provide quality,
                flexible and affordable holistic education.
              </p>

              <div className="mt-7 border-t border-white/20 pt-6">
                <p className="text-sm font-bold italic text-[#FFCA75]">
                  Doribabs... Seeing Is Believing!
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: QUICK SCHOOL FACTS
          ================================================== */}

      <section className="border-b border-slate-100 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3 md:divide-x md:divide-slate-100">
          <Reveal className="flex items-center gap-4 md:px-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[#176B49]">
              <CalendarDays size={25} />
            </div>

            <div>
              <p className="text-lg font-extrabold text-slate-900">
                8 September 2009
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Date Founded
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex items-center gap-4 md:px-5"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <GraduationCap size={25} />
            </div>

            <div>
              <p className="text-lg font-extrabold text-slate-900">
                Creche to JHS
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Educational Levels
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.16}
            className="flex items-center gap-4 md:px-5"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[#176B49]">
              <MapPin size={25} />
            </div>

            <div>
              <p className="text-lg font-extrabold text-slate-900">
                Moree, Ghana
              </p>

              <p className="mt-1 text-xs text-slate-500">
                School Location
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: OUR STORY
          ================================================== */}

      <section
        id="our-story"
        className="scroll-mt-32 bg-[#FAFCFA] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Photos */}
          <Reveal>
            <div className="relative pb-10 pr-8 sm:pr-12">
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] bg-green-100">
                <Image
                  src="/images/school-building-and-compound4.jpg"
                  alt="Buildings and surroundings of Doribabs School Complex"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 right-0 max-w-[250px] rounded-2xl bg-[#176B49] p-6 text-white shadow-xl sm:p-8">
                <p className="text-4xl font-black">
                  15
                </p>

                <p className="mt-2 text-sm font-bold">
                  First Enrolled Pupils
                </p>

                <p className="mt-2 text-xs leading-6 text-white/75">
                  Admissions commenced on
                  9 September 2009.
                </p>
              </div>
            </div>
          </Reveal>

          {/* History */}
          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <span className="h-0.5 w-8 bg-[#F4A43C]" />
                Our Beginning
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                From a Vision to
                <span className="mt-2 block text-[#176B49]">
                  a School of Purpose
                </span>
              </h2>

              <div className="mt-7 space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  Before Doribabs School Complex was founded,
                  the premises served as a girls&apos; hostel
                  for students from several senior high
                  schools in and around Cape Coast.
                </p>

                <p>
                  As those institutions developed their
                  own boarding facilities, Madam Doris
                  Baaba Simpson recognised an opportunity
                  to respond to the need for quality
                  basic education in the surrounding area.
                </p>

                <p>
                  With guidance from the Ghana Education
                  Service through the District Education
                  Directorate, Doribabs School Complex
                  was founded on 8 September 2009.
                  Admissions began the following day,
                  with 15 pupils.
                </p>

                <p>
                  That original commitment continues to
                  shape the school&apos;s focus on academic
                  excellence, moral development,
                  discipline and lifelong learning.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
                >
                  Our Academics
                  <ArrowUpRight size={18} />
                </Link>

                <Link
                  href="/achievements"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-4 text-sm font-bold text-green-800 transition hover:bg-green-50"
                >
                  School Achievements
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: OUR MISSION AND VISION
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                What Guides Us
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Our Mission & Vision
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Our purpose and aspirations guide how
                we teach, nurture and prepare learners
                for the future.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mission */}
            <Reveal className="h-full">
              <article className="relative h-full overflow-hidden rounded-3xl bg-[#103D2C] p-7 text-white sm:p-10">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#FFCA75]">
                    <Target size={30} />
                  </div>

                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#FFCA75]">
                    Our Purpose
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold">
                    Our Mission
                  </h3>

                  <p className="mt-6 text-sm leading-8 text-white/85">
                    The mission behind the existence of
                    Doribabs School Complex is to provide
                    quality, flexible, affordable and
                    recognised holistic education, embedded
                    in the fear of God, high discipline and
                    moral virtues, with emphasis on positive
                    behavioural modification.
                  </p>

                  <p className="mt-5 text-sm leading-8 text-white/85">
                    This is achieved through a multidisciplinary
                    and interdisciplinary approach to learning,
                    which seeks to unearth the inner potentials
                    of our learners through maximum stakeholder
                    collaboration, in order to produce socially
                    responsible citizens equipped for
                    lifelong learning.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Vision */}
            <Reveal
              delay={0.1}
              className="h-full"
            >
              <article className="relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-[#FFF3E6] p-7 sm:p-10">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-200/30" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-700 shadow-sm">
                    <Eye size={30} />
                  </div>

                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
                    Our Aspiration
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold text-slate-950">
                    Our Vision
                  </h3>

                  <p className="mt-6 text-base leading-9 text-slate-700">
                    The vision of Doribabs School Complex
                    is to be a beacon and a reference centre
                    for holistic quality basic education,
                    which seeks to transform learners and
                    nurture leaders who are responsive to
                    the needs of the global society.
                  </p>

                  <div className="mt-10 border-t border-orange-200 pt-7">
                    <p className="text-lg font-extrabold italic text-[#176B49]">
                      Doribabs... Seeing Is Believing!
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: OUR FOUNDER
          ================================================== */}

      <section className="overflow-hidden bg-[#F6F9F6] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <span className="h-0.5 w-8 bg-orange-500" />
                Leadership & Legacy
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Meet Our
                <span className="mt-2 block text-[#176B49]">
                  Founder
                </span>
              </h2>

              <h3 className="mt-7 text-2xl font-extrabold text-slate-900">
                Madam Doris Baaba Simpson
              </h3>

              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-orange-700">
                Founder & Proprietress
              </p>

              <div className="mt-7 space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  Doribabs School Complex was established
                  through the vision of Madam Doris Baaba
                  Simpson, who sought to contribute to
                  national development by improving access
                  to quality holistic basic education.
                </p>

                <p>
                  Having previously overseen premises
                  used as a girls&apos; hostel, she recognised
                  an opportunity to transform that
                  educational environment into a basic
                  school serving young learners.
                </p>

                <p>
                  Her founding vision places emphasis
                  on discipline, Christian values,
                  academic achievement and the discovery
                  of each learner&apos;s potential.
                </p>
              </div>

              <div className="mt-9 rounded-2xl border-l-4 border-[#F4A43C] bg-white px-6 py-5">
                <p className="text-sm font-semibold leading-7 text-slate-700">
                  A founding commitment to quality,
                  affordable and holistic education
                  continues to guide the school today.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Founder portrait */}
          <Reveal delay={0.1}>
            <div className="relative pb-9">
              <div className="relative aspect-[4/4.7] overflow-hidden rounded-[2rem] bg-green-100 shadow-xl">
                <Image
                  src="/images/founder.jpg"
                  alt="Madam Doris Baaba Simpson, Founder and Proprietress of Doribabs School Complex"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute -bottom-1 left-4 right-4 rounded-2xl bg-[#176B49] p-6 text-white shadow-xl sm:left-8 sm:right-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFCA75]">
                  Founder & Proprietress
                </p>

                <p className="mt-2 text-xl font-extrabold">
                  Madam Doris Baaba Simpson
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: CORE VALUES
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                The Doribabs Way
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Our Core Values
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                These values reflect the principles
                that guide our educational environment,
                relationships and responsibilities.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal
                  key={value.title}
                  delay={Math.min(index * 0.05, 0.25)}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49] transition group-hover:bg-[#176B49] group-hover:text-white">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold leading-snug text-slate-900">
                      {value.title}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: EDUCATIONAL PHILOSOPHY
          ================================================== */}

      <section className="bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFCA75]">
                <Lightbulb size={18} />
                Our Educational Philosophy
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Educating the
                <span className="block text-[#F4A43C]">
                  Whole Child
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-white/75 sm:text-base">
                We believe education extends beyond academic
                knowledge to the intellectual, spiritual,
                moral, social, emotional and physical
                development of every learner.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {educationalPillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <Reveal
                  key={pillar.number}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <article className="h-full rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4A43C] text-[#103D2C]">
                        <Icon size={26} />
                      </div>

                      <span className="text-5xl font-black text-white/10">
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-extrabold">
                      {pillar.title}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-white/70">
                      {pillar.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: OUR JOURNEY
          ================================================== */}

      <section className="bg-[#F8FAF8] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Our Journey
              </span>

              <h2 className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-5xl">
                Milestones Through the Years
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                From its earliest beginnings to notable
                educational achievements, every milestone
                forms part of the Doribabs story.
              </p>
            </div>
          </Reveal>

          <div className="relative mx-auto max-w-4xl">
            {/* Timeline line */}
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-4 top-5 w-px bg-green-200 sm:left-6"
            />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <Reveal
                  key={item.year}
                  delay={Math.min(index * 0.05, 0.2)}
                >
                  <div className="relative pl-12 sm:pl-16">
                    <div className="absolute left-1 top-7 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#F8FAF8] bg-[#176B49] sm:left-3" />

                    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                      <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-orange-600">
                        {item.year}
                      </p>

                      <h3 className="mt-3 text-xl font-extrabold text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-8 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: CELEBRATING EXCELLENCE
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[5/4.5] overflow-hidden rounded-[2rem] bg-orange-50">
              <Image
                src="/images/school-achievement-and-award4.jpg"
                alt="Doribabs School Complex school award and achievement"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Award size={18} />
                Proud Achievements
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                A Commitment to
                <span className="mt-2 block text-[#176B49]">
                  Academic Excellence
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                Doribabs School Complex has received
                recognition for academic achievement,
                reflecting its emphasis on quality
                teaching, effective learning and
                disciplined educational development.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "2018 B.E.C.E. Presidential Award Winner — Central Region",
                  "2018 Best B.E.C.E. School — Central Region",
                  "Recognition for outstanding learner performance and staff dedication",
                ].map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-start gap-3 rounded-xl bg-[#F5F9F6] p-4"
                  >
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-[#176B49]"
                    />

                    <p className="text-sm font-semibold leading-7 text-slate-700">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/achievements"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                Explore Our Achievements
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: ADMISSIONS CTA
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#176B49] px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#F4A43C]/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-[#FFCA75]">
              <GraduationCap size={17} />
              Become Part of Our Story
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Discover What Makes
              <span className="mt-2 block text-[#FFCA75]">
                Doribabs Special.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Give your child the opportunity to learn
              and grow in a school community committed
              to academic excellence, discipline and
              holistic development.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#123B29] transition hover:-translate-y-0.5 hover:bg-[#FFCA75]"
              >
                Explore Admissions
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
