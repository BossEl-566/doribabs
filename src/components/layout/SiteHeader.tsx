
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";

type NavigationItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  {
    label: "News & Events",
    href: "/blog",
    children: [
      { label: "Latest News & Blog", href: "/blog" },
      { label: "School Events", href: "/events" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    return (
      pathname === href ||
      (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* ======================================
          TOP INFORMATION BAR
          ====================================== */}
      <div className="hidden bg-[#103D2C] text-white md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-6 px-5 text-xs sm:px-8">
          <div className="flex items-center gap-5">
            <a
              href="tel:+233244896582"
              className="inline-flex items-center gap-2 text-white/90 transition hover:text-[#FFCB72]"
            >
              <Phone size={13} />
              +233 24 489 6582
            </a>

            <a
              href="mailto:doribabsschool@gmail.com"
              className="hidden items-center gap-2 text-white/90 transition hover:text-[#FFCB72] lg:inline-flex"
            >
              <Mail size={13} />
              doribabsschool@gmail.com
            </a>

            <span className="hidden items-center gap-2 text-white/80 xl:inline-flex">
              <MapPin size={13} />
              Moree Toll Booth, Ghana
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden font-semibold text-[#FFCB72] lg:inline">
              Doribabs... Seeing Is Believing!
            </span>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/doribabsschool"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Doribabs on Facebook"
                className="text-white/90 transition hover:text-[#FFCB72]"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://wa.me/233244896582"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Doribabs on WhatsApp"
                className="text-white/90 transition hover:text-[#FFCB72]"
              >
                <FaWhatsapp size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================
          MAIN HEADER
          ====================================== */}
      <header className="border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          {/* School logo and identity */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 shrink-0 items-center gap-3"
          >
            <div className="relative flex h-15 w-15 shrink-0 items-center justify-center">
              <Image
                src="/images/doribabs-logo.png"
                alt="Doribabs School Complex logo"
                width={64}
                height={64}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-black leading-tight tracking-tight text-[#133E2E] sm:text-xl">
                DORIBABS
              </p>

              <p className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">
                School Complex
              </p>

              <p className="mt-1 hidden text-[10px] font-semibold italic text-[#E88B39] sm:block">
                Seeing Is Believing!
              </p>
            </div>
          </Link>

          {/* ======================================
              DESKTOP NAVIGATION
              ====================================== */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navigation.map((item) => {
              const active = item.children
                ? item.children.some((child) =>
                    isActive(child.href)
                  )
                : isActive(item.href);

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="group relative"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-3 text-[13px] font-bold transition ${
                        active
                          ? "bg-[#EBF5EE] text-[#176B49]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#176B49]"
                      }`}
                    >
                      {item.label}

                      <ChevronDown
                        size={14}
                        className="transition group-hover:rotate-180"
                      />
                    </Link>

                    <div className="invisible absolute left-0 top-full z-50 w-58 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                              isActive(child.href)
                                ? "bg-green-50 text-[#176B49]"
                                : "text-slate-700 hover:bg-green-50 hover:text-[#176B49]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-[13px] font-bold transition ${
                    active
                      ? "bg-[#EBF5EE] text-[#176B49]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#176B49]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop admissions button */}
          <Link
            href="/admissions"
            className="hidden shrink-0 items-center gap-2 rounded-xl bg-[#176B49] px-4 py-3.5 text-xs font-bold text-white shadow-md shadow-green-900/10 transition hover:bg-[#115237] xl:inline-flex"
          >
            Apply for Admission
            <ArrowUpRight size={17} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="public-mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#176B49] transition hover:bg-green-50 xl:hidden"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      {/* ======================================
          MOBILE / TABLET NAVIGATION
          ====================================== */}
      {mobileOpen && (
        <div
          id="public-mobile-navigation"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-xl xl:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl space-y-1 px-5 py-5 sm:px-8"
          >
            {navigation.map((item) => {
              const active = item.children
                ? item.children.some((child) =>
                    isActive(child.href)
                  )
                : isActive(item.href);

              return (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                      active
                        ? "bg-[#EBF5EE] text-[#176B49]"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}

                    {item.children ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ArrowUpRight
                        size={16}
                        className="text-slate-400"
                      />
                    )}
                  </Link>

                  {item.children && (
                    <div className="ml-4 space-y-1 border-l-2 border-green-100 py-1 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={`block rounded-lg px-4 py-3 text-sm transition ${
                            isActive(child.href)
                              ? "bg-green-50 font-semibold text-[#176B49]"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4">
              <Link
                href="/admissions"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176B49] px-5 py-4 text-sm font-bold text-white"
              >
                Apply for Admission
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-slate-100 px-4 py-5 text-xs text-slate-500">
              <a href="tel:+233244896582">
                +233 24 489 6582
              </a>

              <a href="mailto:doribabsschool@gmail.com">
                Email School
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
