
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";

const quickLinks = [
  { label: "About Doribabs", href: "/about" },
  { label: "Our Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  { label: "School Facilities", href: "/facilities" },
  { label: "Our Achievements", href: "/achievements" },
];

const resourceLinks = [
  { label: "News & Blog", href: "/blog" },
  { label: "School Events", href: "/events" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Academic Calendar", href: "/academic-calendar" },
  { label: "School Policies", href: "/school-policies" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#103D2C] text-white">
      {/* ======================================
          TOP CALL TO ACTION
          ====================================== */}
      <div className="border-b border-white/15 bg-[#165339]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFCB72]">
              Become Part of the Doribabs Family
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Give your child a strong foundation.
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Discover our programmes and admissions process.
            </p>
          </div>

          <Link
            href="/admissions"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#183A2A] transition hover:bg-[#FFCA75]"
          >
            Explore Admissions
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      {/* ======================================
          MAIN FOOTER CONTENT
          ====================================== */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* School identity */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-4"
          >
            <div className="flex h-19 w-19 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
              <Image
                src="/images/doribabs-logo.png"
                alt="Doribabs School Complex logo"
                width={70}
                height={70}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-2xl font-black leading-tight tracking-tight">
                DORIBABS
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-white/70">
                School Complex
              </p>
            </div>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-8 text-white/70">
            Doribabs School Complex is committed to
            holistic education, academic excellence,
            discipline, and character development in a
            nurturing environment rooted in Christian values.
          </p>

          <p className="mt-5 text-sm font-bold italic text-[#FFCB72]">
            Doribabs... Seeing Is Believing!
          </p>

          {/* Social links */}
          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://www.facebook.com/doribabsschool"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Doribabs on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition hover:bg-[#F4A43C] hover:text-[#103D2C]"
            >
              <FaFacebookF size={19} />
            </a>

            <a
              href="https://wa.me/233244896582"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Doribabs on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition hover:bg-[#F4A43C] hover:text-[#103D2C]"
            >
              <FaWhatsapp size={19} />
            </a>

            <a
              href="mailto:doribabsschool@gmail.com"
              aria-label="Email Doribabs School Complex"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition hover:bg-[#F4A43C] hover:text-[#103D2C]"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-extrabold">
            Explore
          </h3>

          <div className="mt-4 h-1 w-10 rounded-full bg-[#F4A43C]" />

          <ul className="mt-7 space-y-4">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#FFCB72]"
                >
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-extrabold">
            Useful Links
          </h3>

          <div className="mt-4 h-1 w-10 rounded-full bg-[#F4A43C]" />

          <ul className="mt-7 space-y-4">
            {resourceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#FFCB72]"
                >
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact information */}
        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="text-base font-extrabold">
            Get in Touch
          </h3>

          <div className="mt-4 h-1 w-10 rounded-full bg-[#F4A43C]" />

          <div className="mt-7 space-y-6">
            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin
                size={19}
                className="mt-1 shrink-0 text-[#FFCB72]"
              />

              <div className="text-sm leading-7 text-white/70">
                <p className="font-semibold text-white">
                  Our Location
                </p>

                <p>
                  Moree Toll Booth,
                  <br />
                  Accra–Takoradi Highway,
                  <br />
                  Ghana
                </p>

                <p className="mt-1">
                  P.O. Box AD 658, Cape Coast
                </p>
              </div>
            </div>

            {/* Telephone */}
            <div className="flex items-start gap-3">
              <Phone
                size={19}
                className="mt-1 shrink-0 text-[#FFCB72]"
              />

              <div className="space-y-1 text-sm">
                <p className="font-semibold text-white">
                  Call Us
                </p>

                <a
                  href="tel:+233244896582"
                  className="block text-white/70 hover:text-[#FFCB72]"
                >
                  +233 24 489 6582
                </a>

                <a
                  href="tel:+233549932991"
                  className="block text-white/70 hover:text-[#FFCB72]"
                >
                  +233 54 993 2991
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail
                size={19}
                className="mt-1 shrink-0 text-[#FFCB72]"
              />

              <div className="min-w-0 text-sm">
                <p className="font-semibold text-white">
                  Email Address
                </p>

                <a
                  href="mailto:doribabsschool@gmail.com"
                  className="mt-1 block break-all text-white/70 hover:text-[#FFCB72]"
                >
                  doribabsschool@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================
          BOTTOM FOOTER
          ====================================== */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center text-xs text-white/60 sm:px-8 md:flex-row md:text-left">
          <p>
            Doribabs School Complex. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/school-policies"
              className="transition hover:text-white"
            >
              School Policies
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/admin/login"
              className="transition hover:text-white"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
