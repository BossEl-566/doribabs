
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Quote,
  School,
  Users,
} from "lucide-react";

import Reveal from "@/components/animation/Reveal";

// ======================================================
// LEADERSHIP PROFILES
// ======================================================

type Leader = {
  id: string;
  name: string;
  position: string;
  eyebrow: string;
  image?: string;
  initials: string;
  heading: string;
  paragraphs: string[];
  principles?: string[];
  closing?: string;
  motto?: string;
  highlights?: string[];
};

const leaders: Leader[] = [
  {
    id: "headteacher",
    name: "Mr. Jonathan Kwame Kwakye",
    position: "Headteacher",
    eyebrow: "A Welcome Message",
    initials: "JK",
    heading: "A Warm Welcome From Our Headteacher",
    paragraphs: [
      "Akwaaba! You are warmly welcome to Doribabs School Complex, Moree Junction, near Cape Coast.",

      "At Doribabs, we are more than a school; we are a family committed to nurturing the total child through quality education, strong Christian values, discipline, and love.",

      "From Creche, Nursery and Kindergarten to Primary and Junior High School, we provide a safe, supportive, and stimulating environment where every child is encouraged to discover their talents, develop their potential, and achieve academic excellence.",

      "Our dedicated teachers combine effective teaching, practical learning, and Godly training to develop confident, disciplined, and well-rounded learners prepared for future success.",

      "We remain guided by our principles:",

      "To our prospective parents, we invite you to experience the Doribabs difference. To our continuing parents, thank you for your trust and partnership.",

      "You are warmly welcome to Doribabs School Complex!",
    ],
    principles: [
      "Doribabs – Seeing Is Believing!",
      "Doribabs – Trust and Obey!",
      "Doribabs – We Originate, They Imitate!",
    ],
    closing: "Yours faithfully,",
  },
  {
    id: "founder",
    name: "Mrs. Doris Baaba Simpson Aikins",
    position: "Founder",
    eyebrow: "A Message From the Founder",
    image: "/images/founder.jpg",
    initials: "DS",
    heading: "A Vision Built on Education and Purpose",
    paragraphs: [
      "It is my great pleasure to welcome you to Doribabs School Complex, an institution established out of a passion for quality education and a desire to nurture the potential in every child.",

      "Since our establishment in 2009, our vision has been to provide holistic, affordable, and quality education rooted in Christian values, discipline, and academic excellence. Our journey has been guided by the belief that every child has unique abilities and deserves the opportunity to learn, grow, and succeed.",

      "As we continue to grow, we remain committed to shaping responsible, God-fearing, disciplined, and accomplished individuals who will positively impact society.",

      "I invite you to be part of our journey as we continue to inspire, transform lives, and nurture future leaders.",
    ],
    motto: "Doribabs School Complex – Seeing Is Believing!",
  },
  {
    id: "proprietress",
    name: "Mrs. Roberta Sackey",
    position: "Proprietress",
    eyebrow: "A Message From the Proprietress",
    image: "/images/roberta-sackey.jpg",
    initials: "RS",
    heading: "Every Child Deserves the Opportunity to Excel",
    paragraphs: [
      "Welcome to Doribabs School Complex!",

      "At Doribabs, we are committed to providing a friendly, supportive, and stimulating learning environment where every child is valued, encouraged, and empowered to achieve their full potential.",

      "Our dedicated team of professional teachers and staff works collaboratively to promote academic excellence, moral discipline, Christian values, creativity, and the holistic development of our learners.",

      "We recognise the importance of strong partnerships between the school and parents in shaping the future of every child. We therefore look forward to working together with you to provide the guidance, support, and quality education our children deserve.",

      "Thank you for trusting Doribabs School Complex to be part of your child's educational journey. Together, let us build a foundation for a brighter future.",
    ],
    motto: "Doribabs School Complex – Seeing Is Believing!",
  },
  {
    id: "board-chair",
    name: "Mr. Frederick Badu-Mensah",
    position: "Board Chair",
    eyebrow: "Meet Our Board Chair",
    image: "/images/frederick-badu.jpg",
    initials: "FB",
    heading: "Experience, Leadership and Educational Excellence",
    paragraphs: [
      "Mr. Frederick Badu-Mensah is the Regional Human Resource Officer of the Ghana Education Service, Central Region, Cape Coast, with 29 years of dedicated service to education.",

      "He began as a classroom teacher and was named Best Teacher in the Central Region (JHS category). He rose to headteacher, then served at the district level as Circuit Supervisor, Training Officer, Private School Coordinator and District Human Resource Officer before his appointment to the regional office.",

      "He holds a Master's degree in Human Resource Management and is a certified mediator, skills he applies to staff welfare, conflict resolution and workforce development.",

      "Educated in Cape Coast and the wider Central Region, he combines classroom experience with professional expertise in human resource management.",
    ],
    highlights: [
      "29 Years of Service to Education",
      "Regional Human Resource Officer, GES",
      "Master's in Human Resource Management",
      "Certified Mediator",
    ],
  },
];

// ======================================================
// LEADER PORTRAIT
// ======================================================

