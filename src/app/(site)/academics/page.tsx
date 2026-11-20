
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  MessageCircle,
  Palette,
  School,
  Sparkles,
  Users,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

// ======================================================
// METADATA
// ======================================================

export const metadata: Metadata = {
  title: "Academics | Doribabs School Complex",
  description:
    "Explore academic programmes at Doribabs School Complex, from Creche, Nursery and Kindergarten through Primary School and Junior High School. Discover our subjects, practical learning and academic support.",
  openGraph: {
    title: "Academics | Doribabs School Complex",
    description:
      "Discover quality holistic education from Pre-School through Junior High School at Doribabs School Complex.",
    images: [
      {
        url: "/images/computer-lab2.jpg",
        alt: "Learning at Doribabs School Complex",
      },
    ],
  },
};

// ======================================================
// SCHOOL PROGRAMMES
// ======================================================

const programmes = [
  {
    number: "01",
    label: "EARLY CHILDHOOD",
    title: "Pre-School",
    levels: "Creche • Nursery • Kindergarten",
    description:
      "A supportive beginning that introduces young learners to language, numeracy, creativity and the world around them.",
    image: "/images/random-students-picture4.jpg",
    href: "#preschool",
  },
  {
    number: "02",
    label: "FOUNDATIONAL EDUCATION",
    title: "Primary School",
    levels: "Basic 1 – Basic 6",
    description:
      "Building essential knowledge, communication skills, curiosity and strong learning habits.",
    image: "/images/computer-lab3.jpeg",
    href: "#primary",
  },
  {
    number: "03",
    label: "PREPARATION FOR THE FUTURE",
    title: "Junior High School",
    levels: "JHS 1 – JHS 3",
    description:
      "Developing subject knowledge, practical competencies, discipline and readiness for further education.",
    image: "/images/science-lab-section14.jpeg",
    href: "#jhs",
  },
] as const;

// ======================================================
// DETAILED ACADEMIC LEVELS
// ======================================================

const academicLevels = [
  {
    id: "preschool",
    label: "The First Steps",
    number: "01",
    title: "Pre-School Education",
    subtitle: "Creche, Nursery & Kindergarten",
    introduction:
      "A positive introduction to learning, exploration and early childhood development.",
    description:
      "Our pre-school programme develops the early foundations of communication, numeracy, creativity and understanding of the world. The learning experience is designed to support young children as they begin their educational journey.",
    mainImage: "/images/random-students-picture6.jpg",
    secondaryImage: "/images/games-and-fun8.jpg",
    mainAlt: "Learners participating in Doribabs school life",
    secondaryAlt: "School games and recreational activity",
    subjects: [
      "Language and Literacy",
      "Our World, Our People",
      "Numeracy",
      "Creative Arts",
    ],
    note:
      "A nurturing learning environment encourages confidence, curiosity and positive early learning experiences.",
    background: "bg-[#FFF9F2]",
  },
  {
    id: "primary",
    label: "Growing Knowledge",
    number: "02",
    title: "Primary School",
    subtitle: "Basic 1 – Basic 6",
    introduction:
      "Strengthening the essential skills needed for continued academic progress.",
    description:
      "At the primary level, learners develop understanding across literacy, mathematics, science, computing, history, languages and creative subjects. Classroom instruction is complemented by opportunities for practical participation and exploration.",
    mainImage: "/images/computer-lab4.jpeg",
    secondaryImage: "/images/exams-preparation3.jpeg",
    mainAlt: "Doribabs computer laboratory learning activities",
    secondaryAlt: "Learners engaged in academic preparation",
    subjects: [
      "English Language",
      "Mathematics (Numeracy)",
      "Science",
      "Religious and Moral Education",
      "History of Ghana",
      "Computing",
      "Ghanaian Language (Fante)",
      "French",
      "Creative Arts and Design",
    ],
    note:
      "The programme supports literacy, numeracy, intellectual curiosity and broad-based foundational knowledge.",
    background: "bg-white",
  },
  {
    id: "jhs",
    label: "The Next Chapter",
    number: "03",
    title: "Junior High School",
    subtitle: "JHS 1 – JHS 3",
    introduction:
      "Preparing learners for further academic study and responsible participation in society.",
    description:
      "Our Junior High School programme builds on the primary foundation with more advanced subject learning, practical competencies and academic preparation. Learners are encouraged to develop responsibility, confidence, critical thinking and independent learning skills.",
    mainImage: "/images/science-lab-section15.jpeg",
    secondaryImage: "/images/computer-lab10.jpeg",
    mainAlt: "Science learning activities at Doribabs School Complex",
    secondaryAlt: "Computer laboratory activities at Doribabs",
    subjects: [
      "English Language",
      "Mathematics",
      "Integrated Science",
      "Social Studies",
      "Religious and Moral Education",
      "Computing",
      "Career Technology",
      "Ghanaian Language (Fante)",
      "French",
      "Creative Arts and Design",
    ],
    note:
      "Learners develop the knowledge, values and competencies needed for their next stage of education.",
    background: "bg-[#F4F8F5]",
  },
] as const;

