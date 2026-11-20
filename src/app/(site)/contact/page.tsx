
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

import ContactHeroCarousel from
  "@/components/public/contact-hero-carousel";

import ContactEnquiryForm from
  "@/components/public/contact-enquiry-form";

// ======================================================
// METADATA
// ======================================================

export const metadata: Metadata = {
  title: "Contact Us | Doribabs School Complex",
  description:
    "Contact Doribabs School Complex at Moree Toll Booth, Accra–Takoradi Highway, Ghana. Find phone numbers, WhatsApp, email, directions and admission enquiry information.",
  openGraph: {
    title: "Contact Doribabs School Complex",
    description:
      "Get in touch with Doribabs School Complex for admissions, school fees, academics and general enquiries.",
    images: [
      {
        url: "/images/school-building-and-compound4.jpg",
        alt: "Doribabs School Complex campus",
      },
    ],
  },
};

// ======================================================
// OFFICIAL SCHOOL CONTACT INFORMATION
// ======================================================

const PRIMARY_PHONE = "tel:+233244896582";

const ALTERNATIVE_PHONE = "tel:+233549932991";

const EMAIL = "mailto:doribabsschool@gmail.com";

const WHATSAPP =
  "https://wa.me/233549932991?text=Hello%20Doribabs%20School%20Complex%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

const MAP_DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=4QVM%2B8HJ%2C%20Moree%2C%20Ghana";

const MAP_EMBED =
  "https://www.google.com/maps?q=4QVM%2B8HJ%2C%20Moree%2C%20Ghana&output=embed";

// ======================================================
// CONTACT METHODS
// ======================================================

const contactMethods = [
  {
    title: "Call Our Office",
    label: "Primary Contact",
    value: "+233 24 489 6582",
    description:
      "Call the school for admission, academic and general enquiries.",
    href: PRIMARY_PHONE,
    icon: Phone,
    action: "Call Now",
  },
  {
    title: "Alternative Contact",
    label: "Telephone",
    value: "+233 54 993 2991",
    description:
      "Another direct contact number for reaching the school.",
    href: ALTERNATIVE_PHONE,
    icon: Phone,
    action: "Call Now",
  },
  {
    title: "WhatsApp",
    label: "Send a Message",
    value: "+233 54 993 2991",
    description:
      "Start a WhatsApp conversation with the school.",
    href: WHATSAPP,
    icon: MessageCircle,
    action: "Open WhatsApp",
  },
  {
    title: "Email Us",
    label: "Official School Email",
    value: "doribabsschool@gmail.com",
    description:
      "Send your school-related enquiry using our official email address.",
    href: EMAIL,
    icon: Mail,
    action: "Write Email",
  },
] as const;

// ======================================================
// FREQUENTLY ASKED QUESTIONS
// ======================================================

const questions = [
  {
    question: "Where is Doribabs School Complex located?",
    answer:
      "Doribabs School Complex is located at Moree Toll Booth along the Accra–Takoradi Highway in Ghana. Our Google Maps Plus Code is 4QVM+8HJ.",
  },
  {
    question: "How do I enquire about admissions?",
    answer:
      "You can call either of the school's telephone numbers, send a WhatsApp message, email the school, or visit the administration. Children from two years of age may apply, subject to admission requirements and available places.",
  },
  {
    question: "Can I get information about school fees?",
    answer:
      "Yes. Contact the school administration or finance office for the current fee structure and approved payment instructions.",
  },
  {
    question: "Does Doribabs offer day and boarding education?",
    answer:
      "Yes. Doribabs School Complex offers both day and boarding education. Contact the school for current arrangements and availability.",
  },
  {
    question: "How do I obtain an admission form?",
    answer:
      "Parents and guardians can collect the school's admission form and prospectus from the school administration or contact the school to request the documents.",
  },
  {
    question: "Can I contact the school through WhatsApp?",
    answer:
      "Yes. The school lists both +233 24 489 6582 and +233 54 993 2991 as WhatsApp contact numbers.",
  },
] as const;

