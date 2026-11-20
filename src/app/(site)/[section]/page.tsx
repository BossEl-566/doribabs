
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Mail,
  Phone,
} from "lucide-react";

const sections: Record<
  string,
  { title: string; description: string }
> = {
  about: {
    title: "About Doribabs",
    description:
      "Learn about our story, founder, mission, vision and values.",
  },
  academics: {
    title: "Our Academics",
    description:
      "Explore our Creche, Nursery, Kindergarten, Primary and Junior High School programmes.",
  },
  admissions: {
    title: "Admissions",
    description:
      "Discover our admission requirements, application procedure and school information.",
  },
  "student-life": {
    title: "Student Life",
    description:
      "Explore the activities and experiences that support the growth of our learners.",
  },
  facilities: {
    title: "School Facilities",
    description:
      "Discover the learning spaces and facilities available at Doribabs.",
  },
  achievements: {
    title: "School Achievements",
    description:
      "Celebrate the academic accomplishments and distinctions of Doribabs School Complex.",
  },
  "academic-calendar": {
    title: "Academic Calendar",
    description:
      "Find important school term dates and academic activities.",
  },
  "school-policies": {
    title: "School Policies",
    description:
      "Learn about the guidelines and expectations of our school community.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with Doribabs School Complex for enquiries and school information.",
  },
};

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const page = sections[section];

  return {
    title: page
      ? `${page.title} | Doribabs School Complex`
      : "Page Not Found",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SectionPage({
  params,
}: SectionPageProps) {
  const { section } = await params;
  const page = sections[section];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-[65vh] bg-[#F7FAF7] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="mt-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">
            <BookOpen size={16} />
            Doribabs School Complex
          </span>

          <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            {page.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600">
            {page.description}
          </p>

          {section === "contact" ? (
            <div className="mt-10 space-y-4 rounded-2xl border border-green-100 bg-white p-7">
              <a
                href="tel:+233244896582"
                className="flex items-center gap-3 text-sm font-semibold text-green-800"
              >
                <Phone size={19} />
                +233 24 489 6582
              </a>

              <a
                href="tel:+233549932991"
                className="flex items-center gap-3 text-sm font-semibold text-green-800"
              >
                <Phone size={19} />
                +233 54 993 2991
              </a>

              <a
                href="mailto:doribabsschool@gmail.com"
                className="flex items-center gap-3 break-all text-sm font-semibold text-green-800"
              >
                <Mail size={19} />
                doribabsschool@gmail.com
              </a>

              <p className="text-sm leading-7 text-slate-600">
                Moree Toll Booth, Accra–Takoradi Highway,
                Ghana.
              </p>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-green-100 bg-white p-7">
              <p className="text-sm font-semibold text-green-800">
                This section is being developed.
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                The complete page will be added during
                the next website development phases.
              </p>
            </div>
          )}

          <Link
            href="/"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#176B49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#105638]"
          >
            Explore Doribabs
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
