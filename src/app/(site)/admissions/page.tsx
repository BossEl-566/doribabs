
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  BookOpen,
  Bus,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

// ======================================================
// PAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: "Admissions & Enrolment | Doribabs School Complex",
  description:
    "Learn how to apply to Doribabs School Complex. Explore admission requirements, entrance examinations, application steps, fees, and day and boarding education from Pre-School to JHS.",
  openGraph: {
    title: "Admissions | Doribabs School Complex",
    description:
      "Begin your child's educational journey at Doribabs School Complex. Discover admission requirements, the application process and school life.",
    images: [
      {
        url: "/images/random-students-picture1.jpg",
        alt: "Doribabs School Complex learners",
      },
    ],
  },
};

// ======================================================
// CONTACT DETAILS
// ======================================================

const PRIMARY_PHONE = "+233244896582";
const SECONDARY_PHONE = "+233549932991";

const ADMISSIONS_EMAIL =
  "mailto:doribabsschool@gmail.com?subject=Admission%20Enquiry%20-%20Doribabs";

const FORM_REQUEST_EMAIL =
  "mailto:doribabsschool@gmail.com?subject=Request%20for%20Admission%20Form";

const PROSPECTUS_REQUEST_EMAIL =
  "mailto:doribabsschool@gmail.com?subject=Request%20for%20School%20Prospectus";

const WHATSAPP_LINK =
  "https://wa.me/233549932991?text=Hello%20Doribabs%20School%20Complex%2C%20I%20would%20like%20to%20enquire%20about%20admissions.";

const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=4QVM%2B8HJ%2C%20Moree%2C%20Ghana";

// ======================================================
// ADMISSION LEVELS
// ======================================================

const admissionLevels = [
  {
    number: "01",
    title: "Pre-School",
    subtitle: "Creche, Nursery & Kindergarten",
    image: "/images/random-students-picture4.jpg",
    description:
      "An introduction to learning, creativity, language, numeracy and early childhood development.",
    examination: "No entrance examination required",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Primary School",
    subtitle: "Basic 1 – Basic 6",
    image: "/images/computer-lab3.jpeg",
    description:
      "A foundation in literacy, numeracy, science, computing, languages and other essential subjects.",
    examination: "Entrance examination required",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Junior High School",
    subtitle: "JHS 1 – JHS 3",
    image: "/images/science-lab-section14.jpeg",
    description:
      "Subject knowledge, practical competencies and preparation for further academic study.",
    examination: "Entrance examination required",
    icon: GraduationCap,
  },
] as const;

// ======================================================
// APPLICATION PROCESS
// ======================================================

const applicationSteps = [
  {
    number: "01",
    title: "Visit the School",
    description:
      "Visit the Doribabs premises to enquire about available places, receive guidance and arrange an entrance examination where applicable.",
  },
  {
    number: "02",
    title: "Obtain Admission Documents",
    description:
      "Collect the school's admission form and prospectus from the administration. Contact the school to request copies.",
  },
  {
    number: "03",
    title: "Complete and Submit the Form",
    description:
      "Carefully complete the admission form and submit it to the school administration.",
  },
  {
    number: "04",
    title: "Make the Prescribed Payment",
    description:
      "Pay the required admission charges using the school's approved payment instructions. Confirm the current amount and account details with the administration.",
  },
  {
    number: "05",
    title: "Confirm Enrolment",
    description:
      "Contact the school administration for admission confirmation and any remaining enrolment requirements.",
  },
] as const;

// ======================================================
// FEE CATEGORIES
// ======================================================

const feeCategories = [
  {
    title: "Entrance Examination",
    description:
      "Applicable to prospective learners who must take the entrance examination.",
  },
  {
    title: "Admission Fee",
    description:
      "Required for admission and enrolment of new learners.",
  },
  {
    title: "School Fees",
    description:
      "Academic and school-related charges, payable every term.",
  },
  {
    title: "Uniforms",
    description:
      "Cost of the prescribed school uniforms.",
  },
  {
    title: "Books",
    description:
      "Required textbooks and other learning materials.",
  },
  {
    title: "Boarding Fee",
    description:
      "Applicable to boarding learners and payable every term.",
  },
  {
    title: "PTA Dues",
    description:
      "Parent-Teacher Association contributions, payable every term.",
  },
  {
    title: "Teacher Motivation & Examination",
    description:
      "Contributions relating to staff motivation and examinations.",
  },
  {
    title: "Transportation",
    description:
      "Applicable to day learners who use the school's bus service.",
  },
] as const;

// ======================================================
// SCHOOL PHOTO COLLECTION
// ======================================================