// ======================================================
// TEACHING METHODS
// ======================================================

const teachingMethods = [
  {
    title: "Classroom Instruction",
    description:
      "Structured theoretical teaching supports a clear understanding of concepts and subject knowledge.",
    image: "/images/exams-preparation2.jpeg",
    icon: BookOpen,
  },
  {
    title: "Practical Learning",
    description:
      "Hands-on and activity-based lessons help learners connect classroom ideas with practical experience.",
    image: "/images/science-lab-section11.jpg",
    icon: FlaskConical,
  },
  {
    title: "Interactive Learning",
    description:
      "Active learner participation encourages discussion, curiosity, confidence and engagement.",
    image: "/images/computer-lab7.jpg",
    icon: Users,
  },
  {
    title: "Creative Development",
    description:
      "Creative arts and school activities provide opportunities for expression, teamwork and talent development.",
    image: "/images/school-culture-dance3.jpg",
    icon: Palette,
  },
] as const;

// ======================================================
// PHOTO COLLECTION
// ======================================================

const galleryPhotos = [
  {
    src: "/images/science-lab-section16.jpg",
    alt: "Science laboratory activities at Doribabs",
    label: "Science & Discovery",
  },
  {
    src: "/images/computer-lab2.jpg",
    alt: "Doribabs computer laboratory",
    label: "Digital Learning",
  },
  {
    src: "/images/exams-preparation6.jpeg",
    alt: "Doribabs learners preparing for examinations",
    label: "Academic Preparation",
  },
  {
    src: "/images/random-students-acting.jpg",
    alt: "School learners participating in dramatic activities",
    label: "Creative Expression",
  },
  {
    src: "/images/school-culture-dance4.jpg",
    alt: "Cultural activities at Doribabs School Complex",
    label: "Culture & Creativity",
  },
  {
    src: "/images/school-achievement-and-award21.jpg",
    alt: "Doribabs school achievement and awards",
    label: "Celebrating Achievement",
  },
] as const;

// ======================================================
// ACADEMICS PAGE
// ======================================================

