
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login | Doribabs School Complex",
  description:
    "Secure administration portal for Doribabs School Complex.",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#F7F9F6] lg:grid lg:grid-cols-2">
      {/* Left: Login area */}
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="mb-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176B49] font-bold text-white">
              D
            </div>

            <div>
              <p className="text-base font-extrabold leading-tight text-slate-950">
                DORIBABS
              </p>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                SCHOOL COMPLEX
              </p>
            </div>
          </Link>

          <span className="text-xs font-medium text-slate-400">
            ADMIN PORTAL
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center pb-12">
          <LoginForm accessDenied={error === "access_denied"} />
        </div>

        <div className="text-center text-xs text-slate-400">
          &copy; Doribabs School Complex. All rights reserved.
        </div>
      </section>

      {/* Right: School photograph */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#164D3B] lg:block">
        <Image
          src="/images/school-building-and-compound4.jpg"
          alt="Doribabs School Complex campus"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3023]/95 via-[#174D39]/70 to-[#174D39]/20" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-12 pb-16 xl:px-20">
          <div className="mb-8 h-1 w-16 rounded-full bg-orange-400" />

          <p className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Nurturing minds.
            <br />
            Building character.
            <br />
            Inspiring excellence.
          </p>

          <p className="mt-6 max-w-md text-base leading-7 text-white/80">
            Dedicated to quality holistic education,
            discipline, moral development, and preparing
            tomorrow&apos;s leaders.
          </p>

          <div className="mt-12 border-t border-white/20 pt-6">
            <p className="text-sm font-semibold text-orange-300">
              Doribabs... Seeing Is Believing!
            </p>

            <p className="mt-2 text-sm text-white/60">
              Excellence in education since 2009
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