const schoolMoments = [
  {
    image: "/images/school-culture-dance3.jpg",
    alt: "Cultural activities at Doribabs School Complex",
    label: "Culture & Creativity",
  },
  {
    image: "/images/computer-lab6.jpg",
    alt: "Computer learning activities at Doribabs",
    label: "Digital Learning",
  },
  {
    image: "/images/games-and-fun5.jpg",
    alt: "Doribabs learners participating in school games",
    label: "Play & Development",
  },
  {
    image: "/images/regimental-band2.jpg",
    alt: "Doribabs regimental band activities",
    label: "School Activities",
  },
  {
    image: "/images/assembly1.jpeg",
    alt: "School assembly at Doribabs",
    label: "School Community",
  },
  {
    image: "/images/school-achievement-and-award9.jpg",
    alt: "Doribabs School Complex achievements",
    label: "Celebrating Excellence",
  },
] as const;

// ======================================================
// FAQ CONTENT
// ======================================================

const questions = [
  {
    question: "What is the minimum age for admission?",
    answer:
      "Doribabs School Complex admits children from two years of age, subject to meeting the relevant admission requirements and availability of places.",
  },
  {
    question: "Does every applicant take an entrance examination?",
    answer:
      "No. The entrance examination applies to Primary School and Junior High School applicants. Pre-School applicants are not required to take the examination.",
  },
  {
    question: "How do I obtain an admission form?",
    answer:
      "Parents and guardians can visit the school premises to collect the admission form and prospectus, or contact the school to request the documents.",
  },
  {
    question: "Does the school offer boarding?",
    answer:
      "Yes. Doribabs School Complex offers day and boarding education. Parents should contact the administration about boarding arrangements, availability and applicable charges.",
  },
  {
    question: "How can school fees be paid?",
    answer:
      "The school accepts bank payments and Mobile Money. Parents must contact the administration or finance office for the approved account details and payment instructions.",
  },
  {
    question: "Can I obtain the current fee structure?",
    answer:
      "Yes. Contact the school administration or finance office for the current admission fee, school fees and other applicable charges. Current amounts are not published on this page.",
  },
] as const;

// ======================================================
// ADMISSIONS PAGE
// ======================================================