// ======================================================
// CONTACT PAGE
// ======================================================

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-white">

      {/* ==================================================
          1. ANIMATED HERO CAROUSEL
          ================================================== */}

      <ContactHeroCarousel />

      {/* ==================================================
          2. CONTACT INTRODUCTION
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Introduction */}
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <HeartHandshake size={18} />
                Welcome to Doribabs
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                We&apos;d Love to
                <span className="mt-2 block text-[#176B49]">
                  Hear From You.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
                At Doribabs School Complex, we value
                communication and collaboration with
                parents, guardians, prospective learners
                and members of our community.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
                Whether you&apos;re interested in admissions,
                academic programmes, boarding,
                school fees or other school-related
                information, our team is available
                to assist with your enquiries.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Admissions and enrolment enquiries",
                  "Academic programmes and school life",
                  "School fees and payment information",
                  "Directions and school visits",
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
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#105638]"
              >
                Learn About Our School
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>

          {/* School photograph collage */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100">
                <Image
                  src="/images/school-borad-with-some-tudent-group-pics6.jpg"
                  alt="Doribabs School Complex community photograph"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/images/school-building-and-compound1.jpg"
                  alt="Doribabs school buildings and compound"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/images/random-students-picture6.jpg"
                  alt="Learners of Doribabs School Complex"
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
          3. CONTACT METHODS
          ================================================== */}

      <section
        id="contact-details"
        className="scroll-mt-32 bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Phone size={18} />
                Contact Information
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Get in Touch With Us
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                Choose the contact method most
                convenient for you.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;

              return (
                <Reveal
                  key={method.title}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-7">
                    <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#176B49] transition group-hover:bg-[#176B49] group-hover:text-white">
                      <Icon size={27} />
                    </div>

                    <p className="mt-7 text-xs font-extrabold uppercase tracking-wide text-orange-600">
                      {method.label}
                    </p>

                    <h3 className="mt-3 text-xl font-extrabold text-slate-950">
                      {method.title}
                    </h3>

                    <p className="mt-3 break-all text-sm font-bold text-[#176B49]">
                      {method.value}
                    </p>

                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
                      {method.description}
                    </p>

                    <a
                      href={method.href}
                      target={
                        method.href.startsWith("https")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        method.href.startsWith("https")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-7 inline-flex items-center gap-2 self-start text-sm font-extrabold text-[#176B49] transition group-hover:gap-3"
                    >
                      {method.action}
                      <ArrowUpRight size={18} />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. ENQUIRY FORM
          ================================================== */}

      <section
        id="enquiry"
        className="scroll-mt-32 bg-white px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <Mail size={18} />
                Make an Enquiry
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Send Us a Message
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Tell us what youd like to know.
                Prepare your enquiry below and
                continue in your email application.
              </p>
            </div>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">

            {/* Form */}
            <Reveal>
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-9">
                <ContactEnquiryForm />
              </div>
            </Reveal>

            {/* Supporting information */}
            <Reveal delay={0.1}>
              <div className="space-y-6">

                <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-green-100">
                  <Image
                    src="/images/school-building-and-compound4.jpg"
                    alt="Doribabs School Complex school premises"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

                <div className="rounded-3xl bg-[#103D2C] p-7 text-white sm:p-9">
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-white/10 text-[#FFCA75]">
                    <GraduationCap size={27} />
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold">
                    Admissions Enquiries
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-white/75">
                    Interested in enrolling your child
                    at Doribabs? Explore our admission
                    requirements, application steps,
                    day and boarding information.
                  </p>

                  <Link
                    href="/admissions"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
                  >
                    Explore Admissions
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <div className="rounded-3xl border border-orange-100 bg-[#FFF5E9] p-7">
                  <div className="flex items-center gap-3">
                    <ShieldCheck
                      size={25}
                      className="text-orange-700"
                    />

                    <h3 className="text-lg font-extrabold text-slate-900">
                      Important Information
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-8 text-slate-600">
                    For admission fees, school fees and
                    payment instructions, contact the
                    school administration directly.
                    Always confirm approved payment
                    details before making a transfer.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. FIND OUR SCHOOL
          ================================================== */}

      <section
        id="visit-school"
        className="scroll-mt-32 bg-[#F5F8F5] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                <MapPinned size={18} />
                Find Us
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Visit Doribabs School Complex
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                Our school is located at Moree Toll
                Booth along the Accra–Takoradi Highway.
                Use the map or directions link below
                to find the campus.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-7 lg:grid-cols-[1.3fr_0.7fr]">

            {/* Google Maps */}
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <iframe
                  title="Map showing Doribabs School Complex at Moree Toll Booth"
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[360px] w-full border-0 sm:h-[470px] lg:h-[540px]"
                  allowFullScreen
                />

                <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <p className="font-extrabold text-slate-900">
                      Doribabs School Complex
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Moree Toll Booth, Ghana
                    </p>
                  </div>

                  <a
                    href={MAP_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#105638]"
                  >
                    Open in Google Maps
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Address details */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-5">

                <div className="rounded-3xl bg-[#103D2C] p-7 text-white sm:p-9">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#FFCA75]">
                    <MapPin size={28} />
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold">
                    School Address
                  </h3>

                  <p className="mt-5 text-sm leading-8 text-white/85">
                    Doribabs School Complex
                    <span className="block">
                      Moree Toll Booth
                    </span>
                    <span className="block">
                      Accra–Takoradi Highway
                    </span>
                    <span className="block">
                      Ghana
                    </span>
                  </p>

                  <div className="mt-7 border-t border-white/15 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFCA75]">
                      Google Maps Plus Code
                    </p>

                    <p className="mt-2 text-xl font-extrabold">
                      4QVM+8HJ
                    </p>
                  </div>

                  <div className="mt-7 border-t border-white/15 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFCA75]">
                      Postal Address
                    </p>

                    <p className="mt-2 text-sm leading-7 text-white/85">
                      P. O. Box AD 658
                      <span className="block">
                        Cape Coast, Ghana
                      </span>
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[180px] flex-1 overflow-hidden rounded-3xl bg-slate-100">
                  <Image
                    src="/images/school-borad-with-some-tudent-group-pics8.jpg"
                    alt="Doribabs School Complex learners"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. FREQUENTLY ASKED QUESTIONS
          ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">

          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
                Helpful Information
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Frequently Asked Questions
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                Find answers to common enquiries
                about Doribabs School Complex.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {questions.map((item, index) => (
              <Reveal
                key={item.question}
                delay={Math.min(index * 0.05, 0.2)}
              >
                <details className="group rounded-2xl border border-slate-200 bg-white p-5 transition open:border-green-200 open:bg-[#F8FBF8] sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-extrabold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.question}

                    <ChevronDown
                      size={20}
                      className="shrink-0 text-[#176B49] transition-transform group-open:rotate-180"
                    />
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
          7. CLOSING CONTACT CTA
          ================================================== */}

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
              Join the Doribabs Community
            </span>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Lets Start
              <span className="mt-2 block text-[#F4A43C]">
                the Conversation.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              Whether you&apos;re exploring admission,
              planning a school visit or looking
              for more information, we&apos;re here
              to help you connect with Doribabs.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={PRIMARY_PHONE}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
              >
                Call Our Office
                <Phone size={18} />
              </a>

              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Explore Admissions
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