export default function AcademicsPage() {
  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: ACADEMICS HERO
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] text-white">
        <Image
          src="/images/school-borad-with-some-tudent-group-pics2.jpg"
          alt="Doribabs School Complex learners and school community"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/85 to-[#071C12]/65" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">

          {/* Hero text */}
          <Reveal>
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs font-semibold text-white/75"
              >
                <Link
                  href="/"
                  className="transition hover:text-[#FFCA75]"
                >
                  Home
                </Link>

                <ChevronRight size={15} />

                <span className="text-[#FFCA75]">
                  Academics
                </span>
              </nav>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  Learning at Doribabs
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Inspiring
                <span className="block text-[#F4B45C]">
                  Young Minds.
                </span>
                Shaping Futures.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                Discover a learner-centred approach
                to education that encourages academic
                excellence, practical skills,
                creativity and character development.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#programmes"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  Explore Our Programmes
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Admissions
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Hero photo collage */}
          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                <Image
                  src="/images/computer-lab1.jpg"
                  alt="Computer studies at Doribabs School Complex"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/science-lab-section12.jpg"
                  alt="Doribabs science learning activities"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/random-students-picture8.jpg"
                  alt="Learners at Doribabs School Complex"
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
          SECTION 2: ACADEMICS INTRODUCTION
          ================================================== */}

      <section className="bg-white px-5 py-18 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <BookOpen size={17} />
                Our Educational Commitment
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Learning That Develops
                <span className="block text-[#176B49]">
                  the Whole Child
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                At Doribabs School Complex, we provide
                quality, holistic and learner-centred
                education. Our educational programmes
                promote academic understanding, practical
                competence, confidence, creativity
                and positive character development.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                The school follows Ghana&apos;s curriculum
                and syllabus prescribed by the National
                Council for Curriculum and Assessment
                (NaCCA), with educational programmes
                structured to develop relevant knowledge,
                competencies, values and life skills.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#EAF5EE] p-6 sm:p-8">
                <GraduationCap
                  size={30}
                  className="text-[#176B49]"
                />

                <p className="mt-6 text-2xl font-black text-slate-900 sm:text-3xl">
                  3
                </p>

                <p className="mt-2 text-sm font-medium text-slate-600">
                  Educational Stages
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF1E2] p-6 sm:p-8">
                <School
                  size={30}
                  className="text-orange-700"
                />

                <p className="mt-6 text-xl font-black text-slate-900 sm:text-2xl">
                  Creche–JHS
                </p>

                <p className="mt-2 text-sm font-medium text-slate-600">
                  Levels Available
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-[#103D2C] p-6 text-white sm:p-8">
                <div className="flex items-center gap-3">
                  <Lightbulb
                    size={29}
                    className="text-[#FFCA75]"
                  />

                  <p className="text-lg font-extrabold">
                    Knowledge, Skills & Values
                  </p>
                </div>

                <p className="mt-4 text-sm leading-8 text-white/75">
                  Combining classroom instruction,
                  practical learning and active learner
                  participation to support meaningful
                  educational development.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: EDUCATIONAL LEVELS OVERVIEW
          ================================================== */}

      <section
        id="programmes"
        className="scroll-mt-32 bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Our Learning Journey
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Explore Our Programmes
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Every stage of learning provides
                opportunities for learners to discover,
                develop and prepare for what comes next.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {programmes.map((programme, index) => (
              <Reveal
                key={programme.number}
                delay={index * 0.1}
                className="h-full"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={programme.image}
                      alt={`${programme.title} school learning photograph`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                    <span className="absolute bottom-5 left-5 text-5xl font-black text-white/80">
                      {programme.number}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-orange-600">
                      {programme.label}
                    </p>

                    <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
                      {programme.title}
                    </h3>

                    <p className="mt-2 text-xs font-bold text-green-700">
                      {programme.levels}
                    </p>

                    <p className="mt-5 flex-1 text-sm leading-8 text-slate-600">
                      {programme.description}
                    </p>

                    <Link
                      href={programme.href}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49] transition group-hover:gap-3"
                    >
                      Explore This Level
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: PROGRAMME DETAILS
          ================================================== */}

      {academicLevels.map((level, index) => (
        <section
          key={level.id}
          id={level.id}
          className={`scroll-mt-32 px-5 py-20 sm:px-8 lg:py-28 ${level.background}`}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Photo collage */}
            <Reveal
              className={index % 2 === 1 ? "lg:order-2" : ""}
            >
              <div className="relative pb-10 pr-10">
                <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-slate-100">
                  <Image
                    src={level.mainImage}
                    alt={level.mainAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-2 right-0 w-[55%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={level.secondaryImage}
                      alt={level.secondaryAlt}
                      fill
                      sizes="(max-width: 1024px) 55vw, 28vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <span className="absolute left-5 top-5 rounded-full bg-[#176B49] px-4 py-2 text-xs font-bold text-white shadow-md">
                  {level.subtitle}
                </span>
              </div>
            </Reveal>

            {/* Text and subjects */}
            <Reveal
              delay={0.1}
              className={index % 2 === 1 ? "lg:order-1" : ""}
            >
              <div>
                <span className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600">
                  <span className="h-0.5 w-8 bg-[#F4A43C]" />
                  {level.label}
                </span>

                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  {level.title}
                </h2>

                <p className="mt-5 text-lg font-bold leading-8 text-[#176B49]">
                  {level.introduction}
                </p>

                <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                  {level.description}
                </p>

                {/* Subjects */}
                <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                    <BookOpen
                      size={21}
                      className="text-green-700"
                    />
                    Subjects & Learning Areas
                  </h3>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {level.subjects.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-[#176B49]"
                        />

                        <span className="text-sm leading-6 text-slate-600">
                          {subject}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-6 border-l-4 border-[#F4A43C] pl-4 text-sm italic leading-7 text-slate-600">
                  {level.note}
                </p>

                <Link
                  href="/admissions"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
                >
                  Explore Admissions
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ==================================================
          SECTION 5: TEACHING & LEARNING APPROACH
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Lightbulb size={18} />
                How We Teach
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Learning Beyond the Textbook
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Our teaching approach combines theoretical
                knowledge with practical and interactive
                learning activities.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachingMethods.map((method, index) => {
              const Icon = method.icon;

              return (
                <Reveal
                  key={method.title}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={method.image}
                        alt={method.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="-mt-12 relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#176B49] text-white shadow-lg">
                        <Icon size={23} />
                      </div>

                      <h3 className="mt-6 text-lg font-extrabold text-slate-950">
                        {method.title}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                        {method.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: ASSESSMENT & SUPPORT
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-green-100 bg-white p-7 sm:p-10">
                <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-green-50 text-[#176B49]">
                  <ClipboardCheck size={28} />
                </div>

                <h2 className="mt-7 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                  Examinations & Assessment
                </h2>

                <p className="mt-5 text-sm leading-8 text-slate-600">
                  Learner progress is evaluated using
                  continuous assessment and formal
                  examinations. These help teachers monitor
                  achievement and identify areas requiring
                  additional support.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Continuous classroom assessment",
                    "Mid-term examinations",
                    "End-of-term examinations",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-1 shrink-0 text-[#176B49]"
                      />

                      <p className="text-sm font-medium leading-7 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-3xl border border-orange-100 bg-[#FFF4E8] p-7 sm:p-10">
                <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-white text-orange-700">
                  <HeartHandshake size={28} />
                </div>

                <h2 className="mt-7 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                  Academic Support & Enrichment
                </h2>

                <p className="mt-5 text-sm leading-8 text-slate-600">
                  We recognise that learners have different
                  academic needs and abilities. The school
                  provides additional learning support to
                  reinforce classroom teaching and improve
                  understanding.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Remedial lessons",
                    "Extra classes",
                    "Additional academic assistance",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-1 shrink-0 text-orange-600"
                      />

                      <p className="text-sm font-medium leading-7 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: ACADEMIC LIFE PHOTO GALLERY
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <Sparkles size={18} />
                  Life at Doribabs
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Learning in Pictures
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-500">
                  A photographic look at the educational
                  activities and experiences that form
                  part of life at Doribabs.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49] transition hover:gap-3"
              >
                View Full Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={Math.min(index * 0.06, 0.3)}
                className={
                  index < 2 ? "col-span-2" : ""
                }
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      index < 2
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-60 transition group-hover:opacity-90" />

                  <p className="absolute bottom-4 left-4 right-4 text-sm font-extrabold text-white sm:text-base">
                    {photo.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: CURRICULUM & CALENDAR
          ================================================== */}

      <section className="bg-[#F8FAF8] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <Reveal>
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
                <Image
                  src="/images/exams-preparation1.jpeg"
                  alt="Doribabs students engaged in academic preparation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/images/science-lab-section10.jpg"
                  alt="School science learning environment"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/images/computer-lab8.jpeg"
                  alt="School computing learning environment"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <CalendarDays size={18} />
                Academic Planning
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                An Organised
                <span className="block text-[#176B49]">
                  Academic Calendar
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                The school operates an academic calendar
                to guide teaching, learning, assessments
                and educational activities throughout
                each term.
              </p>

              <div className="mt-7 rounded-2xl border border-green-100 bg-white p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-orange-600">
                  School-Supplied Calendar
                </p>

                <h3 className="mt-3 text-lg font-extrabold text-slate-900">
                  First Term — 2026/2027
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The supplied first-term schedule covers
                  activities from September through
                  December 2026, including revision,
                  monthly tests, mid-term examinations,
                  end-of-term examinations and vacation.
                </p>
              </div>

              <Link
                href="/academic-calendar"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
              >
                View Academic Calendar
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: ADMISSIONS CTA
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#F4A43C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#FFCA75]">
              <GraduationCap size={17} />
              Begin Your Journey
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A Strong Foundation
              <span className="block text-[#F4A43C]">
                for Every Learner.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Explore an educational environment where
              academic learning, personal growth and
              character development work together to
              prepare learners for the future.
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
                Contact the School
                <MessageCircle size={18} />
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