export default function AdmissionsPage() {
  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          SECTION 1: ADMISSIONS HERO
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] text-white">
        <Image
          src="/images/school-building-and-compound4.jpg"
          alt="Doribabs School Complex school premises"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/90 to-[#071C12]/70" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">

          {/* Hero text */}
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
                  Admissions
                </span>
              </nav>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#F4A43C]" />

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                  Admissions & Enrolment
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                A Great
                <span className="block text-[#F4B45C]">
                  Beginning.
                </span>
                A Brighter Future.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                Begin your child&apos;s learning journey
                in a school community committed to
                academic excellence, discipline,
                character development and holistic education.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#application-process"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#123B29] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFCA75]"
                >
                  How to Apply
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="#admissions-enquiry"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Make an Enquiry
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2
                  size={18}
                  className="text-[#FFCA75]"
                />
                Applications subject to available places
              </p>
            </div>
          </Reveal>

          {/* Hero collage */}
          <Reveal delay={0.12}>
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl border border-white/20">
                <Image
                  src="/images/random-students-picture1.jpg"
                  alt="Students of Doribabs School Complex"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/school-borad-with-some-tudent-group-pics1.jpg"
                  alt="Doribabs school community group photograph"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/random-students-picture7.jpg"
                  alt="Learners at Doribabs School Complex"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/20 bg-[#176B49] px-5 py-4 shadow-xl sm:-left-5">
                <p className="text-2xl font-black">
                  2+
                </p>

                <p className="mt-1 text-xs font-semibold text-white/85">
                  Minimum Admission Age
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: QUICK ADMISSION FACTS
          ================================================== */}

      <section className="border-b border-slate-100 bg-white px-5 py-9 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3 md:divide-x md:divide-slate-100">
          {[
            {
              icon: School,
              value: "2 Years & Above",
              label: "Minimum Admission Age",
            },
            {
              icon: GraduationCap,
              value: "Pre-School to JHS",
              label: "Educational Levels",
            },
            {
              icon: HeartHandshake,
              value: "Day & Boarding",
              label: "School Options",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.value}
                delay={index * 0.08}
                className="flex items-center gap-4 md:px-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49]">
                  <Icon size={25} />
                </div>

                <div>
                  <p className="text-lg font-extrabold text-slate-900">
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
          SECTION 3: EDUCATIONAL LEVELS
          ================================================== */}

      <section className="bg-[#F6F9F6] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Find Your Starting Point
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Where Your Child Can Begin
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Doribabs offers education from early
                childhood through Junior High School,
                supporting learners at different stages
                of development.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {admissionLevels.map((level, index) => {
              const Icon = level.icon;

              return (
                <Reveal
                  key={level.number}
                  delay={index * 0.1}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={level.image}
                        alt={`${level.title} - Doribabs school life`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                      <span className="absolute bottom-5 left-5 text-5xl font-black text-white/90">
                        {level.number}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#176B49]">
                        <Icon size={24} />
                      </div>

                      <h3 className="mt-6 text-2xl font-extrabold text-slate-950">
                        {level.title}
                      </h3>

                      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-orange-700">
                        {level.subtitle}
                      </p>

                      <p className="mt-5 flex-1 text-sm leading-8 text-slate-600">
                        {level.description}
                      </p>

                      <div className="mt-6 flex items-start gap-2 rounded-xl bg-[#F5F8F5] p-4">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-[#176B49]"
                        />

                        <span className="text-xs font-bold leading-6 text-slate-700">
                          {level.examination}
                        </span>
                      </div>

                      <Link
                        href="/academics"
                        className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#176B49] transition group-hover:gap-3"
                      >
                        Explore Programme
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: HOW TO APPLY
          ================================================== */}

      <section
        id="application-process"
        className="scroll-mt-32 bg-white px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <ClipboardCheck size={18} />
                The Admission Process
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                How to Apply
                <span className="block text-[#176B49]">
                  to Doribabs
                </span>
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Follow these steps to begin your
                child&apos;s admission and enrolment
                process at Doribabs School Complex.
              </p>
            </div>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Five application steps */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-10 left-6 top-7 w-px bg-green-200"
              />

              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <Reveal
                    key={step.number}
                    delay={Math.min(index * 0.05, 0.2)}
                  >
                    <div className="relative flex gap-5">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#176B49] text-sm font-extrabold text-white shadow-md">
                        {step.number}
                      </div>

                      <div className="flex-1 rounded-2xl border border-slate-100 bg-[#FAFCFA] p-5 transition duration-300 hover:border-green-200 hover:shadow-md sm:p-6">
                        <h3 className="text-lg font-extrabold text-slate-950">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-8 text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* School visit photo collection */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-32">
                <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-3xl bg-slate-100">
                  <Image
                    src="/images/school-building-and-compound1.jpg"
                    alt="The Doribabs School Complex environment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/images/exams-preparation2.jpeg"
                    alt="Doribabs students involved in academic preparation"
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-[#103D2C] p-5 text-white">
                  <MapPin
                    size={27}
                    className="text-[#FFCA75]"
                  />

                  <p className="mt-5 text-lg font-extrabold">
                    Visit Our Campus
                  </p>

                  <p className="mt-2 text-xs leading-6 text-white/75">
                    Moree Toll Booth,
                    Accra–Takoradi Highway,
                    Ghana.
                  </p>

                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#FFCA75] hover:underline"
                  >
                    Get Directions
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: ENTRANCE EXAMINATION REQUIREMENTS
          ================================================== */}

      <section className="bg-[#FFF7EE] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                <ShieldCheck size={18} />
                Admission Eligibility
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Understanding Our
                <span className="block text-[#176B49]">
                  Admission Requirements
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                The entrance examination requirement
                depends on the educational level for which
                admission is being sought.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Minimum age",
                    description:
                      "Children must be at least two years old.",
                  },
                  {
                    title: "Pre-School applicants",
                    description:
                      "No entrance examination is required.",
                  },
                  {
                    title: "Primary School applicants",
                    description:
                      "An entrance examination is required.",
                  },
                  {
                    title: "Junior High School applicants",
                    description:
                      "An entrance examination is required.",
                  },
                  {
                    title: "Availability of places",
                    description:
                      "Admission is subject to available spaces.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-orange-100 bg-white p-4"
                  >
                    <CheckCircle2
                      size={21}
                      className="mt-1 shrink-0 text-[#176B49]"
                    />

                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100">
                <Image
                  src="/images/exams-preparation6.jpeg"
                  alt="Learners preparing for examinations at Doribabs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/images/computer-lab7.jpg"
                  alt="Learners in the school computer laboratory"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-[#176B49] p-5 text-white">
                <GraduationCap
                  size={29}
                  className="text-[#FFCA75]"
                />

                <p className="mt-4 text-lg font-extrabold">
                  Need Guidance?
                </p>

                <p className="mt-2 text-xs leading-6 text-white/80">
                  Contact the school for entrance examination
                  arrangements and available places.
                </p>

                <a
                  href={`tel:${PRIMARY_PHONE}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#FFCA75] hover:underline"
                >
                  Call Admissions
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: DAY AND BOARDING
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Learning Arrangements
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Day & Boarding Education
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Doribabs School Complex offers day and
                boarding education. Parents can discuss
                the available arrangements with the school
                administration during the admissions process.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className="group h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src="/images/school-building-and-compound3.jpg"
                    alt="School grounds at Doribabs School Complex"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-7 sm:p-9">
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-green-50 text-[#176B49]">
                    <Bus size={26} />
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
                    Day School
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600">
                    Day learners attend the school&apos;s
                    academic and educational activities.
                    Parents intending to use the school bus
                    service should enquire about transport
                    arrangements and applicable charges.
                  </p>

                  <Link
                    href="#admissions-enquiry"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176B49]"
                  >
                    Enquire About Day School
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <article className="group h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src="/images/student-at-dinning-hall-1.jpg"
                    alt="Dining activities at Doribabs School Complex"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-7 sm:p-9">
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                    <BedDouble size={26} />
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
                    Boarding School
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600">
                    Boarding education is also available.
                    Parents should contact the administration
                    to learn about boarding availability,
                    enrolment arrangements and the termly
                    boarding fee.
                  </p>

                  <Link
                    href="#admissions-enquiry"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176B49]"
                  >
                    Enquire About Boarding
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: ADMISSION FORMS & PROSPECTUS
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
                  <Image
                    src="/images/school-borad-with-some-tudent-group-pics1.jpg"
                    alt="Doribabs School Complex group photograph"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/images/random-students-picture9.jpg"
                    alt="Doribabs learners"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/images/school-building-and-compound2.jpg"
                    alt="Doribabs School Complex campus"
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
                  <FileText size={18} />
                  Admission Documents
                </span>

                <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Admission Form
                  <span className="block text-[#176B49]">
                    & Prospectus
                  </span>
                </h2>

                <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                  Parents and guardians can obtain the
                  school&apos;s admission form and
                  prospectus from the administration.
                  These documents provide guidance on
                  the next steps towards enrolment.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  The school&apos;s document does not
                  include the actual downloadable files.
                  Until the PDFs are added to the website,
                  you can request copies directly.
                </p>

                <div className="mt-8 space-y-4">
                  <a
                    href={FORM_REQUEST_EMAIL}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#176B49]">
                        <FileText size={24} />
                      </div>

                      <div>
                        <p className="font-extrabold text-slate-900">
                          Admission Form
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Request a copy by email
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={19}
                      className="shrink-0 text-[#176B49]"
                    />
                  </a>

                  <a
                    href={PROSPECTUS_REQUEST_EMAIL}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                        <BookOpen size={24} />
                      </div>

                      <div>
                        <p className="font-extrabold text-slate-900">
                          School Prospectus
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Request a copy by email
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={19}
                      className="shrink-0 text-[#176B49]"
                    />
                  </a>
                </div>

                <p className="mt-5 text-xs leading-6 text-slate-500">
                  Physical copies can also be obtained
                  by visiting the school administration.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: FEES & PAYMENT INFORMATION
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  <Wallet size={18} />
                  Fees & Payments
                </span>

                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Understanding School
                  <span className="block text-[#176B49]">
                    Fees & Charges
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                  The school has different fee categories
                  depending on the learner&apos;s level,
                  enrolment status and applicable services.
                  Parents should contact the finance office
                  for current amounts.
                </p>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100">
                <Image
                  src="/images/school-borad-with-some-tudent-group-pics-with-awards.jpg"
                  alt="Doribabs school community and achievements"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Fee categories */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feeCategories.map((fee, index) => (
              <Reveal
                key={fee.title}
                delay={Math.min(index * 0.04, 0.2)}
                className="h-full"
              >
                <article className="h-full rounded-2xl border border-slate-100 bg-[#FAFCFA] p-6 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-[#176B49]"
                    />

                    <div>
                      <h3 className="text-base font-extrabold text-slate-950">
                        {fee.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {fee.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Payment information */}
          <Reveal>
            <div className="mt-10 grid gap-6 rounded-3xl bg-[#103D2C] p-7 text-white md:grid-cols-2 sm:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <CreditCard
                    size={26}
                    className="text-[#FFCA75]"
                  />

                  <h3 className="text-xl font-extrabold">
                    Accepted Payments
                  </h3>
                </div>

                <p className="mt-5 text-sm leading-8 text-white/80">
                  The school accepts bank payments and
                  Mobile Money (MoMo). Contact the finance
                  office for approved account information
                  and payment instructions.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={26}
                    className="text-[#FFCA75]"
                  />

                  <h3 className="text-xl font-extrabold">
                    Payment Schedule
                  </h3>
                </div>

                <p className="mt-5 text-sm leading-8 text-white/80">
                  School fees and PTA dues are payable
                  every term. Boarding fees are payable
                  every term for boarding learners.
                  Required new-admission payments must be
                  made before admission is finalised.
                </p>
              </div>

              <div className="border-t border-white/15 pt-6 md:col-span-2">
                <p className="text-sm font-semibold text-[#FFCA75]">
                  Important payment reminder
                </p>

                <p className="mt-2 text-sm leading-7 text-white/75">
                  Confirm all account details and current
                  charges directly with the school
                  administration before making payment.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: SCHOOL LIFE PHOTO GALLERY
          ================================================== */}

      <section className="bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                  Discover Doribabs
                </span>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Life Beyond the Classroom
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600">
                  School life also includes creative
                  experiences, student activities,
                  teamwork and meaningful achievements.
                  Explore moments captured around Doribabs.
                </p>
              </div>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#176B49] transition hover:gap-3"
              >
                Explore Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {schoolMoments.map((moment, index) => (
              <Reveal
                key={moment.image}
                delay={Math.min(index * 0.06, 0.3)}
                className={index < 2 ? "col-span-2" : ""}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes={
                      index < 2
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />

                  <p className="absolute bottom-4 left-4 right-4 text-sm font-extrabold text-white sm:text-base">
                    {moment.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: FREQUENTLY ASKED QUESTIONS
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Parent Information
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Frequently Asked Questions
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
                Answers to common questions about
                admissions, entrance examinations,
                school fees and enrolment.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {questions.map((item, index) => (
              <Reveal
                key={item.question}
                delay={Math.min(index * 0.04, 0.2)}
              >
                <details className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-200 open:border-green-200 open:bg-[#F8FBF8] sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-extrabold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {item.question}

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-xl text-[#176B49]">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>

                  <p className="mt-5 border-t border-slate-100 pt-5 text-sm leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 11: ADMISSIONS ENQUIRIES
          ================================================== */}

      <section
        id="admissions-enquiry"
        className="scroll-mt-32 bg-[#F6F9F6] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <HeartHandshake size={18} />
                Talk to Our Team
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                We&apos;re Here to
                <span className="block text-[#176B49]">
                  Guide You
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                Contact the school administration, finance
                office or proprietress for admissions
                guidance, available places, admission
                documents and current fees.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${PRIMARY_PHONE}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-[#176B49]">
                    <Phone size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Primary Contact
                    </p>

                    <p className="mt-1 font-extrabold text-slate-950">
                      +233 24 489 6582
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${SECONDARY_PHONE}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                    <Phone size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Alternative Contact
                    </p>

                    <p className="mt-1 font-extrabold text-slate-950">
                      +233 54 993 2991
                    </p>
                  </div>
                </a>

                <a
                  href={ADMISSIONS_EMAIL}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-[#176B49]">
                    <Mail size={23} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">
                      Email Admissions
                    </p>

                    <p className="mt-1 break-all text-sm font-extrabold text-slate-950">
                      doribabsschool@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
                >
                  Enquire on WhatsApp
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-4 text-sm font-bold text-[#176B49] transition hover:bg-green-50"
                >
                  Get Directions
                  <MapPin size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-green-100">
                <Image
                  src="/images/random-students-picture2.jpg"
                  alt="Doribabs School Complex learners"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-[#103D2C] p-6 text-white shadow-xl sm:left-8 sm:right-8">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFCA75]">
                  Visit Our School
                </p>

                <p className="mt-2 text-base font-extrabold">
                  Moree Toll Booth
                </p>

                <p className="mt-2 text-xs leading-6 text-white/75">
                  Accra–Takoradi Highway, Ghana
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          SECTION 12: CLOSING CTA
          ================================================== */}

      <section className="relative isolate overflow-hidden bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-28">
        <Image
          src="/images/school-borad-with-some-tudent-group-pics10.jpg"
          alt="Doribabs School Complex school community"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#071C12]/85" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-[#FFCA75]">
              <GraduationCap size={17} />
              Begin the Journey
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s Build
              <span className="block text-[#F4A43C]">
                a Brighter Future.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Discover a school community committed to
              learning, discipline, character development
              and preparing children for the future.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${PRIMARY_PHONE}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#123B29] transition hover:bg-[#FFCA75]"
              >
                Call Admissions
                <Phone size={18} />
              </a>

              <Link
                href="/academics"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Explore Academics
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