function LeaderPortrait({
  leader,
}: {
  leader: Leader;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[470px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#E6F0E8] shadow-xl">
        {leader.image ? (
          <Image
            src={leader.image}
            alt={`Portrait of ${leader.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 470px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#176B49] via-[#105038] to-[#092B1D] p-8 text-white">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/30 bg-white/15 text-5xl font-black tracking-tight">
              {leader.initials}
            </div>

            <p className="mt-7 text-center text-xl font-extrabold">
              {leader.name}
            </p>

            <p className="mt-2 text-center text-sm text-white/75">
              {leader.position}
            </p>
          </div>
        )}
      </div>

      <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-[#103D2C] px-6 py-5 text-white shadow-xl sm:left-8 sm:right-8">
        <p className="text-lg font-extrabold">
          {leader.name}
        </p>

        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFCA75]">
          {leader.position}
        </p>
      </div>
    </div>
  );
}

// ======================================================
// LEADERSHIP MESSAGE
// ======================================================

function LeadershipMessage({
  leader,
  index,
}: {
  leader: Leader;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={leader.id}
      aria-labelledby={`${leader.id}-heading`}
      className={`scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28 ${
        index % 2 === 0
          ? "bg-white"
          : "bg-[#F6F9F6]"
      }`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

        {/* Portrait */}
        <Reveal
          className={
            reversed ? "lg:order-2" : ""
          }
        >
          <LeaderPortrait leader={leader} />
        </Reveal>

        {/* Message */}
        <Reveal
          delay={0.12}
          className={
            reversed ? "lg:order-1" : ""
          }
        >
          <article className="pt-5 lg:pt-0">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-9 bg-[#F4A43C]" />

              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                {leader.eyebrow}
              </p>
            </div>

            <h2
              id={`${leader.id}-heading`}
              className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            >
              {leader.heading}
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <Quote
                size={27}
                className="text-[#F4A43C]"
              />

              <span className="text-sm font-bold text-[#176B49]">
                {leader.position}&apos;s Message
              </span>
            </div>

            <div className="mt-7 space-y-5">
              {leader.paragraphs.map(
                (paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-sm leading-8 text-slate-600 sm:text-base"
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

            {/* Headteacher's guiding principles */}
            {leader.principles && (
              <div className="mt-8 rounded-2xl border-l-4 border-[#F4A43C] bg-[#F0F7F2] p-6 sm:p-7">
                <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#176B49]">
                  Our Guiding Principles
                </p>

                <div className="space-y-3">
                  {leader.principles.map((principle) => (
                    <p
                      key={principle}
                      className="text-sm font-extrabold leading-7 text-[#103D2C]"
                    >
                      {principle}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Board Chair's professional background */}
            {leader.highlights && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {leader.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-xl border border-green-100 bg-white p-4"
                  >
                    <Award
                      size={19}
                      className="mt-1 shrink-0 text-[#176B49]"
                    />

                    <p className="text-sm font-bold leading-6 text-slate-700">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Closing statements */}
            {(leader.closing || leader.motto) && (
              <div className="mt-9 border-t border-slate-200 pt-7">
                {leader.closing && (
                  <p className="mb-4 text-sm italic text-slate-600">
                    {leader.closing}
                  </p>
                )}

                {leader.motto && (
                  <p className="mb-5 text-sm font-extrabold italic text-[#176B49]">
                    {leader.motto}
                  </p>
                )}
              </div>
            )}

            <div className="mt-7">
              <p className="text-lg font-extrabold text-slate-950">
                {leader.name}
              </p>

              <p className="mt-1 text-sm font-semibold text-[#176B49]">
                {leader.position}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Doribabs School Complex
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

// ======================================================
// LEADERSHIP MESSAGES COMPONENT
// ======================================================

export default function LeadershipMessages() {
  return (
    <div id="leadership">

      {/* Introduction */}
      <section className="bg-[#103D2C] px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFCA75]">
                A Word From Our Leadership
              </p>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Guided by Vision.
                <span className="mt-2 block text-[#F4A43C]">
                  United by Purpose.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-8 text-white/80 sm:text-base">
                Our school leadership shares a
                commitment to quality education,
                Christian values, discipline,
                character development and the
                holistic growth of every learner.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#headteacher"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-6 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
                >
                  Read Our Messages
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  About Doribabs
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src="/images/school-borad-with-some-tudent-and-teachers-group-pics.jpg"
                  alt="Doribabs School Complex staff and learners"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-5">
                <BookOpen
                  size={26}
                  className="shrink-0 text-[#FFCA75]"
                />
                <span className="text-xs font-bold">
                  Academic Excellence
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-5">
                <HeartHandshake
                  size={26}
                  className="shrink-0 text-[#FFCA75]"
                />
                <span className="text-xs font-bold">
                  Character & Values
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Four messages and profiles */}
      {leaders.map((leader, index) => (
        <LeadershipMessage
          key={leader.id}
          leader={leader}
          index={index}
        />
      ))}

      {/* Closing CTA */}
      <section className="bg-[#103D2C] px-5 py-20 text-center text-white sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <GraduationCap
              size={37}
              className="mx-auto text-[#F4A43C]"
            />

            <h2 className="mt-6 text-3xl font-extrabold sm:text-5xl">
              Be Part of the
              <span className="block text-[#F4A43C]">
                Doribabs Family.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/80">
              Discover a school committed to
              inspiring learners, developing
              character and preparing future leaders.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4A43C] px-7 py-4 text-sm font-extrabold text-[#103D2C] transition hover:bg-[#FFCA75]"
              >
                Explore Admissions
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Contact the School
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
